import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithoutEmailInputSchema } from './EmailABTestResultUpdateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedUpdateWithoutEmailInputSchema } from './EmailABTestResultUncheckedUpdateWithoutEmailInputSchema';
import { EmailABTestResultCreateWithoutEmailInputSchema } from './EmailABTestResultCreateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedCreateWithoutEmailInputSchema } from './EmailABTestResultUncheckedCreateWithoutEmailInputSchema';

export const EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultUpsertWithWhereUniqueWithoutEmailInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailABTestResultUpdateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedUpdateWithoutEmailInputSchema) ]),
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema) ]),
}).strict();

export default EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema;
