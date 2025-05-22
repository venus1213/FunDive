import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryWhereUniqueInputSchema } from './SubscriptionHistoryWhereUniqueInputSchema';
import { SubscriptionHistoryUpdateWithoutUserInputSchema } from './SubscriptionHistoryUpdateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema';

export const SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscriptionHistoryUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema;
