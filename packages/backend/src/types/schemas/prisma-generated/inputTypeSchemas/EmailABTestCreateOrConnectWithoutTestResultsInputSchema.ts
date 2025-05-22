import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestCreateWithoutTestResultsInputSchema } from './EmailABTestCreateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedCreateWithoutTestResultsInputSchema } from './EmailABTestUncheckedCreateWithoutTestResultsInputSchema';

export const EmailABTestCreateOrConnectWithoutTestResultsInputSchema: z.ZodType<Prisma.EmailABTestCreateOrConnectWithoutTestResultsInput> = z.object({
  where: z.lazy(() => EmailABTestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTestResultsInputSchema) ]),
}).strict();

export default EmailABTestCreateOrConnectWithoutTestResultsInputSchema;
