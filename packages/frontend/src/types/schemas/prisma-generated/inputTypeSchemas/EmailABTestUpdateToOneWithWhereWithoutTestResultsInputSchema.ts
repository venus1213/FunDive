import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';
import { EmailABTestUpdateWithoutTestResultsInputSchema } from './EmailABTestUpdateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedUpdateWithoutTestResultsInputSchema } from './EmailABTestUncheckedUpdateWithoutTestResultsInputSchema';

export const EmailABTestUpdateToOneWithWhereWithoutTestResultsInputSchema: z.ZodType<Prisma.EmailABTestUpdateToOneWithWhereWithoutTestResultsInput> = z.object({
  where: z.lazy(() => EmailABTestWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailABTestUpdateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedUpdateWithoutTestResultsInputSchema) ]),
}).strict();

export default EmailABTestUpdateToOneWithWhereWithoutTestResultsInputSchema;
