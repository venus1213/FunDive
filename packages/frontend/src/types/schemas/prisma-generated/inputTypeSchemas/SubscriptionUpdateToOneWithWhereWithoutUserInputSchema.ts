import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';
import { SubscriptionUpdateWithoutUserInputSchema } from './SubscriptionUpdateWithoutUserInputSchema';
import { SubscriptionUncheckedUpdateWithoutUserInputSchema } from './SubscriptionUncheckedUpdateWithoutUserInputSchema';

export const SubscriptionUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default SubscriptionUpdateToOneWithWhereWithoutUserInputSchema;
