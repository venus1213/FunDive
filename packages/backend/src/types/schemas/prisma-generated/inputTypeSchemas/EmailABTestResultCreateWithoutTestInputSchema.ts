import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateNestedOneWithoutAbTestResultsInputSchema } from './EmailLogCreateNestedOneWithoutAbTestResultsInputSchema';

export const EmailABTestResultCreateWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultCreateWithoutTestInput> = z.object({
  id: z.string().optional(),
  variant: z.string(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  email: z.lazy(() => EmailLogCreateNestedOneWithoutAbTestResultsInputSchema)
}).strict();

export default EmailABTestResultCreateWithoutTestInputSchema;
