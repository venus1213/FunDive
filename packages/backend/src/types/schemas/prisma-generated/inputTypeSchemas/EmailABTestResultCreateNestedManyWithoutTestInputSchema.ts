import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateWithoutTestInputSchema } from './EmailABTestResultCreateWithoutTestInputSchema';
import { EmailABTestResultUncheckedCreateWithoutTestInputSchema } from './EmailABTestResultUncheckedCreateWithoutTestInputSchema';
import { EmailABTestResultCreateOrConnectWithoutTestInputSchema } from './EmailABTestResultCreateOrConnectWithoutTestInputSchema';
import { EmailABTestResultCreateManyTestInputEnvelopeSchema } from './EmailABTestResultCreateManyTestInputEnvelopeSchema';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';

export const EmailABTestResultCreateNestedManyWithoutTestInputSchema: z.ZodType<Prisma.EmailABTestResultCreateNestedManyWithoutTestInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema).array(),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestResultCreateOrConnectWithoutTestInputSchema),z.lazy(() => EmailABTestResultCreateOrConnectWithoutTestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestResultCreateManyTestInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestResultCreateNestedManyWithoutTestInputSchema;
