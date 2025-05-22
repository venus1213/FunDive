import { CronJob } from 'cron';
import { DirectMessageCleanupService } from '../services/direct-message-cleanup.service.js';

// 毎週日曜日の深夜3時に実行
export const directMessageCleanupJob = new CronJob('0 3 * * 0', async () => {
  console.log('Starting direct message cleanup job...');
  try {
    await DirectMessageCleanupService.cleanup();
    console.log('Direct message cleanup job completed successfully');
  } catch (error) {
    console.error('Direct message cleanup job failed:', error);
  }
}); 