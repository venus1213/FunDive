import { Response } from 'express';
import { Category, ProjectType, ProjectStatus, Prisma, PlanType } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { prisma } from '../lib/prisma.js';
import { logError } from '../utils/error-logger.js';

interface ValidationError extends Error {
  name: 'ValidationError';
  errors?: string[];
  code?: string;
  meta?: Record<string, unknown>;
}

/**
 * プロジェクト作成
 * - ユーザー認証の確認
 * - プロジェクト情報の登録
 * - アクティビティログの記録
 */
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const project = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        include: {
          subscription: true,
          projects: true
        }
      });

      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      // プランに基づくプロジェクト作成制限のチェック
      const projectLimit = {
        free: 1,
        startup_partner: 2,
        standard: 3,
        premium: Infinity
      }[user.planType];

      if (user.projects.length >= projectLimit) {
        throw new Error(`現在のプランでは${projectLimit}つまでしかプロジェクトを作成できません`);
      }

      const { title, description, category, projectType, status = 'draft', investmentAmount, location, projectStage } = req.body;

      // プロジェクトの作成
      const newProject = await tx.project.create({
        data: {
          userId,
          title,
          description,
          category: category as Category,
          projectType: projectType as ProjectType,
          status: status as ProjectStatus,
          investmentAmount,
          location,
          projectStage,
        },
      });

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'create',
          targetType: 'project',
          targetId: newProject.id,
          details: {
            title: newProject.title,
            category: newProject.category,
          },
        },
      });

      return newProject;
    });

    res.status(201).json(project);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_create_error',
      error,
      metadata: {
        requestBody: req.body,
      },
    });
    
    // バリデーションエラーの場合
    if (
      (error as ValidationError).name === 'ValidationError' || 
      (error as Prisma.PrismaClientKnownRequestError).code === 'P2002'
    ) {
      const validationError = error as ValidationError;
      return res.status(400).json({
        message: 'バリデーションエラー',
        errors: validationError.errors || [validationError.message],
        details: validationError.meta
      });
    }

    res.status(500).json({ 
      message: 'プロジェクトの作成中にエラーが発生しました',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

/**
 * プロジェクト一覧取得
 * - ユーザー認証の確認
 * - フィルタリング（カテゴリ、タイプ、ステータス）
 * - ページネーション対応
 */
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    // 認証ユーザー（閲覧者）のID
    const requesterId = req.user?.id;
    if (!requesterId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // クエリパラメータ取得
    const {
      category,
      projectType,
      status,
      userId: filterUserId,
      page = 1,
      limit = 10,
    } = req.query as {
      category?: string;
      projectType?: string;
      status?: string;
      userId?: string;
      page?: string | number;
      limit?: string | number;
    };

    const skip = (Number(page) - 1) * Number(limit);

    // 検索条件の構築
    const where = {
      ...(category && { category: category as Category }),
      ...(projectType && { projectType: projectType as ProjectType }),
      ...(status && { status: status as ProjectStatus }),
      ...(filterUserId && { userId: filterUserId }),
    };

    const result = await prisma.$transaction(async (tx) => {
      const [projects, total] = await Promise.all([
        tx.project.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          skip,
          take: Number(limit),
          orderBy: {
            createdAt: 'desc',
          },
        }),
        tx.project.count({ where }),
      ]);

      await tx.activityLog.create({
        data: {
          userId: requesterId,
          actionType: 'read',
          targetType: 'project',
          details: {
            action: 'list_projects',
            filters: req.query,
          },
        },
      });

      return { projects, total };
    });

    res.json({
      projects: result.projects,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(result.total / Number(limit)),
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_list_error',
      error,
      metadata: req.query,
    });
    console.error('Projects fetch error:', error);
    res.status(500).json({ message: 'プロジェクトの取得中にエラーが発生しました' });
  }
};

/**
 * プロジェクト詳細取得
 * - プロジェクトIDによる検索
 * - 関連ユーザー情報の取得
 */
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  displayName: true,
                }
              }
            },
          },
          _count: {
            select: {
              bookmarks: true,
            },
          },
          bookmarks: userId ? {
            where: {
              userId: userId,
            },
          } : undefined,
        },
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          targetId: id,
          details: {
            action: 'view_project_detail',
          },
        },
      });

      return project;
    });

    const { bookmarks, _count, ...projectData } = result;
    const response = {
      ...projectData,
      isBookmarked: bookmarks.length > 0,
      bookmarkCount: _count.bookmarks,
    };

    res.json(response);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_detail_error',
      error,
      metadata: {
        projectId: req.params.id,
      },
    });
    console.error('Project fetch error:', error);
    res.status(500).json({ message: 'プロジェクトの取得中にエラーが発生しました' });
  }
};

/**
 * プロジェクト更新
 * - ユーザー認証と権限確認
 * - プロジェクト情報の更新
 * - アクティビティログの記録
 */
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updateData = req.body;

    const updatedProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      if (project.userId !== userId) {
        throw new Error('権限がありません');
      }

      const updated = await tx.project.update({
        where: { id },
        data: updateData,
      });

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'update',
          targetType: 'project',
          targetId: project.id,
          details: updateData,
        },
      });

      return updated;
    });

    res.json(updatedProject);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_update_error',
      error,
      metadata: {
        projectId: req.params.id,
        updateData: req.body,
      },
    });
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: '一意制約違反が発生しました' });
      }
    }
    console.error('Project update error:', error);
    res.status(500).json({ message: 'プロジェクトの更新中にエラーが発生しました' });
  }
};

/**
 * プロジェクト削除
 * - ユーザー認証と権限確認
 * - プロジェクトの削除
 * - アクティビティログの記録
 */
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      if (project.userId !== userId) {
        throw new Error('権限がありません');
      }

      // 関連するブックマークを先に削除
      await tx.bookmark.deleteMany({
        where: { projectId: id },
      });

      // プロジェクトメッセージを削除
      await tx.message.deleteMany({
        where: { projectId: id },
      });

      // プロジェクトを削除
      await tx.project.delete({
        where: { id },
      });

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'delete',
          targetType: 'project',
          targetId: id,
          details: {
            title: project.title,
          },
        },
      });
    });

    res.json({ message: 'プロジェクトが削除されました' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_delete_error',
      error,
      metadata: {
        projectId: req.params.id,
      },
    });
    console.error('Project deletion error:', error);
    res.status(500).json({ message: 'プロジェクトの削除中にエラーが発生しました' });
  }
};

/**
 * プロジェクト検索
 * - キーワード、カテゴリ、タイプ、ステータスによる検索
 * - ページネーション対応
 * - 人気度によるソート
 */
export const searchProjects = async (req: AuthRequest, res: Response) => {
  try {
    const { query, category, projectType, status, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const userId = req.user?.id;

    const where: Prisma.ProjectWhereInput = {
      AND: [
        query
          ? {
            OR: [
              { title: { contains: query as string, mode: Prisma.QueryMode.insensitive } },
              { description: { contains: query as string, mode: Prisma.QueryMode.insensitive } },
            ],
          }
          : {},
        ...(category ? [{ category: category as Category }] : []),
        ...(projectType ? [{ projectType: projectType as ProjectType }] : []),
        ...(status ? [{ status: status as ProjectStatus }] : []),
      ],
    };

    const result = await prisma.$transaction(async (tx) => {
      const [projects, total] = await Promise.all([
        tx.project.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                bookmarks: true,
                messages: true,
              },
            },
          },
          skip,
          take: Number(limit),
          orderBy: [
            { popularityScore: 'desc' },
            { createdAt: 'desc' },
          ],
        }),
        tx.project.count({ where }),
      ]);

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          details: {
            action: 'search_projects',
            searchQuery: query,
            filters: { category, projectType, status },
          },
        },
      });

      return { projects, total };
    });

    res.json({
      projects: result.projects,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(result.total / Number(limit)),
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_search_error',
      error,
      metadata: {
        query: req.query,
      },
    });
    console.error('Project search error:', error);
    res.status(500).json({ message: 'プロジェクトの検索中にエラーが発生しました' });
  }
};

/**
 * 人気のプロジェクト取得
 * - アクティブなプロジェクトのみ
 * - ブックマーク数とメッセージ数による並び替え
 */
export const getPopularProjects = async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 3 } = req.query;
    const take = Number(limit);
    const userId = req.user?.id;

    const result = await prisma.$transaction(async (tx) => {
      const [projects, total] = await Promise.all([
        tx.project.findMany({
          where: {
            status: 'active',
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                bookmarks: true,
                messages: true,
              },
            },
          },
          orderBy: [
            { bookmarks: { _count: 'desc' } },
            { messages: { _count: 'desc' } },
            { createdAt: 'desc' },
          ],
          take,
        }),
        tx.project.count({
          where: {
            status: 'active',
          },
        }),
      ]);

      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          details: {
            action: 'get_popular_projects',
            limit: take,
          },
        },
      });

      return { projects, total };
    });

    res.json({
      projects: result.projects,
      pagination: {
        total: result.total,
        page: 1,
        limit: take,
        total_pages: Math.ceil(result.total / take),
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'popular_projects_error',
      error,
      metadata: {
        limit: req.query.limit,
      },
    });
    console.error('Popular projects fetch error:', error);
    res.status(500).json({ message: '人気プロジェクトの取得中にエラーが発生しました' });
  }
};

/**
 * プロジェクトの統計情報を取得
 * - ユーザーのプロジェクト数
 * - カテゴリごとのプロジェクト数
 * - ステータスごとのプロジェクト数
 */
export const getProjectStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const [
        totalProjects,
        projectsByCategory,
        projectsByStatus,
        projectsByType,
        recentProjects
      ] = await Promise.all([
        tx.project.count({
          where: { userId }
        }),
        tx.project.groupBy({
          by: ['category'],
          where: { userId },
          _count: true
        }),
        tx.project.groupBy({
          by: ['status'],
          where: { userId },
          _count: true
        }),
        tx.project.groupBy({
          by: ['projectType'],
          where: { userId },
          _count: true
        }),
        tx.project.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true
          }
        })
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          details: {
            action: 'get_project_stats',
          },
        },
      });

      return {
        totalProjects,
        projectsByCategory,
        projectsByStatus,
        projectsByType,
        recentProjects
      };
    });

    res.json({
      totalProjects: result.totalProjects,
      projectsByCategory: result.projectsByCategory.map(item => ({
        category: item.category,
        count: item._count
      })),
      projectsByStatus: result.projectsByStatus.map(item => ({
        status: item.status,
        count: item._count
      })),
      projectsByType: result.projectsByType.map(item => ({
        type: item.projectType,
        count: item._count
      })),
      recentProjects: result.recentProjects
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_stats_error',
      error,
    });
    console.error('Project stats fetch error:', error);
    res.status(500).json({ message: '統計情報の取得中にエラーが発生しました' });
  }
};

/**
 * マイプロジェクト一覧取得
 * - ユーザー認証の確認
 * - プラン別の制限確認
 * - ページネーション対応
 */
export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          planType: true,
        },
      });

      const [projects, total] = await Promise.all([
        tx.project.findMany({
          where: { userId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' },
        }),
        tx.project.count({
          where: { userId },
        }),
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          details: {
            action: 'get_my_projects',
            page,
            limit,
          },
        },
      });

      return { projects, total, user };
    });

    const planType = result.user?.planType || 'free';
    const projectLimits: Record<PlanType, number> = {
      free: 1,
      standard: 5,
      premium: Infinity,
      startup_partner: 3
    };

    const projectLimit = projectLimits[planType];
    const canCreateMore = result.total < projectLimit;
    const remainingProjects = projectLimit === Infinity ? Infinity : Math.max(0, projectLimit - result.total);

    res.json({
      projects: result.projects,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(result.total / Number(limit)),
      },
      planInfo: {
        currentPlan: planType,
        projectLimit,
        canCreateMore,
        remainingProjects,
        nextPlan: planType === 'free' ? 'standard' : planType === 'standard' ? 'premium' : null,
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'my_projects_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('My projects fetch error:', error);
    res.status(500).json({ message: 'プロジェクトの取得中にエラーが発生しました' });
  }
};

/**
 * プロジェクトメンバーの取得
 * - プロジェクトオーナー
 * - メッセージを送信したユーザー
 */
export const getProjectMembers = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: projectId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      const messageUsers = await tx.message.findMany({
        where: {
          projectId,
          messageType: 'project',
        },
        select: {
          sender: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        distinct: ['senderId'],
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'project',
          targetId: projectId,
          details: {
            action: 'get_project_members',
          },
        },
      });

      return { project, messageUsers };
    });

    const members = [
      { id: result.project.user.id, name: result.project.user.name },
      ...result.messageUsers.map(msg => ({
        id: msg.sender.id,
        name: msg.sender.name,
      })),
    ];

    const uniqueMembers = Array.from(
      new Map(members.map(item => [item.id, item])).values()
    );

    res.json(uniqueMembers);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'project_members_error',
      error,
      metadata: {
        projectId: req.params.projectId,
      },
    });
    console.error('Project members fetch error:', error);
    res.status(500).json({ message: 'プロジェクトメンバーの取得に失敗しました' });
  }
}; 