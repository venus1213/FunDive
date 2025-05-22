import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateNestedOneWithoutTestResultsInputSchema } from './EmailABTestCreateNestedOneWithoutTestResultsInputSchema';
import { EmailLogCreateNestedOneWithoutAbTestResultsInputSchema } from './EmailLogCreateNestedOneWithoutAbTestResultsInputSchema';

export const EmailABTestResultCreateInputSchema: z.ZodType<Prisma.EmailABTestResultCreateInput> = z.object({
  id: z.string().uuid().optional(),
  variant: z.string(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  test: z.lazy(() => EmailABTestCreateNestedOneWithoutTestResultsInputSchema),
  email: z.lazy(() => EmailLogCreateNestedOneWithoutAbTestResultsInputSchema)
}).strict();

export default EmailABTestResultCreateInputSchema;
