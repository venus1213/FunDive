import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateNestedOneWithoutTestResultsInputSchema } from './EmailABTestCreateNestedOneWithoutTestResultsInputSchema';

export const EmailABTestResultCreateWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultCreateWithoutEmailInput> = z.object({
  id: z.string().uuid().optional(),
  variant: z.string(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  test: z.lazy(() => EmailABTestCreateNestedOneWithoutTestResultsInputSchema)
}).strict();

export default EmailABTestResultCreateWithoutEmailInputSchema;
