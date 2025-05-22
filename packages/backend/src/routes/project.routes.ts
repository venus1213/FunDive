import { Router, IRouter } from 'express';
import { body, query } from 'express-validator';
import { 
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  searchProjects,
  getPopularProjects,
  getProjectStats,
  getMyProjects,
  getProjectMembers
} from '../controllers/project.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { checkProjectLimit } from '../middlewares/plan-limits.middleware.js';

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: プロジェクト管理に関するエンドポイント
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - projectType
 *       properties:
 *         id:
 *           type: string
 *           description: プロジェクトID
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           description: プロジェクトタイトル
 *         description:
 *           type: string
 *           minLength: 20
 *           maxLength: 5000
 *           description: プロジェクトの説明
 *         category:
 *           type: string
 *           enum: [tech, finance, retail, healthcare, education, other]
 *           description: プロジェクトカテゴリ
 *         projectType:
 *           type: string
 *           enum: [entrepreneur, investor, cofounder]
 *           description: プロジェクトタイプ
 *         status:
 *           type: string
 *           enum: [draft, active, closed, suspended]
 *           description: プロジェクトステータス
 *         investmentAmount:
 *           type: number
 *           minimum: 0
 *           maximum: 1000000000
 *           description: 投資額（0-10億円）
 *         location:
 *           type: string
 *           maxLength: 100
 *           description: プロジェクトの場所
 *         projectStage:
 *           type: string
 *           enum: [idea, mvp, early_stage, growth, mature]
 *           description: プロジェクトステージ
 *         userId:
 *           type: string
 *           description: プロジェクト作成者のID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 作成日時
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 更新日時
 */

const router: IRouter = Router();

// 作成時のバリデーションルール
const projectCreateValidation = [
  body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('タイトルは5文字以上200文字以下である必要があります')
    .trim(),
  body('description')
    .isLength({ min: 20, max: 5000 })
    .withMessage('説明は20文字以上5000文字以下である必要があります')
    .trim(),
  body('category')
    .isIn(['tech', 'finance', 'retail', 'healthcare', 'education', 'other'])
    .withMessage('有効なカテゴリを選択してください'),
  body('projectType')
    .isIn(['entrepreneur', 'investor', 'cofounder'])
    .withMessage('有効なプロジェクトタイプを選択してください'),
  body('investmentAmount')
    .optional()
    .isFloat({ min: 0, max: 1000000000 })
    .withMessage('投資額は0から10億円の間で指定してください')
    .toFloat(),
  body('location')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('場所は100文字以下である必要があります')
    .trim(),
  body('projectStage')
    .optional()
    .isIn(['idea', 'mvp', 'early_stage', 'growth', 'mature'])
    .withMessage('有効なプロジェクトステージを選択してください'),
  body('status')
    .optional()
    .isIn(['draft', 'active', 'closed', 'suspended'])
    .withMessage('有効なステータスを選択してください')
    .default('draft'),
];

// 更新時のバリデーションルール
const projectUpdateValidation = [
  body('title')
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('タイトルは5文字以上200文字以下である必要があります'),
  body('description')
    .optional()
    .isLength({ min: 20, max: 5000 })
    .withMessage('説明は20文字以上5000文字以下である必要があります'),
  body('category')
    .optional()
    .isIn(['tech', 'finance', 'retail', 'healthcare', 'education', 'other'])
    .withMessage('有効なカテゴリを選択してください'),
  body('projectType')
    .optional()
    .isIn(['entrepreneur', 'investor', 'cofounder'])
    .withMessage('有効なプロジェクトタイプを選択してください'),
  body('status')
    .optional()
    .isIn(['draft', 'active', 'closed', 'suspended'])
    .withMessage('有効なステータスを選択してください'),
  body('investmentAmount')
    .optional()
    .isFloat({ min: 0, max: 1000000000 })
    .withMessage('投資額は0から10億円の間で指定してください'),
  body('location')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('場所は100文字以下である必要があります'),
  body('projectStage')
    .optional()
    .isIn(['idea', 'mvp', 'early_stage', 'growth', 'mature'])
    .withMessage('有効なプロジェクトステージを選択してください'),
];

const projectQueryValidation = [
  query('category')
    .optional()
    .isIn(['tech', 'finance', 'retail', 'healthcare', 'education', 'other'])
    .withMessage('有効なカテゴリを選択してください'),
  query('projectType')
    .optional()
    .isIn(['entrepreneur', 'investor', 'cofounder'])
    .withMessage('有効なプロジェクトタイプを選択してください'),
  query('status')
    .optional()
    .isIn(['draft', 'active', 'closed', 'suspended'])
    .withMessage('有効なステータスを選択してください'),
  query('userId')
    .optional()
    .isString()
    .withMessage('有効なユーザーIDを指定してください'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ページ番号は1以上の整数である必要があります'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('1ページあたりの件数は1から100の間で指定してください'),
];

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 新規プロジェクトの作成
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - projectType
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *                 example: "革新的なAIプロジェクト"
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 5000
 *                 example: "機械学習を活用して、ビジネスプロセスを自動化する革新的なプロジェクトです。"
 *               category:
 *                 type: string
 *                 enum: [tech, finance, retail, healthcare, education, other]
 *                 example: "tech"
 *               projectType:
 *                 type: string
 *                 enum: [entrepreneur, investor, cofounder]
 *                 example: "entrepreneur"
 *               investmentAmount:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1000000000
 *                 example: 10000000
 *               projectStage:
 *                 type: string
 *                 enum: [idea, mvp, early_stage, growth, mature]
 *                 example: "mvp"
 *     responses:
 *       201:
 *         description: プロジェクト作成成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: バリデーションエラー
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: プロジェクト作成の上限に達しています
 */
router.post('/', authenticate, checkProjectLimit, projectCreateValidation, validate, createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: プロジェクト一覧の取得
 *     tags: [Projects]
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
 *           maximum: 100
 *           default: 20
 *         description: 1ページあたりの件数
 *     responses:
 *       200:
 *         description: プロジェクト一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
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
router.get('/', authenticate, projectQueryValidation, validate, getProjects);

/**
 * @swagger
 * /projects/search:
 *   get:
 *     summary: プロジェクトの検索
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: 検索キーワード
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [tech, finance, retail, healthcare, education, other]
 *         description: カテゴリでフィルタリング
 *       - in: query
 *         name: projectType
 *         schema:
 *           type: string
 *           enum: [entrepreneur, investor, cofounder]
 *         description: プロジェクトタイプでフィルタリング
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, active, closed, suspended]
 *         description: ステータスでフィルタリング
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
 *           maximum: 100
 *           default: 20
 *         description: 1ページあたりの件数
 *     responses:
 *       200:
 *         description: プロジェクト検索結果の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
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
router.get('/search', authenticate, projectQueryValidation, validate, searchProjects);

/**
 * @swagger
 * /projects/popular:
 *   get:
 *     summary: 人気のプロジェクト一覧を取得
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 3
 *         description: 取得する件数
 *     responses:
 *       200:
 *         description: 人気プロジェクト一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/popular', getPopularProjects);

/**
 * @swagger
 * /projects/stats:
 *   get:
 *     summary: プロジェクトの統計情報を取得
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 統計情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProjects:
 *                   type: number
 *                   description: 総プロジェクト数
 *                 projectsByCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                         enum: [tech, finance, retail, healthcare, education, other]
 *                       count:
 *                         type: number
 *                 projectsByStatus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         enum: [draft, active, closed, suspended]
 *                       count:
 *                         type: number
 *                 projectsByType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [entrepreneur, investor, cofounder]
 *                       count:
 *                         type: number
 *                 recentProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: 認証エラー
 *       500:
 *         description: サーバーエラー
 */
router.get('/stats', authenticate, getProjectStats);

/**
 * @swagger
 * /projects/my:
 *   get:
 *     summary: 自分のプロジェクト一覧を取得
 *     tags: [Projects]
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
 *           maximum: 100
 *           default: 10
 *         description: 1ページあたりの件数
 *     responses:
 *       200:
 *         description: 自分のプロジェクト一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
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
router.get('/my', authenticate, projectQueryValidation, validate, getMyProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: プロジェクト詳細の取得
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: プロジェクトID
 *     responses:
 *       200:
 *         description: プロジェクト詳細の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: プロジェクトが見つかりません
 */
router.get('/:id', authenticate, getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: プロジェクトの更新
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: プロジェクトID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 5000
 *               category:
 *                 type: string
 *                 enum: [tech, finance, retail, healthcare, education, other]
 *               projectType:
 *                 type: string
 *                 enum: [entrepreneur, investor, cofounder]
 *               status:
 *                 type: string
 *                 enum: [draft, active, closed, suspended]
 *               investmentAmount:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1000000000
 *               location:
 *                 type: string
 *                 maxLength: 100
 *               projectStage:
 *                 type: string
 *                 enum: [idea, mvp, early_stage, growth, mature]
 *     responses:
 *       200:
 *         description: プロジェクト更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 更新権限がありません
 *       404:
 *         description: プロジェクトが見つかりません
 */
router.put('/:id', authenticate, projectUpdateValidation, validate, updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: プロジェクトの削除
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: プロジェクトID
 *     responses:
 *       200:
 *         description: プロジェクト削除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "プロジェクトを削除しました"
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 削除権限がありません
 *       404:
 *         description: プロジェクトが見つかりません
 */
router.delete('/:id', authenticate, deleteProject);

/**
 * @swagger
 * /projects/{projectId}/members:
 *   get:
 *     summary: プロジェクトのメンバー一覧を取得
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: プロジェクトID
 *     responses:
 *       200:
 *         description: プロジェクトのメンバー一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectMember'
 *       401:
 *         description: 認証エラー
 */
router.get('/:projectId/members', authenticate, getProjectMembers);

export default router; 