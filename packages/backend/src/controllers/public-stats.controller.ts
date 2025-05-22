import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logError } from '../utils/error-logger.js';

const prisma = new PrismaClient();

/**
 * 公開統計情報を取得するコントローラー
 * - 総ユーザー数
 * - 総プロジェクト数
 * - 総マッチング数（メッセージのやり取りが発生したプロジェクト数）
 */
export const getPublicStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.$transaction(async (tx) => {
      const [
        totalUsers,
        totalProjects,
        totalMatches
      ] = await Promise.all([
        // 総ユーザー数
        tx.user.count(),
        
        // 総プロジェクト数
        tx.project.count({
          where: {
            status: 'active' // アクティブなプロジェクトのみカウント
          }
        }),
        
        // 総マッチング数（メッセージのやり取りが発生したプロジェクト数）
        tx.project.count({
          where: {
            messages: {
              some: {} // メッセージが1つ以上あるプロジェクト
            }
          }
        })
      ]);

      return {
        totalUsers,
        totalProjects,
        totalMatches
      };
    });

    return res.json(stats);
  } catch (error) {
    await logError({
      type: 'public_stats_error',
      error,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
    console.error('公開統計情報の取得に失敗しました:', error);
    return res.status(500).json({ message: '公開統計情報の取得に失敗しました' });
  }
}; 