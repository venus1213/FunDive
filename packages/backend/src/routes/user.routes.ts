import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate as authMiddleware, AuthRequest } from '../middlewares/auth.middleware';
import { Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// ユーザー情報取得
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        subscription: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('ユーザー情報取得エラー:', error);
    res.status(500).json({ message: 'ユーザー情報の取得に失敗しました' });
  }
});

// オンボーディング関連のエンドポイント
router.post('/update-first-login', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    // 初回ログインフラグを更新
    await prisma.user.update({
      where: { id: userId },
      data: { isFirstLogin: false }
    });
    
    res.status(200).json({ message: '初回ログインステータスを更新しました' });
  } catch (error) {
    console.error('初回ログインステータス更新エラー:', error);
    res.status(500).json({ message: '初回ログインステータスの更新に失敗しました' });
  }
});

router.post('/complete-tour', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    // ツアー完了を記録
    await prisma.activityLog.create({
      data: {
        userId,
        actionType: 'update',
        targetType: 'user',
        details: {
          action: 'complete_tour',
          completedAt: new Date()
        }
      }
    });
    
    res.status(200).json({ message: 'ツアー完了を記録しました' });
  } catch (error) {
    console.error('ツアー完了記録エラー:', error);
    res.status(500).json({ message: 'ツアー完了の記録に失敗しました' });
  }
});

router.post('/complete-task', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    const { taskId } = req.body;
    
    if (!taskId) {
      return res.status(400).json({ message: 'タスクIDが必要です' });
    }
    
    // タスク完了を記録
    await prisma.activityLog.create({
      data: {
        userId,
        actionType: 'update',
        targetType: 'user',
        targetId: taskId,
        details: {
          action: 'complete_task',
          taskId,
          completedAt: new Date()
        }
      }
    });
    
    res.status(200).json({ message: 'タスク完了を記録しました' });
  } catch (error) {
    console.error('タスク完了記録エラー:', error);
    res.status(500).json({ message: 'タスク完了の記録に失敗しました' });
  }
});

router.get('/onboarding-tasks', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    // 完了したタスクを取得
    const completedTasks = await prisma.activityLog.findMany({
      where: {
        userId,
        actionType: 'update',
        targetType: 'user',
        details: {
          path: ['action'],
          equals: 'complete_task'
        }
      },
      select: {
        targetId: true
      }
    });
    
    res.status(200).json({
      completedTasks: completedTasks.map(task => task.targetId)
    });
  } catch (error) {
    console.error('タスク状態取得エラー:', error);
    res.status(500).json({ message: 'タスク状態の取得に失敗しました' });
  }
});

export default router; 