import { Response, NextFunction } from 'express';
import { PLAN_FEATURES } from '../config/plan-limits';
import { AppError } from './error.middleware';
import { AuthRequest } from './auth.middleware';
import { prisma } from '../lib/prisma';
import { InvitationService } from '../services/invitation.service';

const invitationService = new InvitationService();

/**
 * プラン制限のチェック用ヘルパー関数
 */
async function getPlanFeatures(userId: string, targetUserId?: string) {
  const status = await invitationService.checkInvitationStatus(userId);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      planType: true,
      role: true 
    }
  });

  if (!user) {
    throw new AppError(414, 'NOT_FOUND', 'ユーザーが見つかりません。');
  }

  // 管理者、招待ユーザー、または投資家ユーザーの場合はプレミアム機能を提供
  if (status.isValid || status.isAdmin || user.role === 'investor') {
    return PLAN_FEATURES['premium'];
  }

  return PLAN_FEATURES[user.planType];
}

/**
 * メッセージ送信の制限をチェック
 */
export async function checkMessageLimit(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', '認証が必要です。');
    }

    // メッセージの送信先のユーザーID
    const targetUserId = req.body.receiverId;
    const planFeatures = await getPlanFeatures(userId, targetUserId);

    console.log("planFeatures：", planFeatures);

    // メッセージ表示制限のチェック
    const messageCount = await prisma.message.count({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    });

    if (messageCount >= planFeatures.messageDisplayLimit) {
      throw new AppError(429, 'MESSAGE_LIMIT_EXCEEDED', 
        `このプランでは最大${planFeatures.messageDisplayLimit}件までしかメッセージを表示できません。プランをアップグレードしてください。`);
    }

    // メッセージ送信権限のチェック
    const isDirectMessage = req.path.includes('/direct-messages');
    if (isDirectMessage) {
      const receiverRole = req.body.receiverRole;
      if (!planFeatures.messageAccess.direct.send[receiverRole]) {
        throw new AppError(403, 'PLAN_LIMIT_EXCEEDED', 
          `このプランでは${receiverRole}へのダイレクトメッセージを送信できません。プランをアップグレードしてください。`);
      }
    }

    const isProjectMessage = req.path.includes('/project-messages');
    if (isProjectMessage) {
      const projectType = req.body.projectType;
      if (!planFeatures.messageAccess.project.send[projectType]) {
        throw new AppError(403, 'PLAN_LIMIT_EXCEEDED', 
          `このプランでは${projectType}プロジェクトへのメッセージを送信できません。プランをアップグレードしてください。`);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * プロジェクト作成の制限をチェック
 */
export async function checkProjectLimit(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', '認証が必要です。');
    }

    const planFeatures = await getPlanFeatures(userId);

    // プロジェクトタイプの制限チェック
    const projectType = req.body.projectType;
    if (!planFeatures.projectAccess.create.types.includes(projectType)) {
      throw new AppError(403, 'PROJECT_TYPE_NOT_ALLOWED', 
        `このプランでは${projectType}タイプのプロジェクトを作成できません。プランをアップグレードしてください。`);
    }

    // プロジェクト作成の総数制限チェック
    if (planFeatures.projectAccess.create.limit !== false) {
      const projectCount = await prisma.project.count({
        where: {
          userId,
          status: {
            not: 'draft'
          }
        },
      });

      if (projectCount >= planFeatures.projectAccess.create.limit) {
        throw new AppError(429, 'PROJECT_LIMIT_EXCEEDED', 
          `このプランでは最大${planFeatures.projectAccess.create.limit}件までしかプロジェクトを作成できません。プランをアップグレードしてください。`);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * プロフィール閲覧制限をチェック
 */
export async function checkProfileViewLimit(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', '認証が必要です。');
    }
    if (userId === req.params.userId) {
      return next();
    }

    // 対象ユーザーのID
    const targetUserId = req.params.userId;
    const planFeatures = await getPlanFeatures(userId, targetUserId);

    // 対象ユーザーのロールを取得
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { role: true }
    });

    if (!targetUser) {
      throw new AppError(414, 'NOT_FOUND', 'ユーザーが見つかりません');
    }
    console.log("targetUser：", targetUser);

    // クエリパラメータのroleを使用するか、取得したユーザーのroleを使用
    const targetUserRole = (req.query.userRole as string) || targetUser.role;

    if (targetUserRole === 'admin') {
      return next();
    }

    if (!planFeatures.profileAccess.view[targetUserRole]) {
      throw new AppError(403, 'PROFILE_VIEW_DENIED', 
        `このプランでは${targetUserRole}のプロフィールを閲覧できません。プランをアップグレードしてください。`);
    }

    next();
  } catch (error) {
    next(error);
  }
}

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  github?: string;
  [key: string]: string | undefined;
}

interface ProfileData {
  website?: string;
  social_links?: SocialLinks;
}
        