import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithoutEmailInputSchema } from './EmailABTestResultUpdateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedUpdateWithoutEmailInputSchema } from './EmailABTestResultUncheckedUpdateWithoutEmailInputSchema';

export const EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateWithWhereUniqueWithoutEmailInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailABTestResultUpdateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateWithoutEmailInputSchema) ]),
}).strict();

export default EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema;
