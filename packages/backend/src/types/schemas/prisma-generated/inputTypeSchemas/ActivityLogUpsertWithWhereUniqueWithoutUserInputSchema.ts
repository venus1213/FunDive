import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogWhereUniqueInputSchema } from './ActivityLogWhereUniqueInputSchema';
import { ActivityLogUpdateWithoutUserInputSchema } from './ActivityLogUpdateWithoutUserInputSchema';
import { ActivityLogUncheckedUpdateWithoutUserInputSchema } from './ActivityLogUncheckedUpdateWithoutUserInputSchema';
import { ActivityLogCreateWithoutUserInputSchema } from './ActivityLogCreateWithoutUserInputSchema';
import { ActivityLogUncheckedCreateWithoutUserInputSchema } from './ActivityLogUncheckedCreateWithoutUserInputSchema';

export const ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ActivityLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ActivityLogUpdateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ActivityLogCreateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ActivityLogUpsertWithWhereUniqueWithoutUserInputSchema;
