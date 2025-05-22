import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionWhereUniqueInputSchema } from './PendingSubscriptionWhereUniqueInputSchema';
import { PendingSubscriptionCreateWithoutUserInputSchema } from './PendingSubscriptionCreateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedCreateWithoutUserInputSchema } from './PendingSubscriptionUncheckedCreateWithoutUserInputSchema';

export const PendingSubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PendingSubscriptionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PendingSubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PendingSubscriptionCreateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default PendingSubscriptionCreateOrConnectWithoutUserInputSchema;
