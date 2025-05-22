import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { logger } from '../utils/logger.js';
import { prisma } from '../lib/prisma.js';
import { AuthUser } from '../types/auth.js';
import geoip from 'geoip-lite';

// Expressのリクエストインターフェースを拡張
declare module 'express' {
  interface Request {
    user?: AuthUser;
  }
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}


export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    const sessionCookie = req.cookies.session;

    logger.info('認証リクエスト受信', {
      path: req.path,
      method: req.method,
      headers: {
        contentType: req.headers['content-type'],
        userAgent: req.headers['user-agent']
      },
      cookies: {
        hasSession: !!sessionCookie
      },
      ip: req.ip
    });

    if (!sessionCookie) {
      logger.warn('セッションCookieが見つかりません', {
        path: req.path,
        headers: req.headers
      });
      return res.status(401).json({ message: '認証が必要です' });
    }

    try {
      let decodedToken;
      
      if (process.env.NODE_ENV === 'development') {
        try {
          logger.debug('開発環境でのセッション検証開始');
          decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
          logger.debug('開発環境でのセッション検証成功', { uid: decodedToken.uid });
        } catch (error) {
          logger.warn('開発環境でのセッション検証失敗、デコードを試みます', { error });
          const decoded = JSON.parse(Buffer.from(sessionCookie.split('.')[1], 'base64').toString());
          const uid = decoded.user_id;
          if (uid) {
            const user = await getAuth().getUser(uid);
            decodedToken = {
              firebaseUid: user.uid,
              email: user.email,
              email_verified: user.emailVerified,
              name: user.displayName
            };
            logger.info('開発環境でのユーザー情報取得成功', { uid: user.uid });
          }
        }
      } else {
        logger.debug('本番環境でのセッション検証開始');
        decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
        logger.debug('本番環境でのセッション検証成功', { uid: decodedToken.uid });
      }

      if (!decodedToken) {
        logger.error('セッション検証失敗', { error: 'デコードされたセッションが存在しません' });
        throw new Error('セッションの検証に失敗しました');
      }

      // キャッシュを使用してユーザー情報を取得
      const firebaseUid = decodedToken.uid || decodedToken.firebaseUid;  // 両方のパターンに対応
      logger.debug('ユーザー情報取得開始', { firebaseUid });
      let user = await prisma.user.findFirst({
        where: {
          firebaseUid: firebaseUid
        },
        include: {
          profile: true,
          subscription: true
        }
      });

      if (!user && decodedToken.email) {
        logger.debug('FirebaseUIDでユーザーが見つからず、メールアドレスで検索', { email: decodedToken.email });
        user = await prisma.user.findUnique({
          where: { email: decodedToken.email },
          include: {
            profile: true,
            subscription: true
          }
        });
      }

      if (!user) {
        logger.info('新規ユーザーの作成開始', {
          email: decodedToken.email,
          firebaseUid
        });
        user = await prisma.$transaction(async (prisma) => {
          const newUser = await prisma.user.create({
            data: {
              email: decodedToken.email || '',
              firebaseUid,
              role: decodedToken.role || 'entrepreneur',
              name: decodedToken.name || decodedToken.email?.split('@')[0] || '',
              isVerified: true,
              isAdmin: false,
              profile: {
                create: {
                  name: decodedToken.name || decodedToken.email?.split('@')[0] || '',
                  is_public: true,
                  visible_fields: ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'],
                }
              }
            },
            include: {
              profile: true,
              subscription: true
            }
          });

          return newUser;
        });

        if (!user) {
          throw new Error('ユーザーの作成に失敗しました');
        }
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        firebaseUid,
        isVerified: user.isVerified,
        subscription: user.subscription,
        isAdmin: user.isAdmin || false,
        planType: user.planType,
        isFirstLogin: user.isFirstLogin || false
      };

      return next();
    } catch (verifyError) {
      logger.error('セッション検証エラー:', {
        error: verifyError,
        path: req.path,
        method: req.method,
        ip: req.ip
      });
      return res.status(401).json({ message: '認証に失敗しました' });
    }
  } catch (error) {
    logger.error('認証処理エラー:', {
      error,
      path: req.path,
      method: req.method,
      ip: req.ip,
      userId: req.user?.firebaseUid
    });

    if (error instanceof Error) {
      await prisma.errorLog.create({
        data: {
          userId: req.user?.firebaseUid,
          type: 'AUTH_ERROR',
          error: error.message,
          metadata: {
            errorType: error.constructor.name,
            path: req.path,
            method: req.method,
            ip: req.ip,
            userAgent: req.headers['user-agent']
          },
        },
      });
    }
    return res.status(401).json({ message: '認証に失敗しました' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '権限がありません' });
    }

    next();
  };
};

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: '管理者権限が必要です' });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      await prisma.errorLog.create({
        data: {
          userId: req.user?.firebaseUid || 'unknown',
          type: 'ADMIN_AUTH_ERROR',
          error: error.message,
          metadata: {
            errorType: error.constructor.name,
            path: req.path,
            method: req.method,
          },
        },
      });
    }
    return res.status(500).json({ message: '権限の確認に失敗しました' });
  }
}; 