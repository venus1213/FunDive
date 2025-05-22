import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveWhereUniqueInputSchema } from './NotificationArchiveWhereUniqueInputSchema';
import { NotificationArchiveCreateWithoutUserInputSchema } from './NotificationArchiveCreateWithoutUserInputSchema';
import { NotificationArchiveUncheckedCreateWithoutUserInputSchema } from './NotificationArchiveUncheckedCreateWithoutUserInputSchema';

export const NotificationArchiveCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationArchiveWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationArchiveCreateWithoutUserInputSchema),z.lazy(() => NotificationArchiveUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default NotificationArchiveCreateOrConnectWithoutUserInputSchema;
