import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import {
  createBookmark,
  deleteBookmark,
  getUserBookmarks,
} from '../controllers/bookmark.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: ブックマーク管理に関するエンドポイント
 */

// バリデーションルール
const bookmarkValidation = [
  body('projectId').notEmpty().withMessage('プロジェクトIDは必須です'),
];

// ルート
router.post('/', authenticate, bookmarkValidation, validate, createBookmark);
router.delete('/:projectId', authenticate, deleteBookmark);
router.get('/', authenticate, getUserBookmarks);

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: プロジェクトをブックマークに追加
 *     tags: [Bookmarks]
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
 *             properties:
 *               projectId:
 *                 type: string
 *                 format: uuid
 *                 description: ブックマークするプロジェクトのID
 *     responses:
 *       201:
 *         description: ブックマーク追加成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 projectId:
 *                   type: string
 *                   format: uuid
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: プロジェクトが見つかりません
 *       409:
 *         description: すでにブックマーク済みです
 */

/**
 * @swagger
 * /bookmarks/{projectId}:
 *   delete:
 *     summary: ブックマークを削除
 *     tags: [Bookmarks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 削除するブックマークのプロジェクトID
 *     responses:
 *       200:
 *         description: ブックマーク削除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ブックマークを削除しました"
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: ブックマークが見つかりません
 */

/**
 * @swagger
 * /bookmarks/user:
 *   get:
 *     summary: ユーザーのブックマーク一覧を取得
 *     tags: [Bookmarks]
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
 *         description: 1ページあたりの件数
 *     responses:
 *       200:
 *         description: ブックマーク一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookmarks:
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
 *                       projectId:
 *                         type: string
 *                         format: uuid
 *                       project:
 *                         $ref: '#/components/schemas/Project'
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

export default router; 