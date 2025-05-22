import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveCreateWithoutUserInputSchema } from './NotificationArchiveCreateWithoutUserInputSchema';
import { NotificationArchiveUncheckedCreateWithoutUserInputSchema } from './NotificationArchiveUncheckedCreateWithoutUserInputSchema';
import { NotificationArchiveCreateOrConnectWithoutUserInputSchema } from './NotificationArchiveCreateOrConnectWithoutUserInputSchema';
import { NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema } from './NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema';
import { NotificationArchiveCreateManyUserInputEnvelopeSchema } from './NotificationArchiveCreateManyUserInputEnvelopeSchema';
import { NotificationArchiveWhereUniqueInputSchema } from './NotificationArchiveWhereUniqueInputSchema';
import { NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema } from './NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema';
import { NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema } from './NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema';
import { NotificationArchiveScalarWhereInputSchema } from './NotificationArchiveScalarWhereInputSchema';

export const NotificationArchiveUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationArchiveUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema).array(),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationArchiveCreateOrConnectWithoutUserInputSchema),z.lazy(() => NotificationArchiveCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationArchiveCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationArchiveWhereUniqueInputSchema),z.lazy(() => NotificationArchiveWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationArchiveWhereUniqueInputSchema),z.lazy(() => NotificationArchiveWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationArchiveWhereUniqueInputSchema),z.lazy(() => NotificationArchiveWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationArchiveWhereUniqueInputSchema),z.lazy(() => NotificationArchiveWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationArchiveScalarWhereInputSchema),z.lazy(() => NotificationArchiveScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default NotificationArchiveUpdateManyWithoutUserNestedInputSchema;
