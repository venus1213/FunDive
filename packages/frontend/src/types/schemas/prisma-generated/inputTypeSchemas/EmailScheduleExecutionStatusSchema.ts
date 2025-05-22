import { z } from 'zod';

export const EmailScheduleExecutionStatusSchema = z.enum(['SUCCESS','FAILED','SKIPPED']);

export type EmailScheduleExecutionStatusType = `${z.infer<typeof EmailScheduleExecutionStatusSchema>}`

export default EmailScheduleExecutionStatusSchema;
