import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { prisma } from '../lib/prisma.js';
import { logError } from '../utils/error-logger.js';

/**
 * ブックマークの作成
 */
export const createBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const bookmark = await prisma.$transaction(async (tx) => {
      // プロジェクトの存在確認
      const project = await tx.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        throw new Error('プロジェクトが見つかりません');
      }

      // 既存のブックマークをチェック
      const existingBookmark = await tx.bookmark.findFirst({
        where: {
          userId,
          projectId,
        },
      });

      if (existingBookmark) {
        throw new Error('既にブックマークされています');
      }

      // ブックマークの作成
      const newBookmark = await tx.bookmark.create({
        data: {
          userId,
          projectId,
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'create',
          targetType: 'bookmark',
          targetId: newBookmark.id,
          details: {
            projectId,
            action: 'create_bookmark',
          },
        },
      });

      return newBookmark;
    });

    res.status(201).json(bookmark);
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'bookmark_create_error',
      error,
      metadata: {
        projectId: req.body.projectId,
      },
    });
    console.error('Bookmark creation error:', error);
    if (error instanceof Error && (
      error.message === 'プロジェクトが見つかりません' ||
      error.message === '既にブックマークされています'
    )) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'ブックマークの作成中にエラーが発生しました' });
  }
};

/**
 * ブックマークの削除
 */
export const deleteBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    await prisma.$transaction(async (tx) => {
      // ブックマークの存在確認
      const bookmark = await tx.bookmark.findFirst({
        where: {
          userId,
          projectId,
        },
      });

      if (!bookmark) {
        throw new Error('ブックマークが見つかりません');
      }

      // ブックマークの削除
      await tx.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      });

      // アクティビティログを記録
      await tx.activityLog.create({
        data: {
          userId,
          actionType: 'delete',
          targetType: 'bookmark',
          targetId: bookmark.id,
          details: {
            projectId,
            action: 'delete_bookmark',
          },
        },
      });
    });

    res.json({ message: 'ブックマークを削除しました' });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'bookmark_delete_error',
      error,
      metadata: {
        projectId: req.params.projectId,
      },
    });
    console.error('Bookmark deletion error:', error);
    if (error instanceof Error && error.message === 'ブックマークが見つかりません') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'ブックマークの削除中にエラーが発生しました' });
  }
};

/**
 * ユーザーのブックマーク一覧取得
 */
export const getUserBookmarks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // 総件数の取得
    const total = await prisma.bookmark.count({
      where: { userId }
    });

    // ブックマーク一覧の取得
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      bookmarks,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    await logError({
      userId: req.user?.id,
      type: 'bookmark_get_list_error',
      error,
      metadata: {
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    console.error('Bookmarks fetch error:', error);
    res.status(500).json({ message: 'ブックマークの取得中にエラーが発生しました' });
  }
}; 