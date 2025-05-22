import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { EmailScheduleTypeSchema } from '../inputTypeSchemas/EmailScheduleTypeSchema'
import { EmailScheduleStatusSchema } from '../inputTypeSchemas/EmailScheduleStatusSchema'

/////////////////////////////////////////
// EMAIL SCHEDULE SCHEMA
/////////////////////////////////////////

export const EmailScheduleSchema = z.object({
  scheduleType: EmailScheduleTypeSchema,
  status: EmailScheduleStatusSchema,
  id: z.string(),
  templateId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  recipientIds: z.string().array(),
  cronExpression: z.string().nullable(),
  sendAt: z.coerce.date().nullable(),
  variables: JsonValueSchema.nullable(),
  lastRunAt: z.coerce.date().nullable(),
  nextRunAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type EmailSchedule = z.infer<typeof EmailScheduleSchema>

export default EmailScheduleSchema;
