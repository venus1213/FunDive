import { z } from 'zod';

export const EmailABTestStatusSchema = z.enum(['DRAFT','ACTIVE','COMPLETED','CANCELLED']);

export type EmailABTestStatusType = `${z.infer<typeof EmailABTestStatusSchema>}`

export default EmailABTestStatusSchema;
