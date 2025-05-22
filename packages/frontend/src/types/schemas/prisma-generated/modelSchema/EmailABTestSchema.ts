import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { EmailABTestStatusSchema } from '../inputTypeSchemas/EmailABTestStatusSchema'

/////////////////////////////////////////
// EMAIL AB TEST SCHEMA
/////////////////////////////////////////

export const EmailABTestSchema = z.object({
  status: EmailABTestStatusSchema,
  id: z.string().uuid(),
  templateId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  variantA: JsonValueSchema,
  variantB: JsonValueSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  winningVariant: z.string().nullable(),
  metrics: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type EmailABTest = z.infer<typeof EmailABTestSchema>

export default EmailABTestSchema;
