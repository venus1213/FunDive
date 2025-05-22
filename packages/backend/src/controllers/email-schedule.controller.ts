import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { EmailTemplateService } from '../services/email-template.service.js';
import { EmailTemplateError } from '../errors/email-template.error.js';
import { logError } from '../utils/error-logger.js';
import { prisma } from '../lib/prisma.js';

const emailTemplateService = new EmailTemplateService();

// スケジュール一覧の取得
export const listSchedules = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const schedules = await prisma.$transaction(async (tx) => {
      return await emailTemplateService.listSchedules(page, limit);
    });

    res.json(schedules);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_schedule_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('Schedule list error:', error);
    res.status(500).json({ error: 'スケジュール一覧の取得に失敗しました' });
  }
};

// スケジュールの取得
export const getSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.$transaction(async (tx) => {
      return await emailTemplateService.getSchedule(id);
    });

    if (!schedule) {
      return res.status(404).json({ error: 'スケジュールが見つかりません' });
    }

    res.json(schedule);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_schedule_get_error',
      error,
      metadata: {
        scheduleId: req.params.id,
      },
    });
    console.error('Schedule retrieval error:', error);
    res.status(500).json({ error: 'スケジュールの取得に失敗しました' });
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

    const schedule = await prisma.$transaction(async (tx) => {
      const newSchedule = await emailTemplateService.createSchedule({
        templateId,
        name,
        description,
        recipientIds,
        scheduleType,
        cronExpression,
        sendAt: sendAt ? new Date(sendAt) : undefined,
        variables,
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'create',
          targetType: 'email',
          targetId: newSchedule.id,
          details: {
            action: 'create_email_schedule',
            templateId,
            scheduleType,
          },
        },
      });

      return newSchedule;
    });

    res.json(schedule);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_schedule_create_error',
      error,
      metadata: {
        templateId: req.body.templateId,
        scheduleType: req.body.scheduleType,
      },
    });
    console.error('Schedule creation error:', error);
    res.status(500).json({ error: 'スケジュールの作成に失敗しました' });
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

    const schedule = await prisma.$transaction(async (tx) => {
      const updatedSchedule = await emailTemplateService.updateSchedule(id, {
        name,
        description,
        recipientIds,
        cronExpression,
        sendAt: sendAt ? new Date(sendAt) : undefined,
        variables,
        status,
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'update',
          targetType: 'email',
          targetId: id,
          details: {
            action: 'update_email_schedule',
            status,
          },
        },
      });

      return updatedSchedule;
    });

    res.json(schedule);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_schedule_update_error',
      error,
      metadata: {
        scheduleId: req.params.id,
        status: req.body.status,
      },
    });
    console.error('Schedule update error:', error);
    res.status(500).json({ error: 'スケジュールの更新に失敗しました' });
  }
};

// スケジュールの削除
export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.$transaction(async (tx) => {
      const schedule = await emailTemplateService.getSchedule(id);
      if (!schedule) {
        throw new EmailTemplateError('スケジュールが見つかりません');
      }

      await emailTemplateService.deleteSchedule(id);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId: req.user?.id,
          actionType: 'delete',
          targetType: 'email',
          targetId: id,
          details: {
            action: 'delete_email_schedule',
          },
        },
      });
    });

    res.status(204).send();
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'email_schedule_delete_error',
      error,
      metadata: {
        scheduleId: req.params.id,
      },
    });
    console.error('Schedule deletion error:', error);
    if (error instanceof EmailTemplateError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'スケジュールの削除に失敗しました' });
    }
  }
}; 