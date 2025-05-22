import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionCreateWithoutUserInputSchema } from './SubscriptionCreateWithoutUserInputSchema';
import { SubscriptionUncheckedCreateWithoutUserInputSchema } from './SubscriptionUncheckedCreateWithoutUserInputSchema';
import { SubscriptionCreateOrConnectWithoutUserInputSchema } from './SubscriptionCreateOrConnectWithoutUserInputSchema';
import { SubscriptionWhereUniqueInputSchema } from './SubscriptionWhereUniqueInputSchema';

export const SubscriptionCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional()
}).strict();

export default SubscriptionCreateNestedOneWithoutUserInputSchema;
