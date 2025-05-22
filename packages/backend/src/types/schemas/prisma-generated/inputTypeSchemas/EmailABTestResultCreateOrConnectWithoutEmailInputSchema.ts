import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultCreateWithoutEmailInputSchema } from './EmailABTestResultCreateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedCreateWithoutEmailInputSchema } from './EmailABTestResultUncheckedCreateWithoutEmailInputSchema';

export const EmailABTestResultCreateOrConnectWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultCreateOrConnectWithoutEmailInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema) ]),
}).strict();

export default EmailABTestResultCreateOrConnectWithoutEmailInputSchema;
