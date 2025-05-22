import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultScalarWhereInputSchema } from './EmailABTestResultScalarWhereInputSchema';
import { EmailABTestResultUpdateManyMutationInputSchema } from './EmailABTestResultUpdateManyMutationInputSchema';
import { EmailABTestResultUncheckedUpdateManyWithoutEmailInputSchema } from './EmailABTestResultUncheckedUpdateManyWithoutEmailInputSchema';

export const EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateManyWithWhereWithoutEmailInput> = z.object({
  where: z.lazy(() => EmailABTestResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailABTestResultUpdateManyMutationInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateManyWithoutEmailInputSchema) ]),
}).strict();

export default EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema;
