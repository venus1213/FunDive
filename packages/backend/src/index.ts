import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { createServer } from 'http';
import { swaggerSpec } from './config/swagger.config';
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './middlewares/error.middleware';
import { authLimiter } from './middlewares/rate-limit.middleware';
import { configureSecurityMiddleware } from './config/security.config';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionSyncService } from './services/subscription-sync.service';
import { verifyToken } from './utils/auth.utils';
import { logger } from './utils/logger';
import { getAuth } from 'firebase-admin/auth';
import { findUserByFirebaseUid } from './lib/prisma';
import { initAdmin } from './lib/firebase-admin';
import { notificationCleanupJob } from './jobs/notification-cleanup.job';
import { directMessageCleanupJob } from './jobs/direct-message-cleanup.job';
import { projectMessageCleanupJob } from './jobs/project-message-cleanup.job';

// ルートのインポート
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import projectMessageRoutes from './routes/project-message.routes';
import directMessageRoutes from './routes/direct-message.routes';
import notificationRoutes from './routes/notification.routes';
import profileRoutes from './routes/profile.routes';
import adminRoutes from './routes/admin.routes';
import subscriptionRoutes from './routes/subscription.routes';
import statsRoutes from './routes/stats.routes';
import invitationRoutes from './routes/invitation.routes';
import adminEmailRoutes from './routes/admin-email.routes';
import adminDashboardRoutes from './routes/admin-dashboard.routes';
import publicStatsRoutes from './routes/public-stats.routes';
import contactRoutes from './routes/contact.routes';
import userRoutes from './routes/user.routes';
import articleRoutes from './routes/article.routes';
import s3Routes from './routes/s3.routes';

// 環境変数の読み込みとバリデーション
dotenv.config();

const requiredEnvVars = [
  'FRONTEND_URL',
  'STRIPE_SECRET_KEY',
  'DATABASE_URL',
  'SUBSCRIPTION_SYNC_INTERVAL'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`環境変数${envVar}が設定されていません`);
  }
}

const app = express();
const port = process.env.PORT || 8000;

// サーバーの作成（HTTPのみ）
const server = createServer(app);

// 静的ファイルの提供設定
app.use(express.static('public'));
app.use(express.static('src/public'));

// セキュリティ設定
configureSecurityMiddleware(app);

// Cross-Origin-Opener-Policy設定
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.removeHeader('Cross-Origin-Opener-Policy');
  } else {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  }
  next();
});

// Webhookエンドポイントの設定
const rawBodyParser = express.raw({ type: 'application/json' });
const subscriptionController = new SubscriptionController();

// CORSの設定
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : ['https://localhost:3000', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'stripe-signature', 'Cookie'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400,
};

// パブリックAPIのCORS設定（すべてのオリジンを許可）
const publicApiCorsOptions = {
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 86400,
};

app.use(cors(corsOptions));

// パブリックAPIのルートに対して特別なCORS設定を適用
app.use('/public-stats', cors(publicApiCorsOptions));
// 問い合わせルートもパブリックAPIとして設定
app.use('/contact', cors(publicApiCorsOptions));

// Webhookルートの設定（JSONパーサーの前に配置）
app.post('/subscriptions/webhook', rawBodyParser, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info('Webhook request received:', {
      path: req.path,
      method: req.method,
      contentType: req.headers['content-type'],
      signature: req.headers['stripe-signature'],
    });
  }
  next();
}, subscriptionController.handleWebhook.bind(subscriptionController));

// 通常のリクエスト用のミドルウェア
app.use((req, res, next) => {
  if (req.path === '/subscriptions/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieParser());

// Swagger UI（開発環境のみ）
if (process.env.NODE_ENV === 'development') {
  app.get('/api-docs/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// レート制限の適用
app.use('/auth/register', authLimiter);
app.use('/auth/login', authLimiter);

// ルートの設定
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/bookmarks', bookmarkRoutes);
app.use('/project-messages', projectMessageRoutes);
app.use('/direct-messages', directMessageRoutes);
app.use('/notifications', notificationRoutes);
app.use('/profiles', profileRoutes);
app.use('/admin', adminRoutes);
app.use('/admin-email', adminEmailRoutes);
app.use('/admin-dashboard', adminDashboardRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/stats', statsRoutes);
app.use('/invitations', invitationRoutes);
app.use('/public-stats', publicStatsRoutes);
app.use('/contact', contactRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/s3', s3Routes);

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// エラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        type: err.type,
        message: err.message
      }
    });
  }
  return res.status(500).json({
    error: {
      type: 'INTERNAL_SERVER_ERROR',
      message: '予期せぬエラーが発生しました'
    }
  });
});

app.use(errorHandler);

// サブスクリプション同期サービスのインスタンス
let subscriptionSyncService: SubscriptionSyncService | null = null;

// グレースフルシャットダウンの実装
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  if (subscriptionSyncService) {
    logger.info('Stopping subscription sync service...');
    subscriptionSyncService.stop();
    subscriptionSyncService = null;
  }

  // Socket.IOの切断
  io.close(() => {
    logger.info('Socket.IO server closed');
  });

  // HTTPサーバーの終了
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

// Socket.IOの設定
export const io = new Server(server, {
  cors: corsOptions,
  path: '/socket.io',
});

// Socket.IO認証ミドルウェア
io.use(async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;
    const tokenType = socket.handshake.auth.type;
    
    if (!token) {
      logger.warn('Socket connection attempt without token');
      return next(new Error('認証が必要です'));
    }

    try {
      let decoded;
      if (tokenType === 'firebase') {
        decoded = await getAuth().verifyIdToken(token);
        if (!decoded) {
          logger.warn('Invalid Firebase token in socket connection');
          return next(new Error('無効なトークンです'));
        }

        const user = await findUserByFirebaseUid(decoded.uid);
        if (!user) {
          logger.warn('User not found in database');
          return next(new Error('ユーザーが見つかりません'));
        }

        socket.data.user = {
          userId: user.id,
          email: user.email,
          role: user.role,
          firebaseUid: decoded.uid
        };
      } else {
        decoded = verifyToken(token);
        if (!decoded) {
          logger.warn('Invalid JWT token in socket connection');
          return next(new Error('無効なトークンです'));
        }
        socket.data.user = decoded;
      }

      next();
    } catch (verifyError) {
      logger.error('Token verification error:', {
        error: verifyError instanceof Error ? verifyError.message : 'Unknown error',
        socketId: socket.id
      });
      return next(new Error('トークンの検証に失敗しました'));
    }
  } catch (error) {
    logger.error('Socket authentication error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      socketId: socket.id,
      userId: socket.data?.user?.userId
    });
    next(new Error('認証エラーが発生しました'));
  }
});

// Socket.IOイベントハンドラー
io.on('connection', (socket: Socket) => {
  socket.on('join-project', (projectId: string) => {
    socket.join(`project:${projectId}`);
  });

  socket.on('leave-project', (projectId: string) => {
    socket.leave(`project:${projectId}`);
  });

  // ダイレクトメッセージ用のイベントハンドラー
  socket.on('join-direct-chat', async (data: { roomId: string; userId: string; otherUserId: string }) => {
    try {
      socket.join(data.roomId);
      logger.info('User joined direct chat room:', {
        socketId: socket.id,
        userId: data.userId,
        otherUserId: data.otherUserId,
        roomId: data.roomId
      });
      
      socket.emit('join-direct-chat-success', {
        roomId: data.roomId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error joining direct chat:', error);
    }
  });

  socket.on('leave-direct-chat', (data: { roomId: string; userId: string; otherUserId: string }) => {
    socket.leave(data.roomId);
    logger.info('User left direct chat room:', {
      socketId: socket.id,
      userId: data.userId,
      otherUserId: data.otherUserId,
      roomId: data.roomId
    });
  });

  socket.on('send-direct-message', async (data: {
    roomId: string;
    message: {
      id: string;
      content: string;
      senderId: string;
      receiverId: string;
      createdAt: string;
    }
  }) => {
    try {
      logger.info('Received direct message:', {
        socketId: socket.id,
        roomId: data.roomId,
        messageId: data.message.id
      });

      // メッセージをルームの全メンバーに送信
      io.to(data.roomId).emit('new-direct-message', {
        id: data.message.id,
        content: data.message.content,
        createdAt: data.message.createdAt,
        senderId: data.message.senderId,
        receiverId: data.message.receiverId
      });

      // 送信成功を送信者に通知
      socket.emit('message-sent', {
        messageId: data.message.id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error sending direct message:', error);
      socket.emit('message-error', {
        error: 'メッセージの送信に失敗しました',
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('message-read', async (data: { messageId: string; roomId: string; userId: string }) => {
    try {
      // メッセージの既読状態をルームの全メンバーに通知
      io.to(data.roomId).emit('message-read', {
        messageId: data.messageId,
        userId: data.userId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error marking message as read:', error);
    }
  });

  socket.on('disconnect', () => {
    logger.info('User disconnected:', {
      socketId: socket.id,
      userId: socket.data?.user?.userId
    });
  });
});

// アプリケーションの起動
const startApp = async () => {
  try {
    // Firebase Admin SDKの初期化
    initAdmin();
    
    // Firebase Admin SDKの初期化確認
    try {
      const auth = getAuth();
      await auth.listUsers(1);
      logger.info('Firebase Admin SDK is properly initialized');
    } catch (error) {
      logger.error('Firebase Admin SDK initialization check failed:', error);
      throw error;
    }

    // サブスクリプション同期サービスの開始
    subscriptionSyncService = new SubscriptionSyncService();
    subscriptionSyncService.start();

    // サーバーの起動
    server.listen(port, () => {
      logger.info(`Server started on port ${port} in ${process.env.NODE_ENV} mode`);
    });

    // シグナルハンドラーの設定
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // 未処理のエラーハンドリング
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection', { promise, reason });
      gracefulShutdown('unhandledRejection');
    });

    // クリーンアップジョブを開始
    notificationCleanupJob.start();
    logger.info('Notification cleanup job scheduled');
    directMessageCleanupJob.start();
    logger.info('Direct message cleanup job scheduled');
    projectMessageCleanupJob.start();
    logger.info('Project message cleanup job scheduled');

  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
};

// リクエストロギング
app.use((req, res, next) => {
  logger.info('Incoming request:', {
    method: req.method,
    path: req.path,
    origin: req.headers.origin,
    headers: req.headers,
    cookies: req.cookies
  });
  next();
});

// 代わりに process.cwd() を使用
const rootDir = process.cwd();

startApp();

export default app; 