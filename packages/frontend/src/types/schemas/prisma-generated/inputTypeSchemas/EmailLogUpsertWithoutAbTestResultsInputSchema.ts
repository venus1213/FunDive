import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogUpdateWithoutAbTestResultsInputSchema } from './EmailLogUpdateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema';
import { EmailLogCreateWithoutAbTestResultsInputSchema } from './EmailLogCreateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedCreateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedCreateWithoutAbTestResultsInputSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogUpsertWithoutAbTestResultsInputSchema: z.ZodType<Prisma.EmailLogUpsertWithoutAbTestResultsInput> = z.object({
  update: z.union([ z.lazy(() => EmailLogUpdateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutAbTestResultsInputSchema) ]),
  where: z.lazy(() => EmailLogWhereInputSchema).optional()
}).strict();

export default EmailLogUpsertWithoutAbTestResultsInputSchema;
