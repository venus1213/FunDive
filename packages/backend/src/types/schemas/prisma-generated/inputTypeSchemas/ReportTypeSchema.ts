import { z } from 'zod';

export const ReportTypeSchema = z.enum(['user','project','message']);

export type ReportTypeType = `${z.infer<typeof ReportTypeSchema>}`

export default ReportTypeSchema;
