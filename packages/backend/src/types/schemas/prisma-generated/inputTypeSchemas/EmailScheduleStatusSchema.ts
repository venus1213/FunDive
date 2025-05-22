import { z } from 'zod';

export const EmailScheduleStatusSchema = z.enum(['ACTIVE','PAUSED','COMPLETED','CANCELLED']);

export type EmailScheduleStatusType = `${z.infer<typeof EmailScheduleStatusSchema>}`

export default EmailScheduleStatusSchema;
