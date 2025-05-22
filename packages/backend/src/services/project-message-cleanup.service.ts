import { prisma } from '../lib/prisma.js';
import { logger } from '../utils/logger.js';

interface PlanLimits {
  retentionMonths: number;
  messageLimit: number;
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  premium: {
    retentionMonths: 12,
    messageLimit: 50000
  },
  standard: {
    retentionMonths: 6,
    messageLimit: 10000
  },
  startup_partner: {
    retentionMonths: 3,
    messageLimit: 5000
  },
  free: {
    retentionMonths: 1,
    messageLimit: 1000
  }
};

export class ProjectMessageCleanupService {
  static async cleanup() {
    try {
      // プロジェクトとそのオーナーの情報を取得
      const projects = await prisma.project.findMany({
        select: {
          id: true,
          userId: true,
          user: {
            select: {
              planType: true
            }
          }
        }
      });

      let totalDeletedMessages = 0;

      for (const project of projects) {
        const planType = project.user.planType.toLowerCase();
        const limits = PLAN_LIMITS[planType] || PLAN_LIMITS.free;

        // 保持期間を超えたメッセージを削除
        const retentionDate = new Date();
        retentionDate.setMonth(retentionDate.getMonth() - limits.retentionMonths);

        const deletedOldMessages = await prisma.message.deleteMany({
          where: {
            projectId: project.id,
            messageType: 'project',
            createdAt: {
              lt: retentionDate
            }
          }
        });

        // メッセージ数の制限を超えた古いメッセージを削除
        const messages = await prisma.message.findMany({
          where: {
            projectId: project.id,
            messageType: 'project'
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip: limits.messageLimit,
          select: {
            id: true
          }
        });

        if (messages.length > 0) {
          const deletedExcessMessages = await prisma.message.deleteMany({
            where: {
              id: {
                in: messages.map(m => m.id)
              }
            }
          });

          totalDeletedMessages += deletedExcessMessages.count;
        }

        totalDeletedMessages += deletedOldMessages.count;
      }

      logger.info(`Project message cleanup completed: ${totalDeletedMessages} messages deleted`);
    } catch (error) {
      logger.error('Project message cleanup error:', error);
      throw error;
    }
  }
} 