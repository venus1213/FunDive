import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { InvitationService, InvitationError } from '../services/invitation.service';
import { prisma } from '../lib/prisma';
import { logError } from '../utils/error-logger';

const invitationService = new InvitationService();

/**
 * 招待コードの検証
 */
export const validateInvitationCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: '招待コードが必要です' });
    }

    const invitationCode = await invitationService.validateInvitationCode(code);

    // アクティビティログを記録
    await prisma.activityLog.create({
      data: {
        actionType: 'validate',
        targetType: 'invitation',
        targetId: invitationCode.id,
        details: {
          action: 'validate_invitation_code',
          code: invitationCode.code,
        },
      },
    });

    res.json({ 
      valid: true, 
      code: invitationCode.code,
      expiresAt: invitationCode.expiresAt,
      currentUses: invitationCode.currentUses,
      maxUses: invitationCode.maxUses
    });
  } catch (error) {
    await logError({
      type: 'invitation_validate_error',
      error,
      metadata: {
        code: req.body.code,
      },
    });
    if (error instanceof InvitationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: '招待コードの検証中にエラーが発生しました' });
    }
  }
};

/**
 * 招待コードの使用
 */
export const useInvitationCode = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.body;
    const userId = req.user?.id;

    if (!code) {
      return res.status(400).json({ error: '招待コードが必要です' });
    }

    if (!userId) {
      return res.status(401).json({ error: '認証が必要です' });
    }

    const updatedUser = await invitationService.useInvitationCode({
      code,
      userId,
    });

    res.json({
      success: true,
      invitationExpires: updatedUser.invitationExpires,
      invitedBy: updatedUser.invitedBy
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'invitation_use_error',
      error,
      metadata: {
        code: req.body.code,
      },
    });
    if (error instanceof InvitationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: '招待コードの使用中にエラーが発生しました' });
    }
  }
};

/**
 * 招待ステータスの取得
 */
export const getInvitationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: '認証が必要です' });
    }

    const status = await invitationService.checkInvitationStatus(userId);

    // アクティビティログを記録
    await prisma.activityLog.create({
      data: {
        userId,
        actionType: 'read',
        targetType: 'invitation',
        details: {
          action: 'get_invitation_status',
          isValid: status.isValid,
          isVerified: status.isVerified
        },
      },
    });

    res.json(status);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'invitation_status_error',
      error,
    });
    if (error instanceof InvitationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: '招待状態の取得中にエラーが発生しました' });
    }
  }
}; 