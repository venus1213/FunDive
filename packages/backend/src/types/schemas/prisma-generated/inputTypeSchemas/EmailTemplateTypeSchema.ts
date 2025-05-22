import { z } from 'zod';

export const EmailTemplateTypeSchema = z.enum(['NOTIFICATION','MARKETING','ANNOUNCEMENT','REMINDER','CUSTOM']);

export type EmailTemplateTypeType = `${z.infer<typeof EmailTemplateTypeSchema>}`

export default EmailTemplateTypeSchema;
