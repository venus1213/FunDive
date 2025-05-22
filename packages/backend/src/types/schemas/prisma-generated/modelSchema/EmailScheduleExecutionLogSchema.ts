import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from '../inputTypeSchemas/EmailScheduleExecutionStatusSchema'

/////////////////////////////////////////
// EMAIL SCHEDULE EXECUTION LOG SCHEMA
/////////////////////////////////////////

export const EmailScheduleExecutionLogSchema = z.object({
  status: EmailScheduleExecutionStatusSchema,
  id: z.string(),
  scheduleId: z.string(),
  emailLogId: z.string().nullable(),
  error: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type EmailScheduleExecutionLog = z.infer<typeof EmailScheduleExecutionLogSchema>

export default EmailScheduleExecutionLogSchema;
