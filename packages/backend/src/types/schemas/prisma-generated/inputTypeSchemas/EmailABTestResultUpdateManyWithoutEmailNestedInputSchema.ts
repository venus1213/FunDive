import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateWithoutEmailInputSchema } from './EmailABTestResultCreateWithoutEmailInputSchema';
import { EmailABTestResultUncheckedCreateWithoutEmailInputSchema } from './EmailABTestResultUncheckedCreateWithoutEmailInputSchema';
import { EmailABTestResultCreateOrConnectWithoutEmailInputSchema } from './EmailABTestResultCreateOrConnectWithoutEmailInputSchema';
import { EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema } from './EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema';
import { EmailABTestResultCreateManyEmailInputEnvelopeSchema } from './EmailABTestResultCreateManyEmailInputEnvelopeSchema';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema } from './EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema';
import { EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema } from './EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema';
import { EmailABTestResultScalarWhereInputSchema } from './EmailABTestResultScalarWhereInputSchema';

export const EmailABTestResultUpdateManyWithoutEmailNestedInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateManyWithoutEmailNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultCreateWithoutEmailInputSchema).array(),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutEmailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestResultCreateOrConnectWithoutEmailInputSchema),z.lazy(() => EmailABTestResultCreateOrConnectWithoutEmailInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUpsertWithWhereUniqueWithoutEmailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestResultCreateManyEmailInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUpdateWithWhereUniqueWithoutEmailInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema),z.lazy(() => EmailABTestResultUpdateManyWithWhereWithoutEmailInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailABTestResultScalarWhereInputSchema),z.lazy(() => EmailABTestResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestResultUpdateManyWithoutEmailNestedInputSchema;
