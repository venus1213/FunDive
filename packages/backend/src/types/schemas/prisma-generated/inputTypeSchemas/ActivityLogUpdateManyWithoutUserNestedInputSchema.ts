import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogCreateWithoutUserInputSchema } from './ActivityLogCreateWithoutUserInputSchema';
import { ActivityLogUncheckedCreateWithoutUserInputSchema } from './ActivityLogUncheckedCreateWithoutUserInputSchema';
import { ActivityLogCreateOrConnectWithoutUserInputSchema } from './ActivityLogCreateOrConnectWithoutUserInputSchema';
import { ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema } from './ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema';
import { ActivityLogCreateManyUserInputEnvelopeSchema } from './ActivityLogCreateManyUserInputEnvelopeSchema';
import { ActivityLogWhereUniqueInputSchema } from './ActivityLogWhereUniqueInputSchema';
import { ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema } from './ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema';
import { ActivityLogUpdateManyWithWhereWithoutUserInputSchema } from './ActivityLogUpdateManyWithWhereWithoutUserInputSchema';
import { ActivityLogScalarWhereInputSchema } from './ActivityLogScalarWhereInputSchema';

export const ActivityLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ActivityLogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActivityLogCreateWithoutUserInputSchema),z.lazy(() => ActivityLogCreateWithoutUserInputSchema).array(),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActivityLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => ActivityLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActivityLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ActivityLogWhereUniqueInputSchema),z.lazy(() => ActivityLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ActivityLogWhereUniqueInputSchema),z.lazy(() => ActivityLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ActivityLogWhereUniqueInputSchema),z.lazy(() => ActivityLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ActivityLogWhereUniqueInputSchema),z.lazy(() => ActivityLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ActivityLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ActivityLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ActivityLogScalarWhereInputSchema),z.lazy(() => ActivityLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ActivityLogUpdateManyWithoutUserNestedInputSchema;
