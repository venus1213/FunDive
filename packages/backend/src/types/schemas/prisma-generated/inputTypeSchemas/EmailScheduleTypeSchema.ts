import { z } from 'zod';

export const EmailScheduleTypeSchema = z.enum(['ONE_TIME','RECURRING']);

export type EmailScheduleTypeType = `${z.infer<typeof EmailScheduleTypeSchema>}`

export default EmailScheduleTypeSchema;
