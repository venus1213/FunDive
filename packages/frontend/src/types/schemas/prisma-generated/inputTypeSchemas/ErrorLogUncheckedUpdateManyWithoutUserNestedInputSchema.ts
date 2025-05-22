import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogCreateWithoutUserInputSchema } from './ErrorLogCreateWithoutUserInputSchema';
import { ErrorLogUncheckedCreateWithoutUserInputSchema } from './ErrorLogUncheckedCreateWithoutUserInputSchema';
import { ErrorLogCreateOrConnectWithoutUserInputSchema } from './ErrorLogCreateOrConnectWithoutUserInputSchema';
import { ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema } from './ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema';
import { ErrorLogCreateManyUserInputEnvelopeSchema } from './ErrorLogCreateManyUserInputEnvelopeSchema';
import { ErrorLogWhereUniqueInputSchema } from './ErrorLogWhereUniqueInputSchema';
import { ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema } from './ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema';
import { ErrorLogUpdateManyWithWhereWithoutUserInputSchema } from './ErrorLogUpdateManyWithWhereWithoutUserInputSchema';
import { ErrorLogScalarWhereInputSchema } from './ErrorLogScalarWhereInputSchema';

export const ErrorLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ErrorLogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ErrorLogCreateWithoutUserInputSchema),z.lazy(() => ErrorLogCreateWithoutUserInputSchema).array(),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ErrorLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => ErrorLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ErrorLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ErrorLogWhereUniqueInputSchema),z.lazy(() => ErrorLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ErrorLogWhereUniqueInputSchema),z.lazy(() => ErrorLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ErrorLogWhereUniqueInputSchema),z.lazy(() => ErrorLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ErrorLogWhereUniqueInputSchema),z.lazy(() => ErrorLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ErrorLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ErrorLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ErrorLogScalarWhereInputSchema),z.lazy(() => ErrorLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ErrorLogUncheckedUpdateManyWithoutUserNestedInputSchema;
