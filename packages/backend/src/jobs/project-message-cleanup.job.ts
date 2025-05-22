import { CronJob } from 'cron';
import { ProjectMessageCleanupService } from '../services/project-message-cleanup.service.js';
import { logger } from '../utils/logger.js';

// 毎週月曜日の深夜2時に実行
export const projectMessageCleanupJob = new CronJob('0 2 * * 1', async () => {
  logger.info('Starting project message cleanup job...');
  try {
    await ProjectMessageCleanupService.cleanup();
    logger.info('Project message cleanup job completed successfully');
  } catch (error) {
    logger.error('Project message cleanup job failed:', error);
  }
}); 