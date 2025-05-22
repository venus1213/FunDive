import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateWithoutTestResultsInputSchema } from './EmailABTestCreateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedCreateWithoutTestResultsInputSchema } from './EmailABTestUncheckedCreateWithoutTestResultsInputSchema';
import { EmailABTestCreateOrConnectWithoutTestResultsInputSchema } from './EmailABTestCreateOrConnectWithoutTestResultsInputSchema';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';

export const EmailABTestCreateNestedOneWithoutTestResultsInputSchema: z.ZodType<Prisma.EmailABTestCreateNestedOneWithoutTestResultsInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTestResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailABTestCreateOrConnectWithoutTestResultsInputSchema).optional(),
  connect: z.lazy(() => EmailABTestWhereUniqueInputSchema).optional()
}).strict();

export default EmailABTestCreateNestedOneWithoutTestResultsInputSchema;
