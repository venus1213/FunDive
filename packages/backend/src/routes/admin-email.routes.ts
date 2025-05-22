import { Router, IRouter } from 'express';
import { body, query, param } from 'express-validator';
import * as emailTemplateController from '../controllers/email-template.controller.js';
import * as emailScheduleController from '../controllers/email-schedule.controller.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: AdminEmail
 *   description: メールテンプレート管理API
 */

// バリデーションルール
const createTemplateValidation = [
  body('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('テンプレート名は1文字以上100文字以下である必要があります'),
  body('subject')
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('件名は1文字以上200文字以下である必要があります'),
  body('body')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage('本文は必須です'),
  body('type')
    .isIn(['NOTIFICATION', 'MARKETING', 'ANNOUNCEMENT', 'REMINDER', 'CUSTOM'])
    .withMessage('無効なテンプレートタイプです'),
  body('variables')
    .optional()
    .isObject()
    .withMessage('変数は有効なオブジェクトである必要があります'),
];

const updateTemplateValidation = [
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('テンプレート名は1文字以上100文字以下である必要があります'),
  body('subject')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('件名は1文字以上200文字以下である必要があります'),
  body('body')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage('本文は必須です'),
  body('type')
    .optional()
    .isIn(['NOTIFICATION', 'MARKETING', 'ANNOUNCEMENT', 'REMINDER', 'CUSTOM'])
    .withMessage('無効なテンプレートタイプです'),
  body('variables')
    .optional()
    .isObject()
    .withMessage('変数は有効なオブジェクトである必要があります'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActiveはブール値である必要があります'),
];

const sendEmailValidation = [
  body('templateId')
    .isUUID()
    .withMessage('無効なテンプレートIDです'),
  body('recipientIds')
    .isArray()
    .withMessage('受信者IDの配列が必要です'),
  body('recipientIds.*')
    .isUUID()
    .withMessage('無効な受信者IDが含まれています'),
  body('variables')
    .optional()
    .isObject()
    .withMessage('変数は有効なオブジェクトである必要があります'),
];

const previewDataValidation = [
  body('previewData')
    .isObject()
    .withMessage('プレビューデータは有効なオブジェクトである必要があります'),
];

const abTestValidation = [
  body('templateId')
    .isUUID()
    .withMessage('無効なテンプレートIDです'),
  body('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('テスト名は1文字以上100文字以下である必要があります'),
  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('説明は500文字以下である必要があります'),
  body('variantA')
    .isObject()
    .withMessage('バリアントAは有効なオブジェクトである必要があります'),
  body('variantB')
    .isObject()
    .withMessage('バリアントBは有効なオブジェクトである必要があります'),
  body('startDate')
    .isISO8601()
    .withMessage('開始日は有効な日付である必要があります'),
  body('endDate')
    .isISO8601()
    .withMessage('終了日は有効な日付である必要があります'),
];

const abTestResultValidation = [
  body('testId')
    .isUUID()
    .withMessage('無効なテストIDです'),
  body('variant')
    .isIn(['A', 'B'])
    .withMessage('バリアントはAまたはBである必要があります'),
  body('emailId')
    .isUUID()
    .withMessage('無効なメールIDです'),
  body('opened')
    .isBoolean()
    .withMessage('openedはブール値である必要があります'),
  body('clicked')
    .isBoolean()
    .withMessage('clickedはブール値である必要があります'),
];

// スケジュール関連のバリデーション
const scheduleValidation = {
  listSchedules: [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  createSchedule: [
    body('templateId').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
    body('recipientIds').isArray().notEmpty(),
    body('scheduleType').isIn(['ONE_TIME', 'RECURRING']),
    body('cronExpression').optional().isString(),
    body('sendAt').optional().isISO8601(),
    body('variables').optional().isObject(),
  ],
  updateSchedule: [
    param('id').isString().notEmpty(),
    body('name').optional().isString().notEmpty(),
    body('description').optional().isString(),
    body('recipientIds').optional().isArray(),
    body('cronExpression').optional().isString(),
    body('sendAt').optional().isISO8601(),
    body('variables').optional().isObject(),
    body('status').optional().isIn(['ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']),
  ],
};

// 共通のミドルウェアを適用
router.use(authenticate, isAdmin);

/**
 * @swagger
 * /admin/email-templates:
 *   post:
 *     summary: メールテンプレートの作成
 *     tags: [AdminEmail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *               - body
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [NOTIFICATION, MARKETING, ANNOUNCEMENT, REMINDER, CUSTOM]
 *               variables:
 *                 type: object
 */
router.post('/templates', createTemplateValidation, validate, emailTemplateController.createTemplate);

/**
 * @swagger
 * /admin/email-templates/{id}:
 *   patch:
 *     summary: メールテンプレートの更新
 */
router.patch('/templates/:id', updateTemplateValidation, validate, emailTemplateController.updateTemplate);

/**
 * @swagger
 * /admin/email-templates/{id}:
 *   get:
 *     summary: メールテンプレートの取得
 */
router.get('/templates/:id', emailTemplateController.getTemplate);

/**
 * @swagger
 * /admin/email-templates:
 *   get:
 *     summary: メールテンプレート一覧の取得
 */
router.get('/templates', emailTemplateController.listTemplates);

/**
 * @swagger
 * /admin/email-templates/{id}:
 *   delete:
 *     summary: メールテンプレートの削除
 */
router.delete('/templates/:id', emailTemplateController.deleteTemplate);

/**
 * @swagger
 * /admin/email/send:
 *   post:
 *     summary: メールの送信
 */
router.post('/send', sendEmailValidation, validate, emailTemplateController.sendEmail);

/**
 * @swagger
 * /admin/email/logs:
 *   get:
 *     summary: メール送信履歴の取得
 */
router.get('/logs', emailTemplateController.getEmailLogs);

// プレビュー関連
router.patch('/templates/:id/preview-data', previewDataValidation, validate, emailTemplateController.updatePreviewData);
router.post('/templates/:id/preview', emailTemplateController.generatePreview);

// A/Bテスト関連
router.post('/ab-tests', abTestValidation, validate, emailTemplateController.createABTest);
router.post('/ab-tests/results', abTestResultValidation, validate, emailTemplateController.recordABTestResult);
router.get('/ab-tests/:testId/results', emailTemplateController.getABTestResults);
router.post('/ab-tests/:testId/complete', emailTemplateController.completeABTest);

// スケジュール関連
router.get('/schedules', scheduleValidation.listSchedules, validate, emailScheduleController.listSchedules);
router.get('/schedules/:id', param('id').isString().notEmpty(), validate, emailScheduleController.getSchedule);
router.post('/schedules', scheduleValidation.createSchedule, validate, emailScheduleController.createSchedule);
router.patch('/schedules/:id', scheduleValidation.updateSchedule, validate, emailScheduleController.updateSchedule);
router.delete('/schedules/:id', param('id').isString().notEmpty(), validate, emailScheduleController.deleteSchedule);

// プレビュー生成
router.post(
  '/templates/:id/preview',
  createTemplateValidation,
  emailTemplateController.generatePreview
);

export default router; 