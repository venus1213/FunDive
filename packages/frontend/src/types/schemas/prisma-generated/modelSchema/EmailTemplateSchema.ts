import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { EmailTemplateTypeSchema } from '../inputTypeSchemas/EmailTemplateTypeSchema'

/////////////////////////////////////////
// EMAIL TEMPLATE SCHEMA
/////////////////////////////////////////

export const EmailTemplateSchema = z.object({
  type: EmailTemplateTypeSchema,
  id: z.string().uuid(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  variables: JsonValueSchema.nullable(),
  isActive: z.boolean(),
  previewData: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
})

export type EmailTemplate = z.infer<typeof EmailTemplateSchema>

export default EmailTemplateSchema;
