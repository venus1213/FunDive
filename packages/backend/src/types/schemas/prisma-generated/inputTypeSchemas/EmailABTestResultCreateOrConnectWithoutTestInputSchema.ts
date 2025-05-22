import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultCreateWithoutTestInputSchema } from './EmailABTestResultCreateWithoutTestInputSchema';
import { EmailABTestResultUncheckedCreateWithoutTestInputSchema } from './EmailABTestResultUncheckedCreateWithoutTestInputSchema';

export const EmailABTestResultCreateOrConnectWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultCreateOrConnectWithoutTestInput> = z.object({
  where: z.lazy(() => EmailABTestResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema) ]),
}).strict();

export default EmailABTestResultCreateOrConnectWithoutTestInputSchema;
