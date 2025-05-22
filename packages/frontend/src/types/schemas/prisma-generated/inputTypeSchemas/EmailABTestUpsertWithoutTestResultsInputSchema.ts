import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestUpdateWithoutTestResultsInputSchema } from './EmailABTestUpdateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedUpdateWithoutTestResultsInputSchema } from './EmailABTestUncheckedUpdateWithoutTestResultsInputSchema';
import { EmailABTestCreateWithoutTestResultsInputSchema } from './EmailABTestCreateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedCreateWithoutTestResultsInputSchema } from './EmailABTestUncheckedCreateWithoutTestResultsInputSchema';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';

export const EmailABTestUpsertWithoutTestResultsInputSchema: z.ZodType<Prisma.EmailABTestUpsertWithoutTestResultsInput> = z.object({
  update: z.union([ z.lazy(() => EmailABTestUpdateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedUpdateWithoutTestResultsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTestResultsInputSchema) ]),
  where: z.lazy(() => EmailABTestWhereInputSchema).optional()
}).strict();

export default EmailABTestUpsertWithoutTestResultsInputSchema;
