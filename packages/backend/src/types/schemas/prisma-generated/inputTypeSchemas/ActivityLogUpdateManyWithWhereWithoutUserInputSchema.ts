import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogScalarWhereInputSchema } from './ActivityLogScalarWhereInputSchema';
import { ActivityLogUpdateManyMutationInputSchema } from './ActivityLogUpdateManyMutationInputSchema';
import { ActivityLogUncheckedUpdateManyWithoutUserInputSchema } from './ActivityLogUncheckedUpdateManyWithoutUserInputSchema';

export const ActivityLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ActivityLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ActivityLogUpdateManyMutationInputSchema),z.lazy(() => ActivityLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ActivityLogUpdateManyWithWhereWithoutUserInputSchema;
