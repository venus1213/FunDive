import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { logger } from '../utils/logger';
import { prisma, clearUserCache } from '../lib/prisma';
import { getAuth } from 'firebase-admin/auth';
import { getSessionCookieOptions } from '../routes/auth.routes';
import { logError } from '../utils/error-logger';
/**
 * 新規ユーザー登録
 * - Firebaseで認証後、ユーザー情報をデータベースに保存
 * - プロフィールの作成
 * - サブスクリプションプランの設定（選択時）
 * - アクティビティログの記録
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, displayName, role, selectedPlan, selectedCycle, idToken } = req.body;
    logger.info('Registration request received:', { email, name, displayName, role, selectedPlan, selectedCycle });

    // Firebaseトークンの存在確認
    if (!idToken) {
      return res.status(400).json({ message: '認証トークンが必要です' });
    }

    try {
      logger.info('Attempting to verify Firebase token...');
      const decodedToken = await getAuth().verifyIdToken(idToken);
      const firebaseUser = await getAuth().getUser(decodedToken.uid);

      // メールアドレスの一致を確認
      if (decodedToken.email !== email) {
        logger.error('Email mismatch:', {
          tokenEmail: decodedToken.email,
          requestEmail: email
        });
        return res.status(401).json({ message: 'メールアドレスが一致しません' });
      }

      // 既存ユーザーの確認を事前に行う
      const existingUser = await prisma.user.findUnique({
        where: { firebaseUid: firebaseUser.uid }
      });

      if (existingUser) {
        logger.info('Existing user found:', { email });
        return res.status(409).json({ message: 'このメールアドレスは既に登録されています' });  // 409 Conflict
      }

      // Googleアカウントの情報を優先
      const userName = name || firebaseUser.displayName || email.split('@')[0];
      const userDisplayName = displayName || name || firebaseUser.displayName || '';

      // トランザクションでユーザー関連の全データを作成
      const user = await prisma.$transaction(async (tx) => {
        // 1. ユーザーの基本情報を作成
        const newUser = await tx.user.create({
          data: {
            email,
            name: userName,
            role: role || 'entrepreneur',
            isVerified: true,
            planType: 'free',
            firebaseUid: firebaseUser.uid,
            isFirstLogin: true,
          },
        });

        // 2. ユーザープロフィールを作成
        await tx.profile.create({
          data: {
            userId: newUser.id,
            name: userName,
            displayName: userDisplayName,
            is_public: true,
            visible_fields: ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'],
          },
        });

        await tx.activityLog.create({
          data: {
            userId: newUser.id,
            actionType: 'create',
            targetType: 'user',
            targetId: newUser.id,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            details: {
              email: newUser.email,
              name: newUser.name,
              selectedPlan: selectedPlan || 'free',
              selectedCycle: selectedCycle || '月額',
            },
          },
        });

        return newUser;
      });

      // 登録完了レスポンスを返す
      res.status(201).json({
        message: 'アカウントを作成しました',
        user: {
          id: user.id,
          firebaseUid: user.firebaseUid,
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: user.isVerified,
          isFirstLogin: user.isFirstLogin,
          selectedPlan: selectedPlan || 'free'
        }
      });
    } catch (error) {
      await logError({
        type: 'auth_firebase_verification_error',
        error,
        metadata: {
          email,
          name,
          role,
        },
      });
      logger.error('Firebase token verification error:', error);
      return res.status(401).json({ message: '認証に失敗しました' });
    }
  } catch (error) {
    await logError({
      type: 'auth_registration_error',
      error,
      metadata: {
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
      },
    });
    logger.error('Registration error:', error);
    res.status(500).json({ message: '登録中にエラーが発生しました' });
  }
};

/**
 * ユーザーログイン
 * - Firebaseで認証
 * - ユーザー情報の取得または新規作成
 * - プロフィール情報の取得
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    logger.info('Login attempt with idToken');
    
    // IDトークンの検証
    const decodedToken = await getAuth().verifyIdToken(idToken);
    logger.info('ID token verified successfully', { uid: decodedToken.uid });

    // ユーザーの存在確認
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      include: {
        profile: true
      }
    });

    const isNewUser = !existingUser;
    logger.info('User existence check:', { isNewUser });

    if (isNewUser) {
      // 新規ユーザーの場合は、セッションCookieを設定せずにisNewUserフラグのみを返す
      return res.status(200).json({
        status: 'success',
        isNewUser: true,
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email,
          displayName: decodedToken.name
        }
      });
    }

    // 既存ユーザーの場合のみセッションCookieを設定
    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 14 * 1000
    });
    logger.info('Session cookie created');

    // Cookieの設定
    const cookieOptions = getSessionCookieOptions();
    res.cookie('session', sessionCookie, cookieOptions);

    // アクティビティログの記録
    await prisma.$transaction(async (tx) => {
      await tx.activityLog.create({
        data: {
          userId: existingUser.id,
          actionType: 'auth',
          targetType: 'user',
          details: {
            action: 'login',
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          },
        },
      });
    });

    res.status(200).json({
      status: 'success',
      isNewUser: false,
      user: {
        ...existingUser,
        uid: decodedToken.uid
      }
    });
  } catch (error) {
    await logError({
      type: 'auth_login_error',
      error,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
    logger.error('Login error:', error);
    res.status(401).json({ error: '認証に失敗しました' });
  }
};

/**
 * ログアウト処理
 * - アクティビティログの記録
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const sessionCookie = req.cookies.session || '';
    
    // セッションCookieの無効化
    if (sessionCookie) {
      const decodedClaim = await getAuth().verifySessionCookie(sessionCookie);
      
      await prisma.$transaction(async (tx) => {
        await tx.activityLog.create({
          data: {
            userId: decodedClaim.firebaseUid,
            actionType: 'auth',
            targetType: 'user',
            details: {
              action: 'logout',
              ipAddress: req.ip,
              userAgent: req.headers['user-agent'],
            },
          },
        });
      });

      res.clearCookie('session', getSessionCookieOptions());
    }

    res.status(200).json({ message: 'ログアウトしました' });
  } catch (error) {
    await logError({
      type: 'auth_logout_error',
      error,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
    logger.error('Logout error:', error);
    res.status(401).json({ error: 'ログアウトに失敗しました' });
  }
};

/**
 * 現在のユーザー情報を取得
 * - ユーザーの基本情報
 * - プロフィール情報
 * - プラン情報
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const sessionCookie = req.cookies.session;
    logger.info('Get current user request', { 
      hasCookie: !!sessionCookie,
      cookies: req.cookies,
      headers: req.headers
    });

    if (!sessionCookie) {
      return res.status(401).json({ error: '認証が必要です' });
    }

    const decodedClaim = await getAuth().verifySessionCookie(sessionCookie, true);
    const firebaseUser = await getAuth().getUser(decodedClaim.firebaseUid);
    logger.info('Firebase user found', { firebaserUid : firebaseUser.uid });

    // DBからユーザー情報を取得
    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUser.uid },
      include: {
        profile: true,
        subscription: true
      }
    });

    if (!dbUser) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    res.json({
      user: {
        id: dbUser.id,
        firebaseUid: dbUser.firebaseUid,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        planType: dbUser.planType,
        isVerified: dbUser.isVerified,
        isAdmin: dbUser.isAdmin,
        profile: dbUser.profile,
        subscription: dbUser.subscription
      }
    });
  } catch (error) {
    await logError({
      type: 'auth_get_current_user_error',
      error,
      metadata: {
        sessionCookie: !!req.cookies.session,
        headers: req.headers,
      },
    });
    logger.error('Get current user error:', error);
    res.status(401).json({ error: '認証が必要です' });
  }
};

// isFirstLoginを更新するエンドポイントを追加
export const updateFirstLoginStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { firebaseUid: req.user!.firebaseUid },
        data: {
          isFirstLogin: false,
          updatedAt: new Date()
        },
        select: {
          id: true,
          firebaseUid: true,
          isFirstLogin: true
        }
      });

      await tx.activityLog.create({
        data: {
          userId: user.id,
          actionType: 'auth',
          targetType: 'user',
          details: {
            action: 'update_first_login_status',
          },
        },
      });

      return user;
    });

    // キャッシュをクリア
    clearUserCache(req.user.firebaseUid as string);

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    await logError({
      userId: req.user?.firebaseUid,
      type: 'auth_update_first_login_status_error',
      error,
    });
    logger.error('Update first login status error:', error);
    res.status(500).json({ message: 'ステータスの更新中にエラーが発生しました' });
  }
};

/**
 * アカウント削除機能
 * - ユーザーの認証確認
 * - 関連データの削除（トランザクション）
 * - Firebaseアカウントの削除
 * - セッションの削除
 */
export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    logger.info('Account deletion requested', { userId: req.user.firebaseUid });

    // データベースからユーザー情報を取得
    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: req.user.firebaseUid },
      select: {
        id: true,
        firebaseUid: true
      }
    });

    if (!dbUser?.firebaseUid) {
      logger.error('Firebase UID not found for user', { userId: req.user.firebaseUid });
      return res.status(404).json({ 
        success: false,
        message: 'ユーザー情報が見つかりません' 
      });
    }

    // トランザクションで関連データを削除
    await prisma.$transaction(async (tx) => {
      // 関連データの削除（カスケード順序を考慮）
      await tx.subscription.deleteMany({
        where: { userId: dbUser!.id }
      });

      await tx.bookmark.deleteMany({
        where: { userId: dbUser!.id }
      });

      await tx.message.deleteMany({
        where: {
          OR: [
            { senderId: dbUser!.id },
            { receiverId: dbUser!.id }
          ]
        }
      });

      await tx.notification.deleteMany({
        where: { userId: dbUser!.id }
      });

      await tx.activityLog.create({
        data: {
          userId: dbUser!.id,
          actionType: 'auth',
          targetType: 'user',
          details: {
            action: 'delete_account',
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          },
        },
      });

      await tx.activityLog.deleteMany({
        where: { userId: dbUser!.id }
      });

      // プロフィールの削除
      await tx.profile.delete({
        where: { userId: dbUser!.id }
      });

      // 最後にユーザーを削除
      await tx.user.delete({
        where: { id: dbUser!.id }
      });
    });

    logger.info('Database records deleted successfully', { userId: req.user.firebaseUid });

    try {
      // Firebaseのユーザーを削除
      await getAuth().deleteUser(dbUser.firebaseUid);
      logger.info('Firebase user deleted successfully', { firebaseUid: dbUser.firebaseUid });
    } catch (firebaseError) {
      await logError({
        userId: req.user.firebaseUid,
        type: 'auth_firebase_delete_error',
        error: firebaseError,
        metadata: {
          firebaseUid: dbUser.firebaseUid,
        },
      });
      logger.error('Firebase user deletion failed', { 
        firebaseUid: dbUser.firebaseUid,
        error: firebaseError 
      });
    }

    // セッションCookieの削除
    res.clearCookie('session', getSessionCookieOptions());

    res.status(200).json({ 
      success: true,
      message: 'アカウントを完全に削除しました' 
    });

  } catch (error) {
    await logError({
      userId: req.user?.firebaseUid,
      type: 'auth_delete_account_error',
      error,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
    logger.error('Account deletion error:', error);
    res.status(500).json({ 
      success: false,
      message: 'アカウントの削除中にエラーが発生しました' 
    });
  }
}; 