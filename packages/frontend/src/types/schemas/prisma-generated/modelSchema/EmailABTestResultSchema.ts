import { z } from 'zod';

/////////////////////////////////////////
// EMAIL AB TEST RESULT SCHEMA
/////////////////////////////////////////

export const EmailABTestResultSchema = z.object({
  id: z.string().uuid(),
  testId: z.string(),
  variant: z.string(),
  emailId: z.string(),
  opened: z.boolean(),
  clicked: z.boolean(),
  createdAt: z.coerce.date(),
})

export type EmailABTestResult = z.infer<typeof EmailABTestResultSchema>

export default EmailABTestResultSchema;
