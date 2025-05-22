import { PrismaClient, EmailStatus, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { logger } from '../utils/logger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  period: number;
}

export class AdminDashboardService {
  private prisma: PrismaClient;
  private cache: {
    userStats: Map<number, CacheEntry<any>>;
    invitationStats: Map<number, CacheEntry<any>>;
    emailStats: Map<number, CacheEntry<any>>;
    errorStats: Map<number, CacheEntry<any>>;
    dashboardStats: Map<number, CacheEntry<any>>;
    projectStats: Map<number, CacheEntry<any>>;
  };
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5分

  constructor() {
    this.prisma = prisma;
    this.cache = {
      userStats: new Map(),
      invitationStats: new Map(),
      emailStats: new Map(),
      errorStats: new Map(),
      dashboardStats: new Map(),
      projectStats: new Map(),
    };
  }

  private isCacheValid<T>(cache: Map<number, CacheEntry<T>>, period: number): boolean {
    const entry = cache.get(period);
    if (!entry) return false;
    return Date.now() - entry.timestamp < this.CACHE_TTL;
  }

  private getCachedData<T>(cache: Map<number, CacheEntry<T>>, period: number): T | null {
    if (!this.isCacheValid(cache, period)) {
      cache.delete(period);
      return null;
    }
    return cache.get(period)?.data || null;
  }

  private setCachedData<T>(cache: Map<number, CacheEntry<T>>, period: number, data: T): void {
    cache.set(period, {
      data,
      timestamp: Date.now(),
      period,
    });
  }

  private convertBigIntToNumber(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'bigint') {
      return Number(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertBigIntToNumber(item));
    }

    if (typeof obj === 'object') {
      const converted: any = {};
      for (const key in obj) {
        converted[key] = this.convertBigIntToNumber(obj[key]);
      }
      return converted;
    }

    return obj;
  }

  // アクティブユーザー統計の取得
  async getUserStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.userStats, period);
    if (cachedData) {
      logger.debug('Returning cached user stats');
      return cachedData;
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      return this.getUserStatsInTransaction(tx, period);
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.userStats, period, convertedStats);
    return convertedStats;
  }

  // 招待コードの使用状況
  async getInvitationStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.invitationStats, period);
    if (cachedData) {
      logger.debug('Returning cached invitation stats');
      return cachedData;
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      return this.getInvitationStatsInTransaction(tx, period);
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.invitationStats, period, convertedStats);
    return convertedStats;
  }

  // メール送信の成功/失敗率
  async getEmailStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.emailStats, period);
    if (cachedData) {
      logger.debug('Returning cached email stats');
      return cachedData;
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      return this.getEmailStatsInTransaction(tx, period);
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.emailStats, period, convertedStats);
    return convertedStats;
  }

  // エラーログの集計
  async getErrorStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.errorStats, period);
    if (cachedData) {
      logger.debug('Returning cached error stats');
      return cachedData;
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      return this.getErrorStatsInTransaction(tx, period);
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.errorStats, period, convertedStats);
    return convertedStats;
  }

  // ダッシュボード全体の統計を取得
  async getDashboardStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.dashboardStats, period);
    if (cachedData) {
      logger.debug('Returning cached dashboard stats');
      return cachedData;
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      const [
        userStats,
        invitationStats,
        emailStats,
        errorStats,
      ] = await Promise.all([
        this.getUserStatsInTransaction(tx, period),
        this.getInvitationStatsInTransaction(tx, period),
        this.getEmailStatsInTransaction(tx, period),
        this.getErrorStatsInTransaction(tx, period),
      ]);

      return {
        userStats,
        invitationStats,
        emailStats,
        errorStats,
        period,
        timestamp: new Date(),
      };
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.dashboardStats, period, convertedStats);
    return convertedStats;
  }

  // プロジェクト統計を取得
  async getProjectStats(period: number = 30) {
    const cachedData = this.getCachedData(this.cache.projectStats, period);
    if (cachedData) {
      logger.debug('Returning cached project stats');
      return cachedData;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    const stats = await this.prisma.$transaction(async (tx) => {
      const [
        totalProjects,
        newProjects,
        activeProjects,
        projectsByCategory,
        projectsByStage,
        popularProjects,
      ] = await Promise.all([
        // 総プロジェクト数
        tx.project.count(),
        // 期間内の新規プロジェクト数
        tx.project.count({
          where: {
            createdAt: { gte: startDate }
          }
        }),
        // アクティブなプロジェクト数
        tx.project.count({
          where: { status: 'active' }
        }),
        // カテゴリー別プロジェクト数
        tx.project.groupBy({
          by: ['category'],
          _count: true,
        }),
        // ステージ別プロジェクト数
        tx.project.groupBy({
          by: ['projectStage'],
          _count: true,
        }),
        // 人気のプロジェクト（ブックマーク数順）
        tx.project.findMany({
          take: 5,
          orderBy: { popularityScore: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            popularityScore: true,
            _count: {
              select: { bookmarks: true }
            }
          }
        })
      ]);

      return {
        total: totalProjects,
        newProjectsCount: newProjects,
        activeProjectsCount: activeProjects,
        categoryDistribution: projectsByCategory,
        stageDistribution: projectsByStage,
        popularProjects,
        period,
        timestamp: new Date(),
      };
    });

    const convertedStats = this.convertBigIntToNumber(stats);
    this.setCachedData(this.cache.projectStats, period, convertedStats);
    return convertedStats;
  }

  // 期間別のデータ集計
  async getTimeSeriesStats(startDate: Date, endDate: Date, interval: 'day' | 'week' | 'month' = 'day') {
    try {
      const stats = await this.prisma.$transaction(async (tx) => {
        // プロジェクト作成数の推移
        const projectCreation = await tx.$queryRaw<Array<{ date: string; count: number }>>`
          SELECT 
            DATE_TRUNC('day', "createdAt") as date,
            COUNT(*) as count
          FROM "projects"
          WHERE "createdAt" >= ${startDate}
            AND "createdAt" <= ${endDate}
          GROUP BY DATE_TRUNC('day', "createdAt")
          ORDER BY date ASC
        `;

        // ユーザー登録数の推移
        const userRegistration = await tx.$queryRaw<Array<{ date: string; count: number }>>`
          SELECT 
            DATE_TRUNC('day', "createdAt") as date,
            COUNT(*) as count
          FROM "users"
          WHERE "createdAt" >= ${startDate}
            AND "createdAt" <= ${endDate}
          GROUP BY DATE_TRUNC('day', "createdAt")
          ORDER BY date ASC
        `;

        // メール送信数の推移
        const emailSending = await tx.$queryRaw<Array<{ date: string; count: number }>>`
          SELECT 
            DATE_TRUNC('day', "sentAt") as date,
            COUNT(*) as count
          FROM "email_logs"
          WHERE "sentAt" >= ${startDate}
            AND "sentAt" <= ${endDate}
          GROUP BY DATE_TRUNC('day', "sentAt")
          ORDER BY date ASC
        `;

        // 結果を整形
        const formatTimeSeriesData = (data: Array<{ date: string | Date; count: number }>) => {
          return data.map(item => ({
            createdAt: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
            _count: Number(item.count),
          }));
        };

        return {
          projectCreation: formatTimeSeriesData(projectCreation),
          userRegistration: formatTimeSeriesData(userRegistration),
          emailSending: formatTimeSeriesData(emailSending),
          interval,
          startDate,
          endDate,
        };
      });

      return stats;
    } catch (error) {
      throw error;
    }
  }

  // エラーログの詳細取得
  async getErrorLogDetails(period: number = 30, type?: string) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    const whereClause = {
      createdAt: { gte: startDate },
      ...(type && { type }),
    };

    const [
      errorLogs,
      errorSummary,
      errorsByType
    ] = await Promise.all([
      // エラーログの詳細
      this.prisma.errorLog.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      // エラー数の集計
      this.prisma.errorLog.count({
        where: whereClause,
      }),
      // タイプ別のエラー数
      this.prisma.errorLog.groupBy({
        by: ['type'],
        where: whereClause,
        _count: true,
      }),
    ]);

    return {
      logs: errorLogs,
      total: errorSummary,
      typeDistribution: errorsByType,
      period,
    };
  }

  // キャッシュをクリア
  clearCache(): void {
    this.cache.userStats.clear();
    this.cache.invitationStats.clear();
    this.cache.emailStats.clear();
    this.cache.errorStats.clear();
    this.cache.dashboardStats.clear();
    this.cache.projectStats.clear();
    logger.info('Dashboard cache cleared');
  }

  // 特定の期間のキャッシュをクリア
  clearCacheForPeriod(period: number): void {
    this.cache.userStats.delete(period);
    this.cache.invitationStats.delete(period);
    this.cache.emailStats.delete(period);
    this.cache.errorStats.delete(period);
    this.cache.dashboardStats.delete(period);
    this.cache.projectStats.delete(period);
    logger.info(`Dashboard cache cleared for period: ${period}`);
  }

  // 以下は内部メソッド
  private async getUserStatsInTransaction(tx: Prisma.TransactionClient, period: number = 30) {
    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - period));

    const [totalUsers, activeUsers, verifiedUsers, invitedUsers, usersByPlan] = await Promise.all([
      // 総ユーザー数
      tx.user.count(),
      // アクティブユーザー数（期間内にログインしたユーザー）
      tx.activityLog.findMany({
        where: {
          actionType: 'login',
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          userId: true,
        },
        distinct: ['userId'],
      }),
      // 認証済みユーザー数
      tx.user.count({
        where: {
          isVerified: true,
        },
      }),
      // 招待中のユーザー数
      tx.user.count({
        where: {
          invitationExpires: {
            gt: new Date(),
          },
          isVerified: false,
        },
      }),
      // プラン別ユーザー数
      tx.user.groupBy({
        by: ['planType'],
        _count: true,
      }),
    ]);

    // プラン別ユーザー数をオブジェクトに変換
    const usersByPlanMap = usersByPlan.reduce((acc, item) => {
      acc[item.planType] = item._count;
      return acc;
    }, {} as Record<string, number>);

    // すべてのプランタイプを確実に含むようにする
    const planTypes = ['free', 'startup_partner', 'standard', 'premium'];
    const usersByPlanFormatted = planTypes.reduce((acc, planType) => {
      acc[planType] = usersByPlanMap[planType] || 0;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      activeUsers: activeUsers.length,
      verifiedUsers,
      invitedUsers,
      activeUserRate: totalUsers > 0 ? (activeUsers.length / totalUsers) * 100 : 0,
      verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
      // プラン別ユーザー数を追加
      usersByPlan: usersByPlanFormatted,
    };
  }

  // 招待ユーザー統計の取得
  private async getInvitationStatsInTransaction(tx: Prisma.TransactionClient, period: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    const [
      totalCodes,
      activeCodes,
      expiredCodes,
      usedCodes,
      recentUsage,
    ] = await Promise.all([
      // 総コード数
      tx.invitationCode.count(),
      // 有効なコード数
      tx.invitationCode.count({
        where: {
          expiresAt: { gt: new Date() },
          currentUses: { lt: tx.invitationCode.fields.maxUses },
        },
      }),
      // 期限切れのコード数
      tx.invitationCode.count({
        where: {
          expiresAt: { lt: new Date() },
        },
      }),
      // 使用済みのコード数
      tx.invitationCode.count({
        where: {
          currentUses: { gt: 0 },
        },
      }),
      // 最近の使用履歴
      tx.invitationCode.findMany({
        where: {
          OR: [
            { currentUses: { gt: 0 } },
            { expiresAt: { gt: new Date() } },
          ],
        },
        select: {
          code: true,
          currentUses: true,
          maxUses: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 5,
      }),
    ]);

    // 日付データを文字列に変換
    const formattedRecentUsage = recentUsage.map(usage => ({
      ...usage,
      createdAt: usage.createdAt.toISOString(),
      updatedAt: usage.updatedAt.toISOString(),
    }));

    return {
      totalCodes,
      activeCodes,
      expiredCodes,
      usedCodes,
      usageRate: totalCodes > 0 ? (usedCodes / totalCodes) * 100 : 0,
      recentUsage: formattedRecentUsage,
      period,
      timestamp: new Date().toISOString(),
    };
  }

  private async getEmailStatsInTransaction(tx: Prisma.TransactionClient, period: number = 30) {
    try {
      const now = new Date();
      const startDate = new Date(now.setDate(now.getDate() - period));

      const [totalEmails, successfulEmails, failedEmails] = await Promise.all([
        // 総メール送信数
        tx.emailLog.count({
          where: {
            sentAt: {
              gte: startDate,
            },
          },
        }),
        // 送信成功数
        tx.emailLog.count({
          where: {
            status: EmailStatus.SENT,
            sentAt: {
              gte: startDate,
            },
          },
        }),
        // 送信失敗数
        tx.emailLog.count({
          where: {
            status: EmailStatus.FAILED,
            sentAt: {
              gte: startDate,
            },
          },
        }),
      ]);

      // 日付ごとの送信数を取得
      const dailyStats = await tx.$queryRaw<Array<{ date: Date; count: number }>>`
        SELECT 
          DATE_TRUNC('day', "sentAt")::timestamp as date,
          COUNT(*) as count
        FROM "email_logs"
        WHERE "sentAt" >= ${startDate}
        GROUP BY DATE_TRUNC('day', "sentAt")
        ORDER BY date ASC
      `;

      // 日付ごとの送信数を整形
      const emailSending = dailyStats.map(stat => ({
        sentAt: stat.date.toISOString(),
        _count: Number(stat.count),
      }));

      // テンプレート別の送信統計を取得
      const templateStats = await tx.emailLog.groupBy({
        by: ['templateId'],
        where: {
          sentAt: {
            gte: startDate,
          },
        },
        _count: true,
      });

      // テンプレート情報を取得
      const templateDetails = await tx.emailTemplate.findMany({
        where: {
          id: {
            in: templateStats.map(stat => stat.templateId),
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      // テンプレート情報を統合
      const enrichedTemplateStats = templateStats.map(stat => ({
        templateId: stat.templateId,
        _count: stat._count,
        template: templateDetails.find(t => t.id === stat.templateId),
      }));

      // 最近の送信失敗
      const recentFailures = await tx.emailLog.findMany({
        where: {
          status: EmailStatus.FAILED,
          sentAt: {
            gte: startDate,
          },
        },
        include: {
          template: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          sentAt: 'desc',
        },
        take: 10,
      });

      return {
        totalEmails,
        successfulEmails,
        failedEmails,
        successRate: totalEmails > 0 ? (successfulEmails / totalEmails) * 100 : 0,
        failureRate: totalEmails > 0 ? (failedEmails / totalEmails) * 100 : 0,
        templateStats: enrichedTemplateStats,
        recentFailures,
        emailSending,
      };
    } catch (error) {
      throw error;
    }
  }

  private async getErrorStatsInTransaction(tx: Prisma.TransactionClient, period: number = 30) {
    try {
      const now = new Date();
      const startDate = new Date(now.setDate(now.getDate() - period));

      // エラータイプ別の集計
      const errorsByType = await tx.$queryRaw<Array<{ type: string; count: number }>>`
        SELECT 
          type,
          COUNT(*) as count
        FROM "ErrorLog"
        WHERE "createdAt" >= ${startDate}
        GROUP BY type
      `;

      // ユーザー別のエラー発生数上位
      const errorsByUser = await tx.$queryRaw<Array<{ userId: string; count: number }>>`
        SELECT 
          "userId",
          COUNT(*) as count
        FROM "ErrorLog"
        WHERE "createdAt" >= ${startDate}
          AND "userId" IS NOT NULL
        GROUP BY "userId"
        ORDER BY count DESC
        LIMIT 10
      `;

      // 最近のエラー
      const recentErrors = await tx.errorLog.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      });

      // 時系列でのエラー数推移
      const errorTrend = await tx.$queryRaw<Array<{ type: string; count: number }>>`
        SELECT 
          type,
          COUNT(*) as count
        FROM "ErrorLog"
        WHERE "createdAt" >= ${startDate}
        GROUP BY type
      `;

      const totalErrors = errorsByType.reduce((sum, stat) => sum + Number(stat.count), 0);

      return {
        errorsByType,
        errorsByUser,
        recentErrors,
        errorTrend,
        totalErrors,
      };
    } catch (error) {
      throw error;
    }
  }
} 