import { Router, IRouter } from 'express';
import { body, param } from 'express-validator';
import * as adminController from '../controllers/admin.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 管理者用エンドポイント
 */

// バリデーションルール
const userStatusValidation = [
  body('status')
    .isIn(['active', 'suspended'])
    .withMessage('ステータスは active または suspended である必要があります'),
  body('reason')
    .optional()
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('理由は1文字以上500文字以下である必要があります'),
];

const userRoleValidation = [
  body('role')
    .isIn(['entrepreneur', 'investor', 'admin', 'invited'])
    .withMessage('無効なロールです'),
  body('invitationExpires')
    .optional()
    .isISO8601()
    .withMessage('有効期限は有効な日付である必要があります'),
];

const bulkStatusValidation = [
  body('userIds')
    .isArray()
    .withMessage('ユーザーIDの配列が必要です'),
  body('userIds.*')
    .isUUID()
    .withMessage('無効なユーザーIDが含まれています'),
  body('isVerified')
    .isBoolean()
    .withMessage('isVerifiedはブール値である必要があります'),
];

const deleteValidation = [
  body('reason')
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('削除理由は1文字以上1000文字以下である必要があります'),
  body('confirm')
    .isBoolean()
    .equals('true')
    .withMessage('削除の確認が必要です'),
];

const bulkDeleteValidation = [
  body('ids')
    .isArray()
    .withMessage('IDの配列が必要です'),
  body('ids.*')
    .isUUID()
    .withMessage('無効なIDが含まれています'),
  body('reason')
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('削除理由は1文字以上1000文字以下である必要があります'),
  body('confirm')
    .isBoolean()
    .equals('true')
    .withMessage('削除の確認が必要です'),
];

const invitationExpiryValidation = [
  body('expiryDate')
    .isISO8601()
    .withMessage('有効期限は有効な日付である必要があります'),
];

const createInvitationValidation = [
  body('expiresIn')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('有効期限は1日から365日の間で指定してください'),
  body('maxUses')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('最大使用回数は1から100の間で指定してください'),
  body('durationDays')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('招待期間は1日から365日の間で指定してください'),
];

const projectStatusValidation = [
  body('status')
    .isIn(['active', 'suspended'])
    .withMessage('ステータスは active または suspended である必要があります'),
  body('reason')
    .optional()
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage('理由は1文字以上500文字以下である必要があります'),
];

const reportStatusValidation = [
  body('status')
    .isIn(['resolved', 'rejected'])
    .withMessage('ステータスは resolved または rejected である必要があります'),
  body('adminNotes')
    .optional()
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('管理者メモは1文字以上1000文字以下である必要があります'),
];

// 共通のミドルウェアを適用
router.use(authenticate, isAdmin);

// ユーザー管理
router.get('/users', adminController.listUsers);                                           // ユーザー一覧
router.get('/users/search', adminController.searchUsers);                                  // ユーザー検索
router.get('/users/:userId', adminController.getUserDetail);                              // ユーザー詳細
router.patch('/users/bulk-status', bulkStatusValidation, validate, 
  adminController.bulkUpdateUserStatus);                                                  // 一括ステータス更新
router.patch('/users/:userId/status', userStatusValidation, validate, 
  adminController.updateUserStatus);                                                      // 個別ステータス更新
router.patch('/users/:userId/role', userRoleValidation, validate, 
  adminController.updateUserRole);                                                        // ロール更新
router.patch('/users/:userId/invitation-expiry', invitationExpiryValidation, validate, 
  adminController.updateInvitationExpiry);                                               // 招待期限更新
router.post('/users/:userId/register-admin', adminController.registerAdmin);              // 管理者登録
router.delete('/users/:userId', deleteValidation, validate,
  adminController.deleteUser);                                                            // ユーザー削除
router.post('/users/bulk-delete', bulkDeleteValidation, validate,
  adminController.bulkDeleteUsers);                                                       // ユーザー一括削除

// プロジェクト管理
router.get('/projects', adminController.listProjects);                                    // プロジェクト一覧
router.get('/projects/search', adminController.searchProjects);                           // プロジェクト検索
router.get('/projects/:projectId', adminController.getProjectDetail);                     // プロジェクト詳細
router.patch('/projects/:projectId/status', projectStatusValidation, validate, 
  adminController.updateProjectStatus);                                                   // プロジェクトステータス更新
router.delete('/projects/:projectId', deleteValidation, validate,
  adminController.deleteProject);                                                         // プロジェクト削除
router.post('/projects/bulk-delete', bulkDeleteValidation, validate,
  adminController.bulkDeleteProjects);                                                    // プロジェクト一括削除

// 通報管理
router.get('/reports', adminController.listReports);                                      // 通報一覧
router.get('/reports/:reportId', adminController.getReportDetail);                        // 通報詳細
router.patch('/reports/:reportId/status', reportStatusValidation, validate, 
  adminController.updateReportStatus);                                                    // 通報ステータス更新

// 招待コード管理
router.post('/invitation-codes', createInvitationValidation, validate,
  adminController.createInvitationCode);                                                  // 招待コード作成
router.get('/invitation-codes', adminController.listInvitationCodes);                     // 招待コード一覧
router.delete('/invitation-codes/:id', param('id').isString().notEmpty(), validate, adminController.deleteInvitationCode);         // 招待コード削除

// 招待コードの有効/無効を切り替え
router.patch(
  '/invitation-codes/:id/toggle-active',
  [
    param('id').isString().notEmpty(),
    body('isActive').isBoolean().withMessage('isActiveはブール値である必要があります'),
  ],
  validate,
  adminController.toggleInvitationCodeActive
);

export default router; 