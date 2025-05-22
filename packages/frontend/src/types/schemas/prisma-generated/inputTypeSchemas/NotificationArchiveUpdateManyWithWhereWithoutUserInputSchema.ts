import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveScalarWhereInputSchema } from './NotificationArchiveScalarWhereInputSchema';
import { NotificationArchiveUpdateManyMutationInputSchema } from './NotificationArchiveUpdateManyMutationInputSchema';
import { NotificationArchiveUncheckedUpdateManyWithoutUserInputSchema } from './NotificationArchiveUncheckedUpdateManyWithoutUserInputSchema';

export const NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationArchiveScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationArchiveUpdateManyMutationInputSchema),z.lazy(() => NotificationArchiveUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default NotificationArchiveUpdateManyWithWhereWithoutUserInputSchema;
