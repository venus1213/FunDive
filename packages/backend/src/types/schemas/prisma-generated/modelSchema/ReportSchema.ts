import { z } from 'zod';
import { ReportTypeSchema } from '../inputTypeSchemas/ReportTypeSchema'
import { ReportReasonSchema } from '../inputTypeSchemas/ReportReasonSchema'
import { ReportStatusSchema } from '../inputTypeSchemas/ReportStatusSchema'

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  targetType: ReportTypeSchema,
  reason: ReportReasonSchema,
  status: ReportStatusSchema,
  id: z.string(),
  reporterId: z.string(),
  targetId: z.string(),
  comment: z.string().nullable(),
  adminComment: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Report = z.infer<typeof ReportSchema>

export default ReportSchema;
