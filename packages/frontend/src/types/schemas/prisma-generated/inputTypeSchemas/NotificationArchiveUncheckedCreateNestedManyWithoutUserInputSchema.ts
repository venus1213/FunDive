import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveCreateWithoutUserInputSchema } from './NotificationArchiveCreateWithoutUserInputSchema';
import { NotificationArchiveUncheckedCreateWithoutUserInputSchema } from './NotificationArchiveUncheckedCreateWithoutUserInputSchema';
import { NotificationArchiveCreateOrConnectWithoutUserInputSchema } from './NotificationArchiveCreateOrConnectWithoutUserInputSchema';
import { NotificationArchiveCreateManyUserInputEnvelopeSchema } from './NotificationArchiveCreateManyUserInputEnvelopeSchema';
import { NotificationArchiveWhereUniqueInputSchema } from './NotificationArchiveWhereUniqueInputSchema';

export const NotificationArchiveUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema).array(),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationArchiveCreateOrConnectWithoutUserInputSchema),z.lazy(() => NotificationArchiveCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationArchiveCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationArchiveWhereUniqueInputSchema),z.lazy(() => NotificationArchiveWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default NotificationArchiveUncheckedCreateNestedManyWithoutUserInputSchema;
