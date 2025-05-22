import { prisma } from '../lib/prisma.js';
import { subMonths } from 'date-fns';
import { logger } from '../utils/logger.js';

export class NotificationCleanupService {
  static async cleanupOldNotifications() {
    try {
      const oneMonthAgo = subMonths(new Date(), 1);
      logger.info('Starting notification cleanup', { beforeDate: oneMonthAgo });

      // 1ヶ月以上前の通知を削除
      const { count: deletedCount } = await prisma.notification.deleteMany({
        where: {
          createdAt: {
            lt: oneMonthAgo
          }
        }
      });

      logger.info(`Deleted ${deletedCount} old notifications`);

      // 100件を超える通知がある場合、古い順にアーカイブ
      const users = await prisma.user.findMany({
        select: { id: true }
      });

      for (const user of users) {
        const notificationCount = await prisma.notification.count({
          where: { userId: user.id }
        });

        if (notificationCount > 100) {
          const notificationsToArchive = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'asc' },
            take: notificationCount - 100
          });

          await prisma.$transaction(async (tx) => {
            // アーカイブテーブルに移動
            await tx.notificationArchive.createMany({
              data: notificationsToArchive.map(n => ({
                originalId: n.id,
                userId: n.userId,
                type: n.type,
                title: n.title,
                content: n.content,
                isRead: n.isRead,
                relatedId: n.relatedId,
                createdAt: n.createdAt
              }))
            });

            // 元の通知を削除
            await tx.notification.deleteMany({
              where: {
                id: {
                  in: notificationsToArchive.map(n => n.id)
                }
              }
            });
          });

          logger.info(`Archived ${notificationsToArchive.length} notifications for user ${user.id}`);
        }
      }

      return {
        deletedCount,
        processedUsers: users.length
      };
    } catch (error) {
      logger.error('Notification cleanup failed:', error);
      throw error;
    }
  }
} 