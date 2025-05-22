import { CronJob } from 'cron';
import { NotificationCleanupService } from '../services/notification-cleanup.service.js';
import { logger } from '../utils/logger.js';

// 毎週日曜日の深夜3時に実行
export const notificationCleanupJob = new CronJob(
  '0 3 * * 0',
  async () => {
    try {
      logger.info('Starting weekly notification cleanup job');
      const result = await NotificationCleanupService.cleanupOldNotifications();
      logger.info('Completed weekly notification cleanup job', result);
    } catch (error) {
      logger.error('Weekly notification cleanup job failed:', error);
    }
  },
  null,
  false,
  'Asia/Tokyo'
); 