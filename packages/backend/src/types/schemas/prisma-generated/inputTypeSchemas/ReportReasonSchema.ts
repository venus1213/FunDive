import { z } from 'zod';

export const ReportReasonSchema = z.enum(['spam','inappropriate_content','harassment','scam','other']);

export type ReportReasonType = `${z.infer<typeof ReportReasonSchema>}`

export default ReportReasonSchema;
