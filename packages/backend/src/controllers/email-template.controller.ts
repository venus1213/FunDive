import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { EmailTemplateService, EmailTemplateError } from '../services/email-template.service.js';
import { PrismaClient } from '@prisma/client';
import { logError } from '../utils/error-logger.js';

const emailTemplateService = new EmailTemplateService();
const prisma = new PrismaClient();

// テンプレートの作成
export const createTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { name, subject, body, type, variables } = req.body;
    const createdBy = req.user!.id;

    const template = await prisma.$transaction(async (tx) => {
      const newTemplate = await emailTemplateService.createTemplate({
        name,
        subject,
        body,
        type,
        variables,
        createdBy,
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: createdBy,
          actionType: 'create',
          targetType: 'email',
          targetId: newTemplate.id,
          details: {
            action: 'create_email_template',
            templateType: type,
          },
        },
      });

      return newTemplate;
    });

    res.json(template);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_create_error',
      error,
      metadata: {
        name: req.body.name,
        type: req.body.type,
      },
    });
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Template creation error:', error);
      res.status(500).json({ error: 'テンプレートの作成に失敗しました' });
    }
  }
};

// テンプレートの更新
export const updateTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, subject, body, type, variables, isActive } = req.body;
    const updatedBy = req.user!.id;

    const template = await prisma.$transaction(async (tx) => {
      const updatedTemplate = await emailTemplateService.updateTemplate(id, {
        name,
        subject,
        body,
        type,
        variables,
        isActive,
        updatedBy,
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: updatedBy,
          actionType: 'update',
          targetType: 'email',
          targetId: id,
          details: {
            action: 'update_email_template',
            isActive,
          },
        },
      });

      return updatedTemplate;
    });

    res.json(template);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_update_error',
      error,
      metadata: {
        templateId: req.params.id,
        isActive: req.body.isActive,
      },
    });
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Template update error:', error);
      res.status(500).json({ error: 'テンプレートの更新に失敗しました' });
    }
  }
};

// テンプレートの取得
export const getTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await emailTemplateService.getTemplate(id);

    if (!template) {
      return res.status(404).json({ error: 'テンプレートが見つかりません' });
    }

    res.json(template);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_get_error',
      error,
      metadata: {
        templateId: req.params.id,
      },
    });
    console.error('Template retrieval error:', error);
    res.status(500).json({ error: 'テンプレートの取得に失敗しました' });
  }
};

// テンプレート一覧の取得
export const listTemplates = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await emailTemplateService.listTemplates(page, limit);
    res.json(result);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('Template list error:', error);
    res.status(500).json({ error: 'テンプレート一覧の取得に失敗しました' });
  }
};

// テンプレートの削除
export const deleteTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    await prisma.$transaction(async (tx) => {
      await emailTemplateService.deleteTemplate(id, userId);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'delete',
          targetType: 'email',
          targetId: id,
          details: {
            action: 'delete_email_template',
          },
        },
      });
    });

    res.json({ message: 'テンプレートを削除しました' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_delete_error',
      error,
      metadata: {
        templateId: req.params.id,
      },
    });
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Template deletion error:', error);
      res.status(500).json({ error: 'テンプレートの削除に失敗しました' });
    }
  }
};

// メールの送信
export const sendEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { templateId, recipientIds, variables } = req.body;
    const sentBy = req.user!.id;

    const emailLog = await prisma.$transaction(async (tx) => {
      const log = await emailTemplateService.sendEmail({
        templateId,
        recipientIds,
        variables,
        sentBy,
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: sentBy,
          actionType: 'create',
          targetType: 'email',
          targetId: log.id,
          details: {
            action: 'send_email',
            templateId,
            recipientCount: recipientIds.length,
          },
        },
      });

      return log;
    });

    res.json(emailLog);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_send_error',
      error,
      metadata: {
        templateId: req.body.templateId,
        recipientCount: req.body.recipientIds?.length,
      },
    });
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Email sending error:', error);
      res.status(500).json({ error: 'メールの送信に失敗しました' });
    }
  }
};

// 送信履歴の取得
export const getEmailLogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await emailTemplateService.getEmailLogs(page, limit);
    res.json(result);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_template_logs_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('Email log retrieval error:', error);
    res.status(500).json({ error: '送信履歴の取得に失敗しました' });
  }
};

// プレビューデータの更新
export const updatePreviewData = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { previewData } = req.body;

    const template = await emailTemplateService.updatePreviewData(id, previewData);
    res.json(template);
  } catch (error) {
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Preview data update error:', error);
      res.status(500).json({ error: 'プレビューデータの更新に失敗しました' });
    }
  }
};

// テンプレートのプレビュー生成
export const generatePreview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { recipientId, variables } = req.body;

    const preview = await emailTemplateService.generatePreview(id, recipientId, variables);
    res.json(preview);
  } catch (error) {
    console.error('プレビュー生成エラー:', error);
    res.status(500).json({ message: 'プレビューの生成に失敗しました' });
  }
};

// A/Bテストの作成
export const createABTest = async (req: AuthRequest, res: Response) => {
  try {
    const {
      templateId,
      name,
      description,
      variantA,
      variantB,
      startDate,
      endDate,
    } = req.body;

    const abTest = await emailTemplateService.createABTest({
      templateId,
      name,
      description,
      variantA,
      variantB,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    res.json(abTest);
  } catch (error) {
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('AB test creation error:', error);
      res.status(500).json({ error: 'A/Bテストの作成に失敗しました' });
    }
  }
};

// A/Bテストの結果記録
export const recordABTestResult = async (req: Request, res: Response) => {
  try {
    const { testId, variant, emailId, opened, clicked } = req.body;

    const result = await emailTemplateService.recordABTestResult({
      testId,
      variant,
      emailId,
      opened,
      clicked,
    });

    res.json(result);
  } catch (error) {
    console.error('AB test result recording error:', error);
    res.status(500).json({ error: 'A/Bテスト結果の記録に失敗しました' });
  }
};

// A/Bテストの結果取得
export const getABTestResults = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const results = await emailTemplateService.getABTestResults(testId);
    res.json(results);
  } catch (error) {
    console.error('AB test results retrieval error:', error);
    res.status(500).json({ error: 'A/Bテスト結果の取得に失敗しました' });
  }
};

// A/Bテストの完了
export const completeABTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const { winningVariant } = req.body;

    const abTest = await emailTemplateService.completeABTest(testId, winningVariant);
    res.json(abTest);
  } catch (error) {
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('AB test completion error:', error);
      res.status(500).json({ error: 'A/Bテストの完了処理に失敗しました' });
    }
  }
};

// スケジュールの作成
export const createSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const {
      templateId,
      name,
      description,
      recipientIds,
      scheduleType,
      cronExpression,
      sendAt,
      variables,
    } = req.body;

    const schedule = await emailTemplateService.createSchedule({
      templateId,
      name,
      description,
      recipientIds,
      scheduleType,
      cronExpression,
      sendAt: sendAt ? new Date(sendAt) : undefined,
      variables,
    });

    res.json(schedule);
  } catch (error) {
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Schedule creation error:', error);
      res.status(500).json({ error: 'スケジュールの作成に失敗しました' });
    }
  }
};

// スケジュールの更新
export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      recipientIds,
      cronExpression,
      sendAt,
      variables,
      status,
    } = req.body;

    const schedule = await emailTemplateService.updateSchedule(id, {
      name,
      description,
      recipientIds,
      cronExpression,
      sendAt: sendAt ? new Date(sendAt) : undefined,
      variables,
      status,
    });

    res.json(schedule);
  } catch (error) {
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Schedule update error:', error);
      res.status(500).json({ error: 'スケジュールの更新に失敗しました' });
    }
  }
}; 