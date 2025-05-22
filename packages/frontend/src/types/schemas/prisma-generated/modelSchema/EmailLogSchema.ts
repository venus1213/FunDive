import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { EmailStatusSchema } from '../inputTypeSchemas/EmailStatusSchema'

/////////////////////////////////////////
// EMAIL LOG SCHEMA
/////////////////////////////////////////

export const EmailLogSchema = z.object({
  status: EmailStatusSchema,
  id: z.string().uuid(),
  templateId: z.string(),
  recipientIds: z.string().array(),
  subject: z.string(),
  body: z.string(),
  sentAt: z.coerce.date(),
  sentBy: z.string(),
  metadata: JsonValueSchema.nullable(),
  errorDetails: z.string().nullable(),
})

export type EmailLog = z.infer<typeof EmailLogSchema>

export default EmailLogSchema;
