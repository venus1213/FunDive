import { Response } from 'express';
import { Role } from '@prisma/client';
import { AuthenticatedRequest, ProfileUpdateRequest, ProfileVisibilityRequest } from '../types/profile.types';
import { prisma, clearUserCache } from '../lib/prisma';
import { logError } from '../utils/error-logger';
import { PLAN_FEATURES } from '../config/plan-limits';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';
import { InvitationService } from '../services/invitation.service';

const invitationService = new InvitationService();

/**
 * プロフィール更新
 * - ユーザーの認証確認
 * - プロフィールデータの更新または新規作成
 * - アクティビティログの記録
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'ユーザーIDが必要です' });
    }

    // 認証されたユーザーが自分のプロフィールを更新しようとしているか確認
    if (req.user?.id !== userId) {
      return res.status(403).json({ message: '他のユーザーのプロフィールは更新できません' });
    }

    const profileData: ProfileUpdateRequest = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    const updatedProfile = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.upsert({
        where: { userId: user.id },
        create: {
          ...profileData,
          userId: user.id,
          name: profileData.name || '',
          displayName: profileData.displayName || profileData.name || '',
        },
        update: {
          ...profileData,
          name: profileData.name || undefined,
          displayName: profileData.displayName || profileData.name || undefined,
        },
        select: {
          id: true,
          name: true,
          displayName: true,
          bio: true,
          company: true,
          position: true,
          location: true,
          website: true,
          social_links: true,
          skills: true,
          interests: true,
          is_public: true,
          visible_fields: true,
          profile_image_url: true,
          updatedAt: true
        }
      });

      // アクティビティログ
      await tx.activityLog.create({
        data: {
          userId: user.id,
          actionType: 'update',
          targetType: 'user',
          targetId: profile.id,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });

      return profile;
    });

    clearUserCache(user.id);

    res.json({
      message: 'プロフィールを更新しました',
      profile: updatedProfile,
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'profile_update_error',
      error,
      metadata: {
        id: req.params.userId,
      },
    });
    res.status(500).json({ message: 'プロフィールの更新中にエラーが発生しました' });
  }
};

/**
 * プロフィール取得
 */
export async function getProfile(req: AuthRequest, res: Response) {
  try {
    let userId = req.user?.id;
    const paramsId = req.params.userId;
    
    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', '認証が必要です。');
    }

    if(userId != paramsId){
      userId = paramsId;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        subscription: true
      }
    });

    if (!user) {
      throw new AppError(404, 'NOT_FOUND', 'ユーザーが見つかりません。');
    }

    res.json(user);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(500, 'INTERNAL_SERVER_ERROR', 'プロフィールの取得中にエラーが発生しました。');
  }
}

/**
 * プロフィールの公開設定更新
 * - 公開/非公開の設定
 * - 表示フィールドの設定
 * - アクティビティログの記録
 */
export const updateProfileVisibility = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const visibilityData: ProfileVisibilityRequest = req.body;

    const updatedProfile = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.update({
        where: { userId },
        data: {
          is_public: visibilityData.is_public,
          visible_fields: visibilityData.visible_fields,
        },
        select: {
          id: true,
          is_public: true,
          visible_fields: true,
          updatedAt: true
        }
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'update',
          targetType: 'user',
          targetId: profile.id,
          details: {
            action: 'update_profile_visibility',
            changes: {
              is_public: visibilityData.is_public,
              visible_fields: visibilityData.visible_fields,
            },
          },
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });

      return profile;
    });

    res.json({
      message: 'プロフィールの公開設定を更新しました',
      visibility: {
        is_public: updatedProfile.is_public,
        visible_fields: updatedProfile.visible_fields,
        updated_at: updatedProfile.updatedAt,
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'profile_visibility_update_error',
      error,
      metadata: req.body,
    });
    res.status(500).json({ message: 'プロフィールの公開設定の更新中にエラーが発生しました' });
  }
};

/**
 * ユーザー検索
 * - キーワード、役割、スキル、場所による検索
 * - 公開プロフィールのみを検索対象
 * - ページネーション対応
 */
export const searchUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { q, role, skills, location, page = 1, limit = 20, excludeUserId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // 検索条件の構築
    const where = {
      AND: [
        // 非公開プロフィールのユーザーを除外
        {
          profile: {
            is: {
              is_public: true
            }
          }
        },
        {
          ...(q && {
            OR: [
              { name: { contains: String(q), mode: 'insensitive' as const } },
              { profile: { is: { company: { contains: String(q), mode: 'insensitive' as const } } } },
              { profile: { is: { position: { contains: String(q), mode: 'insensitive' as const } } } },
            ],
          }),
        },
        ...(role ? [{ role: role as Role }] : []),
        ...(location ? [{ profile: { is: { location: { contains: String(location), mode: 'insensitive' as const } } } }] : []),
        ...(skills ? [{ profile: { is: { skills: { hasSome: Array.isArray(skills) ? skills.map(String) : [String(skills)] } } } }] : []),
        ...(excludeUserId ? [{ NOT: { id: String(excludeUserId) } }] : []),
      ],
    };

    const result = await prisma.$transaction(async (tx) => {
      const [users, total] = await Promise.all([
        tx.user.findMany({
          where,
          include: {
            profile: true
          },
          skip,
          take: Number(limit),
        }),
        tx.user.count({ where }),
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'search',
          targetType: 'user',
          details: {
            action: 'search_users',
            query: { q, role, skills, location, page, limit },
          },
        },
      });

      return { users, total };
    });

    const totalPages = Math.ceil(result.total / Number(limit));

    res.json({
      users: result.users,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        total_pages: totalPages,
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'user_search_error',
      error,
      metadata: {
        query: req.query,
      },
    });
    res.status(500).json({ message: 'ユーザー検索中にエラーが発生しました' });
  }
};

export const getPlanLimits = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { 
        planType: true,
        role: true,
        isAdmin: true,
        isVerified: true,
        invitationExpires: true,
        invitedBy: true,
        subscription: {
          select: {
            status: true,
            currentPeriodEnd: true,
          }
        }
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // プラン制限情報を返す
    // 管理者または投資家ユーザーはプレミアム機能を使用可能
    const planFeatures = user.isAdmin || user.role === 'investor'
      ? PLAN_FEATURES['premium']
      : PLAN_FEATURES[user.planType];

    // 現在の使用状況を取得
    const messageCount = await prisma.message.count({
      where: {
        OR: [
          { senderId: req.user.id },
          { receiverId: req.user.id }
        ]
      }
    });

    return res.json({
      planType: user.planType,
      isAdmin: user.isAdmin,
      role: user.role,
      limits: planFeatures,
      currentUsage: {
        messageCount
      }
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'plan_limits_fetch_error',
      error,
    });
    return res.status(500).json({ 
      message: 'プラン制限情報の取得中にエラーが発生しました'
    });
  }
}; 