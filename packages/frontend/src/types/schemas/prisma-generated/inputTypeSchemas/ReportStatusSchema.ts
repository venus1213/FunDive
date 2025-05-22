import { z } from 'zod';

export const ReportStatusSchema = z.enum(['pending','investigating','resolved','rejected']);

export type ReportStatusType = `${z.infer<typeof ReportStatusSchema>}`

export default ReportStatusSchema;
