import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';
import { EmailLogUpdateWithoutAbTestResultsInputSchema } from './EmailLogUpdateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema';

export const EmailLogUpdateToOneWithWhereWithoutAbTestResultsInputSchema: z.ZodType<Prisma.EmailLogUpdateToOneWithWhereWithoutAbTestResultsInput> = z.object({
  where: z.lazy(() => EmailLogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailLogUpdateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema) ]),
}).strict();

export default EmailLogUpdateToOneWithWhereWithoutAbTestResultsInputSchema;
