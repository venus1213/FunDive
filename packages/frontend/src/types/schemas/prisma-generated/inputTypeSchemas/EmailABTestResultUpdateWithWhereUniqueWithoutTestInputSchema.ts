import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithoutTestInputSchema } from './EmailABTestResultUpdateWithoutTestInputSchema';
import { EmailABTestResultUncheckedUpdateWithoutTestInputSchema } from './EmailABTestResultUncheckedUpdateWithoutTestInputSchema';

export const EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateWithWhereUniqueWithoutTestInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailABTestResultUpdateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateWithoutTestInputSchema) ]),
}).strict();

export default EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema;
