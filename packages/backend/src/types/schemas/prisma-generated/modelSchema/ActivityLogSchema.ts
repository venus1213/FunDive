import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { ActionTypeSchema } from '../inputTypeSchemas/ActionTypeSchema'
import { ActivityTargetTypeSchema } from '../inputTypeSchemas/ActivityTargetTypeSchema'

/////////////////////////////////////////
// ACTIVITY LOG SCHEMA
/////////////////////////////////////////

export const ActivityLogSchema = z.object({
  actionType: ActionTypeSchema,
  targetType: ActivityTargetTypeSchema,
  id: z.string(),
  userId: z.string().nullable(),
  targetId: z.string().nullable(),
  details: JsonValueSchema.nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type ActivityLog = z.infer<typeof ActivityLogSchema>

export default ActivityLogSchema;
