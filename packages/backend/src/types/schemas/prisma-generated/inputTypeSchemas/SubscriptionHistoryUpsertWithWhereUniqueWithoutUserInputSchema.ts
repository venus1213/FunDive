import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryWhereUniqueInputSchema } from './SubscriptionHistoryWhereUniqueInputSchema';
import { SubscriptionHistoryUpdateWithoutUserInputSchema } from './SubscriptionHistoryUpdateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema';
import { SubscriptionHistoryCreateWithoutUserInputSchema } from './SubscriptionHistoryCreateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedCreateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedCreateWithoutUserInputSchema';

export const SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscriptionHistoryUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema;
