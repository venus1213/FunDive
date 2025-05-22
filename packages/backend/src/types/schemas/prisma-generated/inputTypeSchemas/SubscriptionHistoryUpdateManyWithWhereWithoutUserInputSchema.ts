import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryScalarWhereInputSchema } from './SubscriptionHistoryScalarWhereInputSchema';
import { SubscriptionHistoryUpdateManyMutationInputSchema } from './SubscriptionHistoryUpdateManyMutationInputSchema';
import { SubscriptionHistoryUncheckedUpdateManyWithoutUserInputSchema } from './SubscriptionHistoryUncheckedUpdateManyWithoutUserInputSchema';

export const SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionHistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscriptionHistoryUpdateManyMutationInputSchema),z.lazy(() => SubscriptionHistoryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema;
