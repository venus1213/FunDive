import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogWhereUniqueInputSchema } from './ActivityLogWhereUniqueInputSchema';
import { ActivityLogCreateWithoutUserInputSchema } from './ActivityLogCreateWithoutUserInputSchema';
import { ActivityLogUncheckedCreateWithoutUserInputSchema } from './ActivityLogUncheckedCreateWithoutUserInputSchema';

export const ActivityLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ActivityLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ActivityLogCreateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ActivityLogCreateOrConnectWithoutUserInputSchema;
