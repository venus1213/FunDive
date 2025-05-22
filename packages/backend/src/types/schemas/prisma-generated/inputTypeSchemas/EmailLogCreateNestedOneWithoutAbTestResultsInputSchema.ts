import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutAbTestResultsInputSchema } from './EmailLogCreateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedCreateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedCreateWithoutAbTestResultsInputSchema';
import { EmailLogCreateOrConnectWithoutAbTestResultsInputSchema } from './EmailLogCreateOrConnectWithoutAbTestResultsInputSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';

export const EmailLogCreateNestedOneWithoutAbTestResultsInputSchema: z.ZodType<Prisma.EmailLogCreateNestedOneWithoutAbTestResultsInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutAbTestResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailLogCreateOrConnectWithoutAbTestResultsInputSchema).optional(),
  connect: z.lazy(() => EmailLogWhereUniqueInputSchema).optional()
}).strict();

export default EmailLogCreateNestedOneWithoutAbTestResultsInputSchema;
