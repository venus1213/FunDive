import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryWhereUniqueInputSchema } from './SubscriptionHistoryWhereUniqueInputSchema';
import { SubscriptionHistoryCreateWithoutUserInputSchema } from './SubscriptionHistoryCreateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedCreateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedCreateWithoutUserInputSchema';

export const SubscriptionHistoryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default SubscriptionHistoryCreateOrConnectWithoutUserInputSchema;
