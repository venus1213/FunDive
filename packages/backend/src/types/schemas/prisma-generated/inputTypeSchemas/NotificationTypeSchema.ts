import { z } from 'zod';

export const NotificationTypeSchema = z.enum(['message_received','project_liked','project_bookmarked','project_commented','project_status_changed','user_mentioned','report_status_changed','subscription_expiring','subscription_payment_failed','system_announcement']);

export type NotificationTypeType = `${z.infer<typeof NotificationTypeSchema>}`

export default NotificationTypeSchema;
