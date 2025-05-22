import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { AuthRequest } from './auth.middleware.js';

const prisma = new PrismaClient();

// カスタムエラークラス
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public type: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Firebaseエラーの型ガード
function isFirebaseError(error: unknown): error is { code: string; message: string } {
  if (!error || typeof error !== 'object') return false;
  const err = error as { code?: unknown; message?: unknown };
  return typeof err.code === 'string' && typeof err.message === 'string';
}

export const errorHandler = async (
  err: Error,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // エラーの種類に基づいてステータスコードとメッセージを設定
  let statusCode = 500;
  let errorType = 'INTERNAL_SERVER_ERROR';
  let message = '内部サーバーエラーが発生しました';
  let details = undefined;

  // AppErrorの場合
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorType = err.type;
    message = err.message;
    details = err.details;
  }
  // Prismaのエラーの場合
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
    case 'P2002':
      statusCode = 409;
      errorType = 'UNIQUE_CONSTRAINT_VIOLATION';
      message = '一意制約違反が発生しました';
      break;
    case 'P2025':
      statusCode = 404;
      errorType = 'RECORD_NOT_FOUND';
      message = '指定されたレコードが見つかりません';
      break;
    default:
      statusCode = 400;
      errorType = 'DATABASE_ERROR';
      message = 'データベースエラーが発生しました';
    }
    details = {
      code: err.code,
      meta: err.meta,
    };
  }
  // Firebaseのエラーの場合
  else if (isFirebaseError(err)) {
    statusCode = 401;
    errorType = 'FIREBASE_ERROR';
    message = '認証エラーが発生しました';
    details = {
      code: err.code,
      message: err.message,
    };
  }

  // エラーログをデータベースに保存（ユーザーIDが存在する場合のみ）
  try {
    const userId = req.user?.id;
    if (userId) {
      const metadata = {
        error: {
          stack: err.stack,
          details: details ? JSON.stringify(details) : undefined,
          request: {
            path: req.path,
            method: req.method,
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
            headers: JSON.stringify(req.headers),
          }
        }
      };

      await prisma.errorLog.create({
        data: {
          userId,
          type: errorType,
          error: message,
          metadata: JSON.stringify(metadata),
        },
      });
    }
  } catch (logError) {
    console.error('Failed to save error log:', logError);
  }

  // レスポンスが既に送信されていないことを確認
  if (!res.headersSent) {
    const response = {
      error: {
        type: errorType,
        message,
        ...(process.env.NODE_ENV !== 'production' && {
          stack: err.stack,
          details,
        }),
      },
    };

    return res.status(statusCode).json(response);
  }

  next(err);
}; 