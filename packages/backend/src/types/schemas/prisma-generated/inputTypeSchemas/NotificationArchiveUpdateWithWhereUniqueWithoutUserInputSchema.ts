import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveWhereUniqueInputSchema } from './NotificationArchiveWhereUniqueInputSchema';
import { NotificationArchiveUpdateWithoutUserInputSchema } from './NotificationArchiveUpdateWithoutUserInputSchema';
import { NotificationArchiveUncheckedUpdateWithoutUserInputSchema } from './NotificationArchiveUncheckedUpdateWithoutUserInputSchema';

export const NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationArchiveWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationArchiveUpdateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default NotificationArchiveUpdateWithWhereUniqueWithoutUserInputSchema;
