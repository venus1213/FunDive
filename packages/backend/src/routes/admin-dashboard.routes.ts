import { Router, IRouter } from 'express';
import { query } from 'express-validator';
import * as dashboardController from '../controllers/admin-dashboard.controller.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: AdminDashboard
 *   description: 管理者向けダッシュボードAPI
 */

// バリデーションルール
const periodValidation = [
  query('period')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('期間は1日から365日の間で指定してください'),
];

// 共通のミドルウェアを適用
router.use(authenticate, isAdmin);

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: ダッシュボード全体の統計を取得
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 365
 *           default: 30
 *         description: 統計期間（日数）
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.get('/', periodValidation, validate, dashboardController.getDashboardStats);

/**
 * @swagger
 * /admin/dashboard/users:
 *   get:
 *     summary: ユーザー統計を取得
 */
router.get('/users', periodValidation, validate, dashboardController.getUserStats);

/**
 * @swagger
 * /admin/dashboard/invitations:
 *   get:
 *     summary: 招待コード統計を取得
 */
router.get('/invitations', periodValidation, validate, dashboardController.getInvitationStats);

/**
 * @swagger
 * /admin/dashboard/emails:
 *   get:
 *     summary: メール送信統計を取得
 */
router.get('/emails', periodValidation, validate, dashboardController.getEmailStats);

/**
 * @swagger
 * /admin/dashboard/errors:
 *   get:
 *     summary: エラー統計を取得
 */
router.get('/errors', periodValidation, validate, dashboardController.getErrorStats);

/**
 * @swagger
 * /admin/dashboard/cache:
 *   delete:
 *     summary: ダッシュボードのキャッシュをクリア
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 365
 *         description: クリアする期間（日数）。指定しない場合は全期間をクリア
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.delete('/cache', periodValidation, validate, dashboardController.clearCache);

/**
 * @swagger
 * /admin/dashboard/projects:
 *   get:
 *     summary: プロジェクト統計を取得
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 365
 *           default: 30
 *         description: 統計期間（日数）
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.get('/projects', periodValidation, validate, dashboardController.getProjectStats);

/**
 * @swagger
 * /admin/dashboard/time-series:
 *   get:
 *     summary: 期間別のデータ集計を取得
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: 開始日
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: 終了日
 *       - in: query
 *         name: interval
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *           default: day
 *         description: 集計間隔
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.get('/time-series', validate, dashboardController.getTimeSeriesStats);

/**
 * @swagger
 * /admin/dashboard/errors/details:
 *   get:
 *     summary: エラーログの詳細を取得
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 365
 *           default: 30
 *         description: 統計期間（日数）
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: エラータイプでフィルタリング
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.get('/errors/details', periodValidation, validate, dashboardController.getErrorLogDetails);

/**
 * @swagger
 * /admin/dashboard/errors:
 *   delete:
 *     summary: エラーログを削除
 *     tags: [AdminDashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 成功
 *       400:
 *         description: 無効なパラメータ
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 権限エラー
 */
router.delete('/errors', validate, dashboardController.deleteErrorLogs);

export default router; 