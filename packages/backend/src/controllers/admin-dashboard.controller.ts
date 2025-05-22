import { Request, Response } from 'express';
import { AdminDashboardService } from '../services/admin-dashboard.service.js';
import { PrismaClient } from '@prisma/client';

const dashboardService = new AdminDashboardService();
const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getDashboardStats(period);
    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      error: 'ダッシュボード統計の取得に失敗しました',
    });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getUserStats(period);
    res.json(stats);
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({
      error: 'ユーザー統計の取得に失敗しました',
    });
  }
};

export const getInvitationStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getInvitationStats(period);
    res.json(stats);
  } catch (error) {
    console.error('Invitation stats error:', error);
    res.status(500).json({
      error: '招待コード統計の取得に失敗しました',
    });
  }
};

export const getEmailStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getEmailStats(period);
    res.json(stats);
  } catch (error) {
    console.error('Email stats error:', error);
    res.status(500).json({
      error: 'メール送信統計の取得に失敗しました',
    });
  }
};

export const getErrorStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getErrorStats(period);
    res.json(stats);
  } catch (error) {
    console.error('Error stats error:', error);
    res.status(500).json({
      error: 'エラー統計の取得に失敗しました',
    });
  }
};

// キャッシュをクリア
export const clearCache = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string);

    if (period) {
      // 特定の期間のキャッシュをクリア
      if (period < 1 || period > 365) {
        return res.status(400).json({
          error: '期間は1日から365日の間で指定してください',
        });
      }
      dashboardService.clearCacheForPeriod(period);
      res.json({ message: `期間${period}日のキャッシュをクリアしました` });
    } else {
      // 全てのキャッシュをクリア
      dashboardService.clearCache();
      res.json({ message: '全てのキャッシュをクリアしました' });
    }
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({
      error: 'キャッシュのクリアに失敗しました',
    });
  }
};

// プロジェクト統計を取得
export const getProjectStats = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getProjectStats(period);
    res.json(stats);
  } catch (error) {
    console.error('Project stats error:', error);
    res.status(500).json({
      error: 'プロジェクト統計の取得に失敗しました',
    });
  }
};

// 期間別のデータ集計を取得
export const getTimeSeriesStats = async (req: Request, res: Response) => {
  try {
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);
    const interval = (req.query.interval as 'day' | 'week' | 'month') || 'day';

    // 日付の検証
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: '有効な日付を指定してください',
      });
    }

    // 期間の検証（最大1年）
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 365 || diffDays < 1) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const stats = await dashboardService.getTimeSeriesStats(startDate, endDate, interval);
    res.json(stats);
  } catch (error) {
    console.error('Time series stats error:', error);
    res.status(500).json({
      error: '期間別データの取得に失敗しました',
    });
  }
};

// エラーログの詳細を取得
export const getErrorLogDetails = async (req: Request, res: Response) => {
  try {
    const period = parseInt(req.query.period as string) || 30;
    const type = req.query.type as string;

    // 期間の検証
    if (period < 1 || period > 365) {
      return res.status(400).json({
        error: '期間は1日から365日の間で指定してください',
      });
    }

    const details = await dashboardService.getErrorLogDetails(period, type);
    res.json(details);
  } catch (error) {
    console.error('Error log details error:', error);
    res.status(500).json({
      error: 'エラーログ詳細の取得に失敗しました',
    });
  }
};

export const deleteErrorLogs = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: '削除するエラーログのIDを指定してください' });
    }

    await prisma.errorLog.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    return res.status(200).json({ message: 'エラーログを削除しました' });
  } catch (error) {
    console.error('Error deleting error logs:', error);
    return res.status(500).json({ message: 'エラーログの削除中にエラーが発生しました' });
  }
}; 