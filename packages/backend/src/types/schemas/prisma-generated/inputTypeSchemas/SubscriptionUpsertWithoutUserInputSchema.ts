import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionUpdateWithoutUserInputSchema } from './SubscriptionUpdateWithoutUserInputSchema';
import { SubscriptionUncheckedUpdateWithoutUserInputSchema } from './SubscriptionUncheckedUpdateWithoutUserInputSchema';
import { SubscriptionCreateWithoutUserInputSchema } from './SubscriptionCreateWithoutUserInputSchema';
import { SubscriptionUncheckedCreateWithoutUserInputSchema } from './SubscriptionUncheckedCreateWithoutUserInputSchema';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';

export const SubscriptionUpsertWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SubscriptionWhereInputSchema).optional()
}).strict();

export default SubscriptionUpsertWithoutUserInputSchema;
