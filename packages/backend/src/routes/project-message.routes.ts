import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import {
  createProjectMessage,
  getProjectMessages,
  getProjectMessageStats,
  getProjectMessageList
} from '../controllers/project-message.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { checkMessageLimit } from '../middlewares/plan-limits.middleware.js';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: ProjectMessages
 *   description: プロジェクトメッセージに関するエンドポイント
 */

// バリデーションルール
const messageValidation = [
  body('projectId').notEmpty().withMessage('プロジェクトIDは必須です'),
  body('content')
    .isLength({ min: 1, max: 2000 })
    .withMessage('メッセージは1文字以上2000文字以下である必要があります'),
];

// ルート
router.get('/', authenticate, getProjectMessageList);
router.post('/', authenticate, checkMessageLimit, messageValidation, validate, createProjectMessage);
router.get('/stats', authenticate, getProjectMessageStats);
router.get('/:projectId', authenticate, getProjectMessages);

/**
 * @swagger
 * /project-messages:
 *   post:
 *     summary: プロジェクトメッセージの送信
 *     tags: [ProjectMessages]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - content
 *             properties:
 *               projectId:
 *                 type: string
 *                 format: uuid
 *                 description: プロジェクトID
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
 *                 projectId:
 *                   type: string
 *                   format: uuid
 *                 senderId:
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
 *       404:
 *         description: プロジェクトが見つかりません
 */

/**
 * @swagger
 * /project-messages/{projectId}:
 *   get:
 *     summary: プロジェクトのメッセージ履歴を取得
 *     tags: [ProjectMessages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: プロジェクトID
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
 *                       projectId:
 *                         type: string
 *                         format: uuid
 *                       senderId:
 *                         type: string
 *                         format: uuid
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
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
 *       404:
 *         description: プロジェクトが見つかりません
 */

export default router; 