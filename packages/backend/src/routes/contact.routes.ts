import express from 'express';
import { ContactController } from '../controllers/contact.controller';

const router = express.Router();
const contactController = new ContactController();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: 問い合わせフォームを送信する
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - type
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: 問い合わせ者の名前
 *                 example: 山田 太郎
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 問い合わせ者のメールアドレス
 *                 example: taro@example.com
 *               type:
 *                 type: string
 *                 enum: [general, service, technical, other]
 *                 description: 問い合わせの種類
 *                 example: general
 *               message:
 *                 type: string
 *                 description: 問い合わせ内容
 *                 example: サービスについて詳しく知りたいです。
 *     responses:
 *       200:
 *         description: 問い合わせが正常に送信された
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: お問い合わせを受け付けました
 *       422:
 *         description: バリデーションエラー
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: VALIDATION_ERROR
 *                     message:
 *                       type: string
 *                       example: バリデーションエラー
 *                     validationErrors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           path:
 *                             type: array
 *                             items:
 *                               type: string
 *                           message:
 *                             type: string
 *       500:
 *         description: サーバーエラー
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: SERVER_ERROR
 *                     message:
 *                       type: string
 *                       example: 問い合わせの送信に失敗しました
 */
router.post('/', contactController.submitContact.bind(contactController));

export default router; 