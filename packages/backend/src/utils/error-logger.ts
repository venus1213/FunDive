import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const logError = async (params: {
  userId?: string;
  type: string;
  error: Error | unknown;
  metadata?: Prisma.JsonValue;
}) => {
  const { userId, type, error, metadata } = params;
  
  try {
    await prisma.errorLog.create({
      data: {
        userId,
        type,
        error: error instanceof Error ? error.message : String(error),
        metadata: metadata || {},
      },
    });
  } catch (logError) {
    console.error('エラーログの記録に失敗:', logError);
  }
}; 