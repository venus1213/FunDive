import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import { register, login, logout, getCurrentUser, updateFirstLoginStatus } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { generateTestIdToken } from '../utils/test-token.js';
import { CookieOptions } from 'express';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 認証関連のエンドポイント
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         role:
 *           type: string
 *           enum: [entrepreneur, investor, admin]
 *         planType:
 *           type: string
 *           enum: [free, standard, premium]
 *         isAdmin:
 *           type: boolean
 *         isVerified:
 *           type: boolean
 *         profile:
 *           $ref: '#/components/schemas/Profile'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 新規ユーザー登録
 *     tags: [Auth]
 *     description: |
 *       新規ユーザーを登録します。
 *       
 *       テスト用のIDトークンを取得するには、以下のエンドポイントを使用してください：
 *       ```
 *       POST /auth/test-token
 *       {
 *         "email": "test@example.com"
 *       }
 *       ```
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - idToken
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: ユーザーのメールアドレス
 *               name:
 *                 type: string
 *                 description: ユーザーの表示名
 *               role:
 *                 type: string
 *                 enum: [entrepreneur, investor]
 *                 description: ユーザーの役割
 *               selectedPlan:
 *                 type: string
 *                 enum: [free, standard, premium]
 *                 description: 選択したプラン
 *               selectedCycle:
 *                 type: string
 *                 enum: [月額, 年額]
 *                 description: 課金サイクル
 *               idToken:
 *                 type: string
 *                 description: FirebaseのIDトークン
 *     responses:
 *       201:
 *         description: ユーザー登録成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: アカウントを作成しました
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     email:
 *                       type: string
 *                       format: email
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/RateLimitError'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ログイン
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - idToken
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: メールアドレス
 *               idToken:
 *                 type: string
 *                 description: Firebase認証トークン
 *               displayName:
 *                 type: string
 *                 description: 表示名（オプション）
 *     responses:
 *       200:
 *         description: ログイン成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *                     profile:
 *                       type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/RateLimitError'
 */

/**
 * @swagger
 * /auth/test-token:
 *   post:
 *     summary: テスト用のIDトークンを生成
 *     tags: [Auth]
 *     description: 開発環境でのテスト用にIDトークンを生成します
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: テストユーザーのメールアドレス
 *     responses:
 *       200:
 *         description: テストトークン生成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idToken:
 *                   type: string
 *                   description: 生成されたIDトークン
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: ログアウト
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: ログアウト成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ログアウトしました"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 現在のユーザー情報を取得
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: ユーザー情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

const router: IRouter = Router();

// セッションCookieの設定
const getSessionCookieOptions = (): CookieOptions => ({
  maxAge: 60 * 60 * 24 * 14 * 1000, // 2週間
  httpOnly: true,
  secure: true, // 常にHTTPSを要求
  sameSite: 'lax', // クロスサイトリクエストを許可しつつ、セキュリティも維持
  path: '/'
});

// バリデーションルール
const registerValidation = [
  body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
  body('name')
    .isLength({ min: 2 })
    .withMessage('名前は2文字以上である必要があります'),
  body('selectedPlan')
    .optional()
    .isIn(['free', 'standard', 'premium', 'startup_partner'])
    .withMessage('無効なプランタイプです'),
  body('selectedCycle')
    .optional()
    .isIn(['月額', '3ヶ月', '年額'])
    .withMessage('無効な請求サイクルです'),
];

const loginValidation = [
  body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
  body('idToken').notEmpty().withMessage('認証トークンは必須です'),
];

// ルート
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

// 開発環境のみで利用可能なテストトークン生成エンドポイント
if (process.env.NODE_ENV === 'development') {
  router.post('/test-token', async (req, res) => {
    try {
      const token = await generateTestIdToken(req.body.email);
      res.json({ idToken: token });
    } catch (error) {
      res.status(500).json({ error: 'テストトークンの生成に失敗しました' });
    }
  });
}

// isFirstLogin更新エンドポイントを追加
router.post('/first-login', authenticate, updateFirstLoginStatus);

export { getSessionCookieOptions };
export default router; 