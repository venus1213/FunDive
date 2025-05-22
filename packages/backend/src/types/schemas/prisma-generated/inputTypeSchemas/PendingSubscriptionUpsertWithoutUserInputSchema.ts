import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionUpdateWithoutUserInputSchema } from './PendingSubscriptionUpdateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedUpdateWithoutUserInputSchema } from './PendingSubscriptionUncheckedUpdateWithoutUserInputSchema';
import { PendingSubscriptionCreateWithoutUserInputSchema } from './PendingSubscriptionCreateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedCreateWithoutUserInputSchema } from './PendingSubscriptionUncheckedCreateWithoutUserInputSchema';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';

export const PendingSubscriptionUpsertWithoutUserInputSchema: z.ZodType<Prisma.PendingSubscriptionUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => PendingSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PendingSubscriptionCreateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => PendingSubscriptionWhereInputSchema).optional()
}).strict();

export default PendingSubscriptionUpsertWithoutUserInputSchema;
