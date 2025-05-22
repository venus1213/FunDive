import express, { IRouter } from 'express';
import { validateInvitationCode, useInvitationCode, getInvitationStatus } from '../controllers/invitation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router: IRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: 招待コード関連のエンドポイント
 */

// 一般ユーザー向けエンドポイント
// 招待コードの検証（認証不要）
router.post('/validate', validateInvitationCode);

// 招待コードの使用（認証必要）
router.post('/use', authenticate, useInvitationCode);

// 招待状態の取得（認証必要）
router.get('/status', authenticate, getInvitationStatus);

export default router; 