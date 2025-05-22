import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogWhereUniqueInputSchema } from './ActivityLogWhereUniqueInputSchema';
import { ActivityLogUpdateWithoutUserInputSchema } from './ActivityLogUpdateWithoutUserInputSchema';
import { ActivityLogUncheckedUpdateWithoutUserInputSchema } from './ActivityLogUncheckedUpdateWithoutUserInputSchema';

export const ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ActivityLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ActivityLogUpdateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ActivityLogUpdateWithWhereUniqueWithoutUserInputSchema;
