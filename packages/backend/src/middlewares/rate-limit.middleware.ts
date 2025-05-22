import rateLimit from 'express-rate-limit';
import { AppError } from './error.middleware.js';

/**
 * 認証関連のレート制限
 * 開発環境では制限を大幅に緩和（100回）
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError(429, 'RATE_LIMIT_EXCEEDED', '認証の試行回数が制限を超えました。15分後に再度お試しください。'));
  },
}); 