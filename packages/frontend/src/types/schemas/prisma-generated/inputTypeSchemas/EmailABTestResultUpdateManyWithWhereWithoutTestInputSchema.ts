import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultScalarWhereInputSchema } from './EmailABTestResultScalarWhereInputSchema';
import { EmailABTestResultUpdateManyMutationInputSchema } from './EmailABTestResultUpdateManyMutationInputSchema';
import { EmailABTestResultUncheckedUpdateManyWithoutTestInputSchema } from './EmailABTestResultUncheckedUpdateManyWithoutTestInputSchema';

export const EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateManyWithWhereWithoutTestInput> = z.object({
  where: z.lazy(() => EmailABTestResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailABTestResultUpdateManyMutationInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateManyWithoutTestInputSchema) ]),
}).strict();

export default EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema;
