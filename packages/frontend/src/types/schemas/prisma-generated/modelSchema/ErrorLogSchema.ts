import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// ERROR LOG SCHEMA
/////////////////////////////////////////

export const ErrorLogSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().nullable(),
  type: z.string(),
  error: z.string(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ErrorLog = z.infer<typeof ErrorLogSchema>

export default ErrorLogSchema;
