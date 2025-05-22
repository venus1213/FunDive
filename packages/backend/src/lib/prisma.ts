import { PrismaClient, Prisma, User, Profile, Subscription } from '@prisma/client';
import { logger } from '../utils/logger.js';
import NodeCache from 'node-cache';

// キャッシュの設定（TTL: 5分）
const userCache = new NodeCache({ stdTTL: 300 });

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'info' },
  ],
};

// For development hot reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient(prismaClientOptions);

// 開発環境でのみグローバル変数として保存
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

type UserWithRelations = User & {
  profile: Profile | null;
  subscription: Subscription | null;
};

// キャッシュ付きのユーザー取得関数
export async function findUserByFirebaseUid(firebaseUid: string): Promise<UserWithRelations | null> {
  const cacheKey = `user:firebase:${firebaseUid}`;
  const cachedUser = userCache.get<UserWithRelations>(cacheKey);
  
  if (cachedUser) {
    return cachedUser;
  }

  const user = await prisma.user.findUnique({
    where: { firebaseUid },
    include: {
      profile: true,
      subscription: true
    }
  });

  if (user) {
    userCache.set(cacheKey, user);
  }

  return user;
}

// キャッシュ付きのユーザー取得関数（メールアドレス用）
export async function findUserByEmail(email: string): Promise<UserWithRelations | null> {
  const cacheKey = `user:email:${email}`;
  const cachedUser = userCache.get<UserWithRelations>(cacheKey);
  
  if (cachedUser) {
    return cachedUser;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      subscription: true
    }
  });

  if (user) {
    userCache.set(cacheKey, user);
  }

  return user;
}

// キャッシュのクリア関数
export function clearUserCache(userId: string) {
  const user = userCache.get<User>(`user:firebase:${userId}`);
  if (user) {
    userCache.del(`user:firebase:${userId}`);
    userCache.del(`user:email:${user.email}`);
  }
}

type ExtendedPrismaClient = PrismaClient & {
  $on(event: 'query', callback: (event: Prisma.QueryEvent) => void): void;
  $on(event: 'error' | 'warn', callback: (event: Prisma.LogEvent) => void): void;
}

const extendedPrisma = prisma as ExtendedPrismaClient;

// クエリログの設定（開発環境のみ）
if (process.env.NODE_ENV === 'development') {
  const queryStats = new Map<string, { count: number; totalDuration: number }>();

  extendedPrisma.$on('query', (e: Prisma.QueryEvent) => {
    // クエリの正規化（パラメータを除去）
    const normalizedQuery = e.query.replace(/\$\d+/g, '?');
    
    // 統計情報の更新
    const stats = queryStats.get(normalizedQuery) || { count: 0, totalDuration: 0 };
    stats.count++;
    stats.totalDuration += e.duration;
    queryStats.set(normalizedQuery, stats);

    // 重複クエリの警告（5回以上実行された場合のみ）
    if (stats.count > 5) {
      logger.warn('Potential N+1 Query detected:', {
        query: normalizedQuery,  // クエリの先頭100文字のみ表示
        executionCount: stats.count,
        totalDuration: `${stats.totalDuration}ms`,
        averageDuration: `${(stats.totalDuration / stats.count).toFixed(2)}ms`
      });
    }
  });
}

// エラーログの設定
extendedPrisma.$on('error', (e: Prisma.LogEvent) => {
  logger.error('Prisma Error:', e);
});

// 警告ログの設定
extendedPrisma.$on('warn', (e: Prisma.LogEvent) => {
  logger.warn('Prisma Warning:', e);
}); 