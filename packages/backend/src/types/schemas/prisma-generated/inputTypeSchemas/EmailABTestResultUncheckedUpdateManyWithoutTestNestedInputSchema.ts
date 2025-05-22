import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateWithoutTestInputSchema } from './EmailABTestResultCreateWithoutTestInputSchema';
import { EmailABTestResultUncheckedCreateWithoutTestInputSchema } from './EmailABTestResultUncheckedCreateWithoutTestInputSchema';
import { EmailABTestResultCreateOrConnectWithoutTestInputSchema } from './EmailABTestResultCreateOrConnectWithoutTestInputSchema';
import { EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema } from './EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema';
import { EmailABTestResultCreateManyTestInputEnvelopeSchema } from './EmailABTestResultCreateManyTestInputEnvelopeSchema';
import { EmailABTestResultWhereUniqueInputSchema } from './EmailABTestResultWhereUniqueInputSchema';
import { EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema } from './EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema';
import { EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema } from './EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema';
import { EmailABTestResultScalarWhereInputSchema } from './EmailABTestResultScalarWhereInputSchema';

export const EmailABTestResultUncheckedUpdateManyWithoutTestNestedInputSchema: z.ZodType<Prisma.EmailABTestResultUncheckedUpdateManyWithoutTestNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultCreateWithoutTestInputSchema).array(),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema),z.lazy(() => EmailABTestResultUncheckedCreateWithoutTestInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestResultCreateOrConnectWithoutTestInputSchema),z.lazy(() => EmailABTestResultCreateOrConnectWithoutTestInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema),z.lazy(() => EmailABTestResultUpsertWithWhereUniqueWithoutTestInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestResultCreateManyTestInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailABTestResultWhereUniqueInputSchema),z.lazy(() => EmailABTestResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema),z.lazy(() => EmailABTestResultUpdateWithWhereUniqueWithoutTestInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema),z.lazy(() => EmailABTestResultUpdateManyWithWhereWithoutTestInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailABTestResultScalarWhereInputSchema),z.lazy(() => EmailABTestResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestResultUncheckedUpdateManyWithoutTestNestedInputSchema;
