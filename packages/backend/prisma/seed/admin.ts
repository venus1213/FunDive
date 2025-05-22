import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

dotenv.config();

const prisma = new PrismaClient();

// Firebase Adminの初期化関数
function initAdmin() {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Required Firebase Admin environment variables are not set');
    }

    const serviceAccount = {
      projectId,
      clientEmail,
      privateKey,
    };

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

// カスタムロガー
const logger = {
  info: (...args: unknown[]) => console.log('[INFO]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};

async function createInitialAdmin() {
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    logger.error('環境変数 INITIAL_ADMIN_EMAIL と INITIAL_ADMIN_PASSWORD が必要です');
    process.exit(1);
  }

  try {
    // Firebase Adminの初期化
    initAdmin();
    const auth = getAuth();

    // 既存の管理者をチェック（データベース）
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    if (existingAdmin) {
      logger.info('管理者が既に存在します', {
        email: existingAdmin.email,
        id: existingAdmin.id
      });
      return;
    }

    // 指定されたメールアドレスのユーザーをチェック（データベース）
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      logger.info('指定されたメールアドレスのユーザーが既に存在します。管理者に昇格させます。', {
        email: adminEmail,
        id: existingUser.id,
        currentRole: existingUser.role
      });

      // Firebaseユーザーを取得
      const firebaseUser = await auth.getUserByEmail(adminEmail);
      
      // カスタムクレームを設定
      await auth.setCustomUserClaims(firebaseUser.uid, {
        role: 'admin'
      });
      logger.info('Firebaseの管理者権限を設定しました', {
        uid: firebaseUser.uid
      });

      // データベースのユーザーを更新
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          role: 'admin',
          isAdmin: true,
          isVerified: true,
        },
      });

      // アクティビティログの記録
      await prisma.activityLog.create({
        data: {
          userId: updatedUser.id,
          actionType: 'admin_action',
          targetType: 'user',
          targetId: updatedUser.id,
          details: {
            action: 'user_promoted_to_admin',
            previousRole: existingUser.role,
          },
        },
      });

      logger.info('ユーザーを管理者に昇格させました:', {
        email: updatedUser.email,
        id: updatedUser.id
      });
      return;
    }

    // Firebaseでユーザーを作成または取得
    let firebaseUser;
    try {
      // 既存のFirebaseユーザーを確認
      try {
        firebaseUser = await auth.getUserByEmail(adminEmail);
        logger.info('既存のFirebaseユーザーを見つけました', {
          email: adminEmail,
          uid: firebaseUser.uid
        });
      } catch (userNotFoundError) {
        // ユーザーが存在しない場合は新規作成
        firebaseUser = await auth.createUser({
          email: adminEmail,
          password: adminPassword,
          emailVerified: true,
          displayName: 'System Administrator',
        });
        logger.info('新しいFirebaseユーザーを作成しました', {
          email: adminEmail,
          uid: firebaseUser.uid
        });
      }

      // カスタムクレームを設定
      await auth.setCustomUserClaims(firebaseUser.uid, {
        role: 'admin'
      });
      logger.info('管理者権限を設定しました', {
        uid: firebaseUser.uid
      });
    } catch (error) {
      logger.error('Firebaseユーザーの作成/更新に失敗しました:', error);
      throw error;
    }

    // データベースに管理者ユーザーを作成
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'System Administrator',
        role: 'admin',
        isAdmin: true,
        isVerified: true,
        firebaseUid: firebaseUser.uid,
        profile: {
          create: {
            name: 'System Administrator',
            displayName: 'System Administrator',
            is_public: false,
            visible_fields: [],
          }
        }
      },
      include: {
        profile: true
      }
    });

    // アクティビティログの記録
    await prisma.activityLog.create({
      data: {
        userId: admin.id,
        actionType: 'admin_action',
        targetType: 'user',
        targetId: admin.id,
        details: {
          action: 'initial_admin_creation',
        },
      },
    });

    logger.info('初期管理者が正常に作成されました:', {
      email: admin.email,
      firebaseUid: admin.firebaseUid
    });
  } catch (error) {
    logger.error('初期管理者の作成に失敗しました:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createInitialAdmin(); 