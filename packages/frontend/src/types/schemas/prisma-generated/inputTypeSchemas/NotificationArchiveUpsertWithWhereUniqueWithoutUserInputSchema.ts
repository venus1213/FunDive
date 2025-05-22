import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveWhereUniqueInputSchema } from './NotificationArchiveWhereUniqueInputSchema';
import { NotificationArchiveUpdateWithoutUserInputSchema } from './NotificationArchiveUpdateWithoutUserInputSchema';
import { NotificationArchiveUncheckedUpdateWithoutUserInputSchema } from './NotificationArchiveUncheckedUpdateWithoutUserInputSchema';
import { NotificationArchiveCreateWithoutUserInputSchema } from './NotificationArchiveCreateWithoutUserInputSchema';
import { NotificationArchiveUncheckedCreateWithoutUserInputSchema } from './NotificationArchiveUncheckedCreateWithoutUserInputSchema';

export const NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationArchiveWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationArchiveUpdateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default NotificationArchiveUpsertWithWhereUniqueWithoutUserInputSchema;
