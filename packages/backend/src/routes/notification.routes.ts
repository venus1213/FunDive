import { Router, IRouter } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getNotificationSettings,
  updateNotificationSettings,
} from '../controllers/notification.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { body } from 'express-validator';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: 通知管理に関するエンドポイント
 */

// 通知設定のバリデーションルール
const notificationSettingsValidation = [
  body('emailEnabled').isBoolean().withMessage('メール通知の有効/無効は必須です'),
  body('directMessageEnabled').isBoolean().withMessage('ダイレクトメッセージ通知の有効/無効は必須です'),
  body('projectMessageEnabled').isBoolean().withMessage('プロジェクトメッセージ通知の有効/無効は必須です'),
  body('mentionEnabled').isBoolean().withMessage('メンション通知の有効/無効は必須です'),
];

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: 通知一覧の取得
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
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
 *         description: 1ページあたりの通知数
 *       - in: query
 *         name: unreadOnly
 *         schema:
 *           type: boolean
 *           default: false
 *         description: 未読の通知のみを取得
 *     responses:
 *       200:
 *         description: 通知一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                       type:
 *                         type: string
 *                         enum: [message, project_update, bookmark, subscription]
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       relatedId:
 *                         type: string
 *                         format: uuid
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

// 通知関連のルート
router.get('/', authenticate, getNotifications);
router.put('/:notificationId/read', authenticate, markNotificationAsRead);
router.put('/read-all', authenticate, markAllNotificationsAsRead);

/**
 * @swagger
 * /notifications/{notificationId}/read:
 *   put:
 *     summary: 特定の通知を既読にする
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 既読にする通知のID
 *     responses:
 *       200:
 *         description: 通知の既読化成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "通知を既読にしました"
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: 通知が見つかりません
 */

/**
 * @swagger
 * /notifications/read-all:
 *   put:
 *     summary: すべての通知を既読にする
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 全通知の既読化成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "すべての通知を既読にしました"
 *       401:
 *         description: 認証エラー
 */

// 通知設定関連のルート
router.get('/settings', authenticate, getNotificationSettings);
router.put('/settings', authenticate, notificationSettingsValidation, validate, updateNotificationSettings);

/**
 * @swagger
 * /notifications/settings:
 *   get:
 *     summary: 通知設定の取得
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 通知設定の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emailNotifications:
 *                   type: object
 *                   properties:
 *                     enabled:
 *                       type: boolean
 *                     frequency:
 *                       type: string
 *                       enum: [immediate, daily, weekly]
 *                     types:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [message, project_update, bookmark, subscription]
 *                 pushNotifications:
 *                   type: object
 *                   properties:
 *                     enabled:
 *                       type: boolean
 *                     types:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [message, project_update, bookmark, subscription]
 *                 notificationPreferences:
 *                   type: object
 *                   properties:
 *                     minimumPriority:
 *                       type: string
 *                       enum: [low, medium, high, urgent]
 *       401:
 *         description: 認証エラー
 *   put:
 *     summary: 通知設定の更新
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailNotifications
 *               - pushNotifications
 *               - notificationPreferences
 *             properties:
 *               emailNotifications:
 *                 type: object
 *                 required:
 *                   - enabled
 *                   - frequency
 *                   - types
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                   frequency:
 *                     type: string
 *                     enum: [immediate, daily, weekly]
 *                   types:
 *                     type: array
 *                     items:
 *                       type: string
 *                       enum: [message, project_update, bookmark, subscription]
 *               pushNotifications:
 *                 type: object
 *                 required:
 *                   - enabled
 *                   - types
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                   types:
 *                     type: array
 *                     items:
 *                       type: string
 *                       enum: [message, project_update, bookmark, subscription]
 *               notificationPreferences:
 *                 type: object
 *                 required:
 *                   - minimumPriority
 *                 properties:
 *                   minimumPriority:
 *                     type: string
 *                     enum: [low, medium, high, urgent]
 *     responses:
 *       200:
 *         description: 通知設定の更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "通知設定を更新しました"
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 */


export default router; 