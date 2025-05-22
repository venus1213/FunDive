import { z } from 'zod';

export const EmailStatusSchema = z.enum(['PENDING','SENT','FAILED','CANCELLED']);

export type EmailStatusType = `${z.infer<typeof EmailStatusSchema>}`

export default EmailStatusSchema;
