import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { checkMessageLimit } from '../middlewares/plan-limits.middleware.js';
import {
  sendDirectMessage,
  getDirectMessages,
  getConversations,
  getDirectMessageStats
} from '../controllers/direct-message.controller.js';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: DirectMessages
 *   description: ダイレクトメッセージに関するエンドポイント
 */

// バリデーションルール
const messageValidationRules = [
  body('receiverId').notEmpty().withMessage('受信者IDは必須です'),
  body('content')
    .isLength({ min: 1, max: 2000 })
    .withMessage('メッセージは1文字以上2000文字以下である必要があります'),
];

/**
 * @swagger
 * /direct-messages:
 *   post:
 *     summary: ダイレクトメッセージの送信
 *     tags: [DirectMessages]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - content
 *             properties:
 *               receiverId:
 *                 type: string
 *                 format: uuid
 *                 description: 受信者のユーザーID
 *               content:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *                 description: メッセージの内容
 *     responses:
 *       201:
 *         description: メッセージ送信成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 senderId:
 *                   type: string
 *                   format: uuid
 *                 receiverId:
 *                   type: string
 *                   format: uuid
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: メッセージ送信制限に達しました
 */

// ダイレクトメッセージの送信
router.post('/', authenticate, checkMessageLimit, messageValidationRules, validate, sendDirectMessage);

/**
 * @swagger
 * /direct-messages/stats:
 *   get:
 *     summary: ダイレクトメッセージの統計情報を取得
 *     tags: [DirectMessages]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: ダイレクトメッセージの統計情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: 全メッセージ数
 *                 unread:
 *                   type: integer
 *                   description: 未読メッセージ数
 *       401:
 *         description: 認証エラー
 */
router.get('/stats', authenticate, getDirectMessageStats);

/**
 * @swagger
 * /direct-messages/conversations:
 *   get:
 *     summary: メッセージのある会話一覧を取得
 *     tags: [DirectMessages]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 会話一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                         description: 会話相手のユーザーID
 *                       userName:
 *                         type: string
 *                         description: 会話相手のユーザー名
 *                       lastMessage:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *                             description: 最後のメッセージ内容
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: 最後のメッセージの送信日時
 *                       unreadCount:
 *                         type: integer
 *                         description: 未読メッセージ数
 *       401:
 *         description: 認証エラー
 */

// 会話一覧を取得
router.get('/conversations', authenticate, getConversations);

/**
 * @swagger
 * /direct-messages/{userId}:
 *   get:
 *     summary: 特定のユーザーとのメッセージ履歴を取得
 *     tags: [DirectMessages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: メッセージ履歴を取得したいユーザーのID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: ページ番号
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: 1ページあたりのメッセージ数
 *     responses:
 *       200:
 *         description: メッセージ履歴の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       senderId:
 *                         type: string
 *                         format: uuid
 *                       receiverId:
 *                         type: string
 *                         format: uuid
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: 認証エラー
 */

// 特定のユーザーとのメッセージ履歴を取得
router.get('/:userId', authenticate, getDirectMessages);

export default router; 