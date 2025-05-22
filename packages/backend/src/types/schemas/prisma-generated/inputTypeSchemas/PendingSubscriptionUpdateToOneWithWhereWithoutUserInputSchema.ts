import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';
import { PendingSubscriptionUpdateWithoutUserInputSchema } from './PendingSubscriptionUpdateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedUpdateWithoutUserInputSchema } from './PendingSubscriptionUncheckedUpdateWithoutUserInputSchema';

export const PendingSubscriptionUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PendingSubscriptionUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PendingSubscriptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PendingSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default PendingSubscriptionUpdateToOneWithWhereWithoutUserInputSchema;
