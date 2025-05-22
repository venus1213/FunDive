import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateWithoutEmailInputSchema } from './EmailABTestResultCreateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedCreateWithoutEmailInputSchema } from './EmailABTestResultUncheckedCreateWithoutEmailInputSchema';
import { EmailABTestResultCreateOrConnectWithoutEmailInputSchema } from './EmailABTestResultCreateOrConnectWithoutEmailInputSchema';
import { EmailABTestResultCreateManyEmailInputEnvelopeSchema } from './EmailABTestResultCreateManyEmailInputEnvelopeSchema';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';

export const EmailABTestResultCreateNestedManyWithoutEmailInputSchema: z.ZodType<Prisma.EmailABTestResultCreateNestedManyWithoutEmailInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema).array(),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestResultCreateOrConnectWithoutEmailInputSchema),z.lazy(() => EmailABTestResultCreateOrConnectWithoutEmailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestResultCreateManyEmailInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestResultCreateNestedManyWithoutEmailInputSchema;
