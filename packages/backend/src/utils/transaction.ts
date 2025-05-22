import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

export const executeTransaction = async (
  prisma: PrismaClient,
  operations: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<void>,
  errorType: string
) => {
  try {
    await prisma.$transaction(operations);
  } catch (error) {
    logger.error(`Transaction failed: ${errorType}`, error);
    throw error;
  }
}; 