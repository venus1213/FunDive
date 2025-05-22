import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionCreateWithoutUserInputSchema } from './PendingSubscriptionCreateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedCreateWithoutUserInputSchema } from './PendingSubscriptionUncheckedCreateWithoutUserInputSchema';
import { PendingSubscriptionCreateOrConnectWithoutUserInputSchema } from './PendingSubscriptionCreateOrConnectWithoutUserInputSchema';
import { PendingSubscriptionWhereUniqueInputSchema } from './PendingSubscriptionWhereUniqueInputSchema';

export const PendingSubscriptionUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PendingSubscriptionUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PendingSubscriptionCreateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PendingSubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PendingSubscriptionWhereUniqueInputSchema).optional()
}).strict();

export default PendingSubscriptionUncheckedCreateNestedOneWithoutUserInputSchema;
