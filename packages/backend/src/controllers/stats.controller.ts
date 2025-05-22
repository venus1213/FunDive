import { Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { logError } from '../utils/error-logger.js';

export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // すべての統計情報を1つのトランザクションで取得
    const stats = await prisma.$transaction(async (tx) => {
      const [
        projectStats,
        messageStats,
        bookmarkStats,
        notifications,
        recentMessages,
        popularProjects
      ] = await Promise.all([
        // プロジェクト統計
        tx.project.aggregate({
          where: {
            OR: [
              { userId },
              { messages: { some: { receiverId: userId } } }
            ]
          },
          _count: true
        }),
        // メッセージ統計
        tx.message.aggregate({
          where: {
            receiverId: userId,
            isRead: false
          },
          _count: true
        }),
        // ブックマーク統計
        tx.bookmark.aggregate({
          where: { userId },
          _count: true
        }),
        // 通知
        tx.notification.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true
          }
        }),
        // 最近のメッセージ
        tx.message.findMany({
          where: { receiverId: userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            content: true,
            createdAt: true,
            sender: {
              select: {
                name: true
              }
            }
          }
        }),
        // 人気のプロジェクト
        tx.project.findMany({
          where: {
            status: 'active',  // アクティブなプロジェクトのみ
          },
          orderBy: [
            { bookmarks: { _count: 'desc' } },
            { messages: { _count: 'desc' } },
            { createdAt: 'desc' },
          ],
          take: 5,
          select: {
            id: true,
            title: true,
            description: true,
            bookmarks: {
              select: {
                id: true
              }
            }
          }
        })
      ]);

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'read',
          targetType: 'stats',
          details: {
            action: 'get_dashboard_stats',
            stats: {
              projectCount: projectStats._count,
              unreadMessageCount: messageStats._count,
              bookmarkCount: bookmarkStats._count,
            },
          },
        },
      });

      return {
        totalProjects: projectStats._count,
        unreadMessages: messageStats._count,
        bookmarkCount: bookmarkStats._count,
        notifications,
        recentMessages,
        popularProjects: popularProjects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          bookmarkCount: project.bookmarks.length
        }))
      };
    });

    return res.json(stats);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'stats_get_error',
      error,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
    console.error('統計情報の取得に失敗しました:', error);
    return res.status(500).json({ message: '統計情報の取得に失敗しました' });
  }
}; 