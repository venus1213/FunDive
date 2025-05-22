import { prisma } from '../lib/prisma.js';
import { messageCache, conversationCache } from '../controllers/direct-message.controller.js';

export class DirectMessageCleanupService {
  static async cleanup() {
    try {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      // 3ヶ月以上前のメッセージを削除
      const deletedMessages = await prisma.message.deleteMany({
        where: {
          messageType: 'direct',
          createdAt: {
            lt: threeMonthsAgo
          }
        }
      });

      // ユーザーごとの最大メッセージ数を制限（10,000件を超える古いメッセージを削除）
      const users = await prisma.user.findMany({
        select: { id: true }
      });

      for (const user of users) {
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              { senderId: user.id },
              { receiverId: user.id }
            ],
            messageType: 'direct'
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip: 10000, // 最新の10,000件を保持
        });

        if (messages.length > 0) {
          await prisma.message.deleteMany({
            where: {
              id: {
                in: messages.map(m => m.id)
              }
            }
          });
        }
      }

      // キャッシュをクリア
      messageCache.flushAll();
      conversationCache.flushAll();

      console.log(`Cleanup completed: ${deletedMessages.count} old messages deleted`);
    } catch (error) {
      console.error('Message cleanup error:', error);
      throw error;
    }
  }
} 