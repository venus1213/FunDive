/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         planType:
 *           type: string
 *           enum: [free, standard, premium]
 *         status:
 *           type: string
 *           enum: [active, canceled, past_due, unpaid]
 *         currentPeriodStart:
 *           type: string
 *           format: date-time
 *         currentPeriodEnd:
 *           type: string
 *           format: date-time
 *         cancelAtPeriodEnd:
 *           type: boolean
 *         stripeSubscriptionId:
 *           type: string
 *         stripeCustomerId:
 *           type: string
 */

import { Router, IRouter } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { SubscriptionController } from '../controllers/subscription.controller.js';
import Stripe from 'stripe';

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: サブスクリプション管理に関するエンドポイント
 */

const router: IRouter = Router();
const subscriptionController = new SubscriptionController();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// バリデーションルール
const priceIdValidation = [
  body('priceId')
    .isString()
    .notEmpty()
    .withMessage('価格IDは必須です'),
];

/**
 * @swagger
 * /subscriptions/plans:
 *   get:
 *     summary: 利用可能なプラン一覧の取得
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: プラン一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       priceId:
 *                         type: string
 *                         description: Stripe価格ID
 *                       productId:
 *                         type: string
 *                         description: Stripe商品ID
 *                       name:
 *                         type: string
 *                         description: プラン名
 *                       description:
 *                         type: string
 *                         description: プランの説明
 *                       amount:
 *                         type: number
 *                         description: 価格（円）
 *                       currency:
 *                         type: string
 *                         description: 通貨
 *                       interval:
 *                         type: string
 *                         enum: [month, year]
 *                         description: 課金間隔
 *       401:
 *         description: 認証エラー
 */
router.get('/plans', authenticate, subscriptionController.getAvailablePlans.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/subscribe:
 *   post:
 *     summary: 新規サブスクリプション登録
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: Stripe価格ID
 *     responses:
 *       200:
 *         description: サブスクリプション登録成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: Stripeチェックアウトセッションのセッションid
 *                 url:
 *                   type: string
 *                   description: チェックアウトページのURL
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 */
router.post('/subscribe', authenticate, priceIdValidation, validate, subscriptionController.createSubscriptionSession.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/info:
 *   get:
 *     summary: サブスクリプション情報の取得
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: サブスクリプション情報の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: 認証エラー
 */
router.get('/info', authenticate, subscriptionController.getSubscriptionInfo.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/history/{userId}:
 *   get:
 *     summary: 購入履歴の取得
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ユーザーID
 *     responses:
 *       200:
 *         description: 購入履歴の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: ユーザーが見つかりません
 */
router.get('/history/:userId', authenticate, subscriptionController.getPurchaseHistory.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/change-plan:
 *   post:
 *     summary: サブスクリプションのプラン変更
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: 新しいプランのStripe価格ID
 *     responses:
 *       200:
 *         description: プラン変更セッションの作成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: Stripeチェックアウトセッションのセッションid
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: サブスクリプションが見つかりません
 */
router.post('/change-plan', authenticate, priceIdValidation, validate, subscriptionController.changePlan.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/create-portal-session:
 *   post:
 *     summary: Stripeカスタマーポータルセッションの作成
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: ポータルセッションの作成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: カスタマーポータルのURL
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: サブスクリプションが見つかりません
 */
router.post('/portal', authenticate, subscriptionController.createPortalSession.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/admin/sync/{userId}:
 *   post:
 *     summary: 管理者用：サブスクリプション情報の手動同期
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 同期対象のユーザーID
 *     responses:
 *       200:
 *         description: 同期成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "サブスクリプション情報を同期しました"
 *                 planType:
 *                   type: string
 *                   enum: [free, standard, premium, startup_partner]
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     currentPeriodEnd:
 *                       type: string
 *                       format: date-time
 *                     cancelAtPeriodEnd:
 *                       type: boolean
 *       401:
 *         description: 認証エラー
 *       403:
 *         description: 管理者権限がありません
 *       404:
 *         description: ユーザーが見つかりません
 */
router.post('/admin/sync/:userId', authenticate, isAdmin, subscriptionController.syncSubscriptionManually.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/cancel:
 *   post:
 *     summary: サブスクリプションのキャンセル
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: キャンセル成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: サブスクリプションが見つかりません
 */
router.post('/cancel', authenticate, subscriptionController.cancelSubscription.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/webhook:
 *   post:
 *     summary: Stripeからのwebhookを処理
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook処理成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *       400:
 *         description: Webhook処理失敗
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                     message:
 *                       type: string
 */

router.get('/pending', authenticate, subscriptionController.getPendingSubscription.bind(subscriptionController));
router.delete('/pending', authenticate, subscriptionController.deletePendingSubscription.bind(subscriptionController));

/**
 * @swagger
 * /subscriptions/create-intent:
 *   post:
 *     summary: 支払いIntentの作成
 *     tags: [Subscriptions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *               - planId
 *               - interval
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: Stripe価格ID
 *               planId:
 *                 type: string
 *                 description: プランID
 *               interval:
 *                 type: string
 *                 description: 課金間隔
 *     responses:
 *       200:
 *         description: 支払いIntent作成成功
 *       401:
 *         description: 認証エラー
 */
router.post('/create-intent', authenticate, subscriptionController.createPaymentIntent.bind(subscriptionController));

export default router; 