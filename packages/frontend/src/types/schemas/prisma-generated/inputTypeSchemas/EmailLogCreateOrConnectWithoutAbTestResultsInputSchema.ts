import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogCreateWithoutAbTestResultsInputSchema } from './EmailLogCreateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedCreateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedCreateWithoutAbTestResultsInputSchema';

export const EmailLogCreateOrConnectWithoutAbTestResultsInputSchema: z.ZodType<Prisma.EmailLogCreateOrConnectWithoutAbTestResultsInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutAbTestResultsInputSchema) ]),
}).strict();

export default EmailLogCreateOrConnectWithoutAbTestResultsInputSchema;
