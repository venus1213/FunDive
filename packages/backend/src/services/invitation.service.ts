import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';

export class InvitationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvitationError';
  }
}

interface UseInvitationCodeParams {
  code: string;
  userId: string;
  durationDays?: number; // 招待期間（日数）
}

interface ExtendInvitationParams {
  userId: string;
  extensionDays: number; // 延長する日数
}

interface UserInvitationDetails {
  invitationExpires: Date | null;
  invitedBy: string | null;
  isVerified: boolean;
  isAdmin: boolean;
  id: string;
}

interface InvitationStatus {
  isValid: boolean;
  isVerified: boolean;
  invitationExpires: Date | null;
  invitedBy: string | null;
  isAdmin: boolean;
}

export class InvitationService {
  private prisma: PrismaClient;
  private readonly DEFAULT_INVITATION_DAYS = 30;

  constructor() {
    this.prisma = prisma;
  }

  /**
   * 招待コードの有効性チェック
   */
  async validateInvitationCode(code: string) {
    const invitationCode = await this.prisma.invitationCode.findUnique({
      where: { code },
      include: {
        createdBy: {
          select: {
            isAdmin: true,
          }
        }
      }
    });

    if (!invitationCode) {
      throw new InvitationError('無効な招待コードです');
    }

    if (invitationCode.expiresAt < new Date()) {
      throw new InvitationError('招待コードの有効期限が切れています');
    }

    if (invitationCode.currentUses >= invitationCode.maxUses) {
      throw new InvitationError('この招待コードは既に使用上限に達しています');
    }

    if (!invitationCode.createdBy.isAdmin) {
      throw new InvitationError('管理者以外が作成した招待コードは使用できません');
    }

    return invitationCode;
  }

  /**
   * 招待コードの利用
   */
  async useInvitationCode(params: UseInvitationCodeParams) {
    const { code, userId, durationDays = this.DEFAULT_INVITATION_DAYS } = params;

    return await this.prisma.$transaction(async (tx) => {
      // 招待コードの検証
      const invitationCode = await this.validateInvitationCode(code);

      // ユーザーの検証
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { isVerified: true }
      });

      if (!user) {
        throw new InvitationError('ユーザーが見つかりません');
      }

      if (!user.isVerified) {
        throw new InvitationError('メール認証が完了していないため、招待コードを使用できません');
      }

      // 招待コードの使用回数をインクリメント
      await tx.invitationCode.update({
        where: { id: invitationCode.id },
        data: {
          currentUses: invitationCode.currentUses + 1,
          usedBy: {
            connect: { id: userId },
          },
          isUsed: invitationCode.currentUses + 1 >= invitationCode.maxUses,
        },
      });

      // 招待期限の設定
      const invitationExpires = new Date();
      invitationExpires.setDate(invitationExpires.getDate() + durationDays);

      // ユーザーを招待ユーザーとして設定
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          invitationExpires,
          invitedBy: invitationCode.createdById,
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'use_invitation_code',
            invitationCodeId: invitationCode.id,
            expiresAt: invitationExpires,
          },
        },
      });

      return updatedUser;
    });
  }

  /**
   * 招待ユーザーのステータスチェック
   * 無効な場合はDBクリーンアップを実行
   */
  async checkInvitationStatus(userId: string): Promise<InvitationStatus> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        invitationExpires: true,
        invitedBy: true,
        isVerified: true,
        isAdmin: true,
      },
    });

    if (!user) {
      throw new InvitationError('ユーザーが見つかりません');
    }

    // 基本条件チェック
    if (!user.invitationExpires || !user.invitedBy || !user.isVerified) {
      // 招待情報が存在する場合はクリーンアップ
      if (user.invitationExpires || user.invitedBy) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            invitationExpires: null,
            invitedBy: null,
          },
        });

        await this.prisma.activityLog.create({
          data: {
            userId,
            actionType: 'admin_action',
            targetType: 'user',
            details: {
              action: 'cleanup_invitation',
              reason: 'invitation_invalid'
            },
          },
        });
      }

      return {
        isValid: false,
        isVerified: user.isVerified,
        invitationExpires: null,
        invitedBy: null,
        isAdmin: user.isAdmin
      };
    }

    // 期限切れチェック
    const isExpired = new Date(user.invitationExpires) <= new Date();
    if (isExpired) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          invitationExpires: null,
          invitedBy: null,
        },
      });

      await this.prisma.activityLog.create({
        data: {
          userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'cleanup_invitation',
            reason: 'invitation_expired'
          },
        },
      });

      return {
        isValid: false,
        isVerified: user.isVerified,
        invitationExpires: null,
        invitedBy: null,
        isAdmin: user.isAdmin
      };
    }

    return {
      isValid: true,
      isVerified: user.isVerified,
      invitationExpires: user.invitationExpires,
      invitedBy: user.invitedBy,
      isAdmin: user.isAdmin
    };
  }

  // 招待期間を延長
  async extendInvitation(params: ExtendInvitationParams) {
    const { userId, extensionDays } = params;

    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          invitationExpires: true,
          invitedBy: true,
        },
      });

      if (!user) {
        throw new InvitationError('ユーザーが見つかりません');
      }

      if (!user.invitationExpires || !user.invitedBy) {
        throw new InvitationError('招待ユーザーではありません');
      }

      // 現在の期限から延長
      const newExpiryDate = new Date(user.invitationExpires);
      newExpiryDate.setDate(newExpiryDate.getDate() + extensionDays);

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          invitationExpires: newExpiryDate,
        },
      });

      // アクティビティログの記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'admin_action',
          targetType: 'user',
          details: {
            action: 'extend_invitation',
            previousExpiry: user.invitationExpires,
            newExpiry: newExpiryDate,
            extensionDays,
          },
        },
      });

      return {
        success: true,
        user: updatedUser,
        previousExpiry: user.invitationExpires,
        newExpiry: newExpiryDate,
      };
    });
  }
} 