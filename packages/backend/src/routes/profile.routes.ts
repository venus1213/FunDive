import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { checkProfileViewLimit } from '../middlewares/plan-limits.middleware';
import {
  updateProfile,
  getProfile,
  updateProfileVisibility,
  searchUsers,
  getPlanLimits,
} from '../controllers/profile.controller';
import { AuthenticatedRequest } from '../types/profile.types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: プロフィール管理に関するエンドポイント
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         displayName:
 *           type: string
 *         bio:
 *           type: string
 *         company:
 *           type: string
 *         position:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *         social_links:
 *           type: object
 *           properties:
 *             twitter:
 *               type: string
 *             linkedin:
 *               type: string
 *             facebook:
 *               type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *         is_public:
 *           type: boolean
 *         visible_fields:
 *           type: array
 *           items:
 *             type: string
 *             enum: [bio, company, position, location, website, social_links, skills, interests]
 *         profile_image_url:
 *           type: string
 */

const router: IRouter = Router();

/**
 * @swagger
 * /profiles/me:
 *   get:
 *     summary: 自分のプロフィール情報の取得
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: プロフィール情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: プロフィールが見つかりません
 */
router.get('/me', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // DBからプロフィールを取得
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        profile: true,
        subscription: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // プロフィールが存在しない場合は新規作成
    if (!user.profile) {
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          name: user.name || '',
          displayName: user.name || '',
          is_public: true,
          visible_fields: ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'],
        },
      });
      user.profile = profile;
    }

    // 自分のプロフィールなので全ての情報を返す
    return res.json({
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      name: user.name,
      role: user.role,
      planType: user.planType,
      profile: user.profile,
      subscription: user.subscription,
      isFirstLogin: user.isFirstLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'プロフィールの取得中にエラーが発生しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @swagger
 * /profiles/search:
 *   get:
 *     summary: ユーザー検索
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: 検索キーワード
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [entrepreneur, investor]
 *         description: ユーザーロールでフィルタリング
 *     responses:
 *       200:
 *         description: 検索結果の取得成功
 */
router.get('/search', authenticate, searchUsers);

/**
 * @swagger
 * /profiles/plan-limits:
 *   get:
 *     summary: 現在のプランの制限情報を取得
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: プラン制限情報の取得成功
 */
router.get('/plan-limits', authenticate, getPlanLimits);

/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     summary: プロフィール情報の取得
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ユーザーID
 *     responses:
 *       200:
 *         description: プロフィール情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: プロフィールが見つかりません
 */
router.get('/:userId', authenticate, getProfile);

// プロフィール更新のバリデーションルール
const profileUpdateValidation = [
  body('name')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage('名前は100文字以下である必要があります'),
  body('displayName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('表示名は100文字以下である必要があります'),
  body('bio')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('自己紹介は1000文字以内で入力してください'),
  body('company')
    .optional()
    .isLength({ max: 100 })
    .withMessage('会社名は100文字以下である必要があります'),
  body('position')
    .optional()
    .isLength({ max: 100 })
    .withMessage('役職は100文字以下である必要があります'),
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('場所は100文字以下である必要があります'),
  body('website')
    .optional({ nullable: true })
    .custom((value) => {
      // 空文字列、null、undefinedの場合は検証をスキップ
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      // URLの検証
      try {
        new URL(value);
        return true;
      } catch (err) {
        return false;
      }
    })
    .withMessage('有効なURLを入力してください')
    .isLength({ max: 200 })
    .withMessage('ウェブサイトURLは200文字以下である必要があります'),
  body('social_links')
    .optional()
    .isObject()
    .withMessage('ソーシャルリンクはオブジェクトである必要があります'),
  body('social_links.twitter')
    .optional()
    .isLength({ max: 100 })
    .withMessage('TwitterのURLは100文字以下である必要があります'),
  body('social_links.linkedin')
    .optional()
    .isLength({ max: 100 })
    .withMessage('LinkedInのURLは100文字以下である必要があります'),
  body('social_links.facebook')
    .optional()
    .isLength({ max: 100 })
    .withMessage('FacebookのURLは100文字以下である必要があります'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('スキルは配列である必要があります')
    .custom((value) => value.length <= 20)
    .withMessage('スキルは20個まで登録できます'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('興味・関心は配列である必要があります')
    .custom((value) => value.length <= 20)
    .withMessage('興味・関心は20個まで登録できます'),
  body('is_public')
    .optional()
    .isBoolean()
    .withMessage('公開設定はブール値である必要があります'),
  body('visible_fields')
    .optional()
    .isArray()
    .withMessage('公開フィールドは配列である必要があります')
    .custom((value: string[]) => {
      if (!value) return true;
      const allowedFields = ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'];
      return value.every((field: string) => allowedFields.includes(field));
    })
    .withMessage('無効なフィールドが含まれています'),
];

// プロフィール公開設定のバリデーションルール
const profileVisibilityValidation = [
  body('is_public')
    .isBoolean()
    .withMessage('公開設定はブール値である必要があります'),
  body('visible_fields')
    .isArray()
    .withMessage('公開フィールドは配列である必要があります')
    .custom((value: string[]) => {
      const allowedFields = ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'];
      return value.every((field: string) => allowedFields.includes(field));
    })
    .withMessage('無効なフィールドが含まれています'),
];

/**
 * @swagger
 * /profiles/visibility:
 *   put:
 *     summary: プロフィールの公開設定を更新
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_public
 *               - visible_fields
 *             properties:
 *               is_public:
 *                 type: boolean
 *                 example: true
 *               visible_fields:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [bio, company, position, location, website, social_links, skills, interests]
 *                 example: ["bio", "skills", "interests"]
 *     responses:
 *       200:
 *         description: 公開設定の更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 */
router.put('/visibility', authenticate, profileVisibilityValidation, validate, updateProfileVisibility);

/**
 * @swagger
 * /profiles/{userId}:
 *   put:
 *     summary: プロフィール情報の更新
 *     tags: [Profiles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ユーザーID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "山田太郎"
 *               bio:
 *                 type: string
 *                 maxLength: 1000
 *                 example: "テクノロジーとビジネスの両方に興味があります。"
 *               company:
 *                 type: string
 *                 maxLength: 100
 *                 example: "株式会社テック"
 *               position:
 *                 type: string
 *                 maxLength: 100
 *                 example: "CTO"
 *               location:
 *                 type: string
 *                 maxLength: 100
 *                 example: "東京都渋谷区"
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com"
 *               social_links:
 *                 type: object
 *                 properties:
 *                   twitter:
 *                     type: string
 *                     example: "https://twitter.com/username"
 *                   linkedin:
 *                     type: string
 *                     example: "https://linkedin.com/in/username"
 *                   facebook:
 *                     type: string
 *                     example: "https://facebook.com/username"
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Python", "AWS"]
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AI", "ブロックチェーン", "スタートアップ"]
 *               profile_image_url:
 *                 type: string
 *                 example: "https://example.com/avatar.png"
 *     responses:
 *       200:
 *         description: プロフィール更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: バリデーションエラー
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: 認証エラー
 */
router.put('/:userId', authenticate, profileUpdateValidation, validate, updateProfile);

export default router; 