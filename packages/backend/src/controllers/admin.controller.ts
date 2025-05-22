import { Request, Response } from 'express';
import { AdminUserListResponse, AdminUserDetailResponse, AdminProjectListResponse, AdminProjectDetailResponse, AdminReportListResponse, AdminReportDetailResponse } from '../types/admin.types.js';
import { getAuth } from 'firebase-admin/auth';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { prisma } from '../lib/prisma.js';
import { AdminUserService, AdminUserError } from '../services/admin-user.service.js';
import { Prisma } from '@prisma/client';
import { logError } from '../utils/error-logger.js';

const adminUserService = new AdminUserService();

export const listUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      include: {
        profile: true,
      },
    });

    const total = await prisma.user.count();

    const response: AdminUserListResponse = {
      users,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'ユーザー一覧の取得に失敗しました' });
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        projects: true,
        activityLogs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    const response: AdminUserDetailResponse = { user };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'ユーザー詳細の取得に失敗しました' });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { isVerified } = req.body;

    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { isVerified },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'user',
          targetId: userId,
          details: {
            action: 'update_user_status',
            isVerified,
          },
        },
      });

      return user;
    });

    res.json(updatedUser);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_update_user_status_error',
      error,
      metadata: {
        targetUserId: req.params.userId,
        isVerified: req.body.isVerified,
      },
    });
    res.status(500).json({ error: 'ユーザーステータスの更新に失敗しました' });
  }
};

export const listProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      skip,
      take: limit,
      include: {
        user: true,
      },
    });

    const total = await prisma.project.count();

    const response: AdminProjectListResponse = {
      projects,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'プロジェクト一覧の取得に失敗しました' });
  }
};

export const getProjectDetail = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        user: true,
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        reports: {
          include: {
            reporter: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        }
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'プロジェクトが見つかりません' });
    }

    const response: AdminProjectDetailResponse = { project };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'プロジェクト詳細の取得に失敗しました' });
  }
};

export const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const updatedProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.update({
        where: { id: projectId },
        data: { status },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'project',
          targetId: projectId,
          details: {
            action: 'update_project_status',
            status,
          },
        },
      });

      return project;
    });

    res.json(updatedProject);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_update_project_status_error',
      error,
      metadata: {
        projectId: req.params.projectId,
        status: req.body.status,
      },
    });
    res.status(500).json({ error: 'プロジェクトステータスの更新に失敗しました' });
  }
};

export const listReports = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const reports = await prisma.report.findMany({
      skip,
      take: limit,
      include: {
        reporter: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.report.count();

    const response: AdminReportListResponse = {
      reports,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: '通報一覧の取得に失敗しました' });
  }
};

export const getReportDetail = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;

    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        reporter: true,
      },
    });

    if (!report) {
      return res.status(404).json({ error: '通報が見つかりません' });
    }

    const response: AdminReportDetailResponse = { report };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: '通報詳細の取得に失敗しました' });
  }
};

export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const { status, adminComment } = req.body;

    const updatedReport = await prisma.$transaction(async (tx) => {
      const report = await tx.report.update({
        where: { id: reportId },
        data: {
          status,
          adminComment,
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'report',
          targetId: reportId,
          details: {
            action: 'update_report_status',
            status,
            adminComment,
          },
        },
      });

      return report;
    });

    res.json(updatedReport);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_update_report_status_error',
      error,
      metadata: {
        reportId: req.params.reportId,
        status: req.body.status,
      },
    });
    res.status(500).json({ error: '通報ステータスの更新に失敗しました' });
  }
};

export const registerAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      // Firebase Admin SDKでカスタムクレームを更新
      const auth = getAuth();
      await auth.setCustomUserClaims(user.firebaseUid!, { role: 'admin' });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          isAdmin: true,
          role: 'admin',
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'user',
          targetId: userId,
          details: {
            action: 'register_admin',
            targetUser: userId,
          },
        },
      });

      return updatedUser;
    });

    res.json(updatedUser);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_register_admin_error',
      error,
      metadata: {
        targetUserId: req.params.userId,
        action: 'register_admin',
      },
    });
    console.error('Admin registration error:', error);
    res.status(500).json({ error: '管理者登録に失敗しました' });
  }
};

export const createInvitationCode = async (req: AuthRequest, res: Response) => {
  try {
    const { expiresIn, maxUses = 1 } = req.body;

    const invitationCode = await prisma.$transaction(async (tx) => {
      // 招待コードの生成（ランダムな8文字の文字列）
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // 有効期限の計算（デフォルト: 7日間）
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (expiresIn || 7));

      const invitationCode = await tx.invitationCode.create({
        data: {
          code,
          createdById: req.user!.id,
          expiresAt,
          maxUses,
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'invitation',
          targetId: invitationCode.id,
          details: {
            action: 'create_invitation_code',
            invitationCode: invitationCode.id,
          },
        },
      });

      return invitationCode;
    });

    res.json(invitationCode);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_create_invitation_code_error',
      error,
      metadata: {
        expiresIn: req.body.expiresIn,
        maxUses: req.body.maxUses,
      },
    });
    console.error('Invitation code creation error:', error);
    res.status(500).json({ error: '招待コードの作成に失敗しました' });
  }
};

export const listInvitationCodes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const invitationCodes = await prisma.invitationCode.findMany({
      skip,
      take: limit,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        usedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.invitationCode.count();

    res.json({
      invitationCodes,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: '招待コード一覧の取得に失敗しました' });
  }
};

export const deleteInvitationCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.invitationCode.delete({
      where: { id },
    });

    res.json({ message: '招待コードを削除しました' });
  } catch (error) {
    res.status(500).json({ error: '招待コードの削除に失敗しました' });
  }
};

// ユーザー検索
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      role,
      isVerified,
      planType,
      createdAtStart,
      createdAtEnd,
      page = 1,
      limit = 10,
    } = req.query;

    console.log('検索リクエスト:', {
      email,
      name,
      role,
      isVerified,
      planType,
      createdAtStart,
      createdAtEnd,
      page,
      limit,
    });

    const result = await adminUserService.searchUsers(
      {
        email: email as string,
        name: name as string,
        role: role as any,
        planType: planType as any,
        isVerified: isVerified === 'true' ? true : isVerified === 'false' ? false : undefined,
        createdAtStart: createdAtStart ? new Date(createdAtStart as string) : undefined,
        createdAtEnd: createdAtEnd ? new Date(createdAtEnd as string) : undefined,
      },
      Number(page),
      Number(limit)
    );

    console.log('検索結果:', result);
    res.json(result);
  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({ error: 'ユーザーの検索に失敗しました' });
  }
};

// ユーザーの一括ステータス更新
export const bulkUpdateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userIds, isVerified } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'ユーザーIDが必要です' });
    }

    const updatedUsers = await adminUserService.bulkUpdateUserStatus({
      userIds,
      isVerified,
    });

    res.json({ users: updatedUsers });
  } catch (error) {
    console.error('Bulk user status update error:', error);
    res.status(500).json({ error: 'ユーザーステータスの一括更新に失敗しました' });
  }
};

// ユーザーロールの更新
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role, invitationExpires } = req.body;

    const updatedUser = await adminUserService.updateUserRole({
      userId,
      role,
      invitationExpires: invitationExpires ? new Date(invitationExpires) : undefined,
    });

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof AdminUserError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('User role update error:', error);
      res.status(500).json({ error: 'ユーザーロールの更新に失敗しました' });
    }
  }
};

// 招待期限の更新
export const updateInvitationExpiry = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { expiryDate } = req.body;

    if (!expiryDate) {
      return res.status(400).json({ error: '有効期限が必要です' });
    }

    const updatedUser = await adminUserService.updateInvitationExpiry(
      userId,
      new Date(expiryDate)
    );

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof AdminUserError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Invitation expiry update error:', error);
      res.status(500).json({ error: '招待期限の更新に失敗しました' });
    }
  }
};

// ユーザー削除
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { reason, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({ error: '削除の確認が必要です' });
    }

    // トランザクションで関連データも含めて削除
    await prisma.$transaction(async (tx) => {
      // 関連データの削除
      await tx.profile.deleteMany({ where: { userId } });
      await tx.notification.deleteMany({ where: { userId } });
      await tx.activityLog.deleteMany({ where: { userId } });
      await tx.message.deleteMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      });
      await tx.bookmark.deleteMany({ where: { userId } });
      await tx.report.deleteMany({ where: { reporterId: userId } });

      // プロジェクトの削除
      await tx.project.deleteMany({ where: { userId } });

      // ユーザーの削除
      await tx.user.delete({ where: { id: userId } });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'delete_user',
            userId,
            reason,
          },
        },
      });
    });

    res.json({ message: 'ユーザーを削除しました' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_delete_user_error',
      error,
      metadata: {
        targetUserId: req.params.userId,
        reason: req.body.reason,
      },
    });
    console.error('User deletion error:', error);
    res.status(500).json({ error: 'ユーザーの削除に失敗しました' });
  }
};

// ユーザー一括削除
export const bulkDeleteUsers = async (req: Request, res: Response) => {
  try {
    const { ids, reason, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({ error: '削除の確認が必要です' });
    }

    const results = await Promise.all(
      ids.map(async (userId: string) => {
        try {
          await prisma.$transaction(async (tx) => {
            // 関連データの削除
            await tx.profile.deleteMany({ where: { userId } });
            await tx.notification.deleteMany({ where: { userId } });
            await tx.activityLog.deleteMany({ where: { userId } });
            await tx.message.deleteMany({
              where: {
                OR: [
                  { senderId: userId },
                  { receiverId: userId }
                ]
              }
            });
            await tx.bookmark.deleteMany({ where: { userId } });
            await tx.report.deleteMany({ where: { reporterId: userId } });

            // プロジェクトの削除
            await tx.project.deleteMany({ where: { userId } });

            // ユーザーの削除
            await tx.user.delete({ where: { id: userId } });

            // アクティビティログの記録
            await tx.activityLog.create({
              data: {
                actionType: 'admin_action',
                targetType: 'user',
                details: {
                  action: 'bulk_delete_user',
                  userId,
                  reason,
                },
              },
            });
          });
          return { userId, success: true };
        } catch (error) {
          return { userId, success: false, error: '削除に失敗しました' };
        }
      })
    );

    res.json({
      message: 'ユーザーの一括削除を完了しました',
      results,
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_bulk_delete_users_error',
      error,
      metadata: {
        userIds: req.body.ids,
        reason: req.body.reason,
      },
    });
    console.error('Bulk user deletion error:', error);
    res.status(500).json({ error: 'ユーザーの一括削除に失敗しました' });
  }
};

// プロジェクト削除
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { reason, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({ error: '削除の確認が必要です' });
    }

    await prisma.$transaction(async (tx) => {
      // 関連データの削除
      await tx.message.deleteMany({ where: { projectId } });
      await tx.bookmark.deleteMany({ where: { projectId } });

      // プロジェクトの削除
      await tx.project.delete({ where: { id: projectId } });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          actionType: 'admin_action',
          targetType: 'project',
          targetId: projectId,
          details: {
            action: 'delete_project',
            reason,
          },
        },
      });
    });

    res.json({ message: 'プロジェクトを削除しました' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_delete_project_error',
      error,
      metadata: {
        projectId: req.params.projectId,
        reason: req.body.reason,
      },
    });
    console.error('Project deletion error:', error);
    res.status(500).json({ error: 'プロジェクトの削除に失敗しました' });
  }
};

// プロジェクト一括削除
export const bulkDeleteProjects = async (req: Request, res: Response) => {
  try {
    const { ids, reason, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({ error: '削除の確認が必要です' });
    }

    const results = await Promise.all(
      ids.map(async (projectId: string) => {
        try {
          await prisma.$transaction(async (tx) => {
            // 関連データの削除
            await tx.message.deleteMany({ where: { projectId } });
            await tx.bookmark.deleteMany({ where: { projectId } });

            // プロジェクトの削除
            await tx.project.delete({ where: { id: projectId } });

            // アクティビティログの記録
            await tx.activityLog.create({
              data: {
                actionType: 'admin_action',
                targetType: 'project',
                targetId: projectId,
                details: {
                  action: 'bulk_delete_project',
                  reason,
                },
              },
            });
          });
          return { projectId, success: true };
        } catch (error) {
          return { projectId, success: false, error: '削除に失敗しました' };
        }
      })
    );

    res.json({
      message: 'プロジェクトの一括削除を完了しました',
      results,
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_bulk_delete_projects_error',
      error,
      metadata: {
        projectIds: req.body.ids,
        reason: req.body.reason,
      },
    });
    console.error('Bulk project deletion error:', error);
    res.status(500).json({ error: 'プロジェクトの一括削除に失敗しました' });
  }
};

// プロジェクト検索
export const searchProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // 検索条件の設定
    if (req.query.title) {
      where.title = { contains: req.query.title };
    }
    if (req.query.category && req.query.category !== 'all') {
      where.category = req.query.category;
    }
    if (req.query.status && req.query.status !== 'all') {
      where.status = req.query.status;
    }
    if (req.query.createdAtStart) {
      where.createdAt = {
        ...where.createdAt,
        gte: new Date(req.query.createdAtStart as string),
      };
    }
    if (req.query.createdAtEnd) {
      where.createdAt = {
        ...where.createdAt,
        lte: new Date(req.query.createdAtEnd as string),
      };
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Project search error:', error);
    res.status(500).json({ error: 'プロジェクトの検索に失敗しました' });
  }
};

/**
 * 招待コードの有効/無効を切り替え
 */
export const toggleInvitationCodeActive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedCode = await prisma.$transaction(async (tx) => {
      const code = await tx.invitationCode.update({
        where: { id },
        data: { isActive },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          usedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'admin_action',
          targetType: 'invitation',
          targetId: id,
          details: {
            action: 'toggle_invitation_code',
            isActive,
          },
        },
      });

      return code;
    });

    res.json(updatedCode);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'admin_toggle_invitation_code_error',
      error,
      metadata: {
        invitationCodeId: req.params.id,
        isActive: req.body.isActive,
      },
    });
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: '招待コードが見つかりません' });
      }
    }
    console.error('招待コードの更新エラー:', error);
    res.status(500).json({ message: '招待コードの更新に失敗しました' });
  }
}; 