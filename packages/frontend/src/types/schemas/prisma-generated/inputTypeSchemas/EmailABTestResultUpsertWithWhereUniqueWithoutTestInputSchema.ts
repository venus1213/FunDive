import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithoutTestInputSchema } from './EmailABTestResultUpdateWithoutTestInputSchema';
import { EmailABTestResultUncheckedUpdateWithoutTestInputSchema } from './EmailABTestResultUncheckedUpdateWithoutTestInputSchema';
import { EmailABTestResultCreateWithoutTestInputSchema } from './EmailABTestResultCreateWithoutTestInputSchema';
import { EmailABTestResultUncheckedCreateWithoutTestInputSchema } from './EmailABTestResultUncheckedCreateWithoutTestInputSchema';

export const EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultUpsertWithWhereUniqueWithoutTestInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailABTestResultUpdateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateWithoutTestInputSchema) ]),
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema) ]),
}).strict();

export default EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema;
