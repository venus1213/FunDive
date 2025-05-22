import { Router, IRouter } from 'express';
import { getPublicStats } from '../controllers/public-stats.controller.js';

const router: IRouter = Router();

/**
 * @swagger
 * /public-stats:
 *   get:
 *     summary: サイト全体の公開統計情報を取得
 *     tags: [PublicStats]
 *     responses:
 *       200:
 *         description: 統計情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   description: 総ユーザー数
 *                 totalProjects:
 *                   type: number
 *                   description: 総プロジェクト数
 *                 totalMatches:
 *                   type: number
 *                   description: 総マッチング数
 *       500:
 *         description: サーバーエラー
 */
router.get('/', getPublicStats);

export default router; 