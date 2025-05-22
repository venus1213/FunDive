import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryCreateWithoutUserInputSchema } from './SubscriptionHistoryCreateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedCreateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedCreateWithoutUserInputSchema';
import { SubscriptionHistoryCreateOrConnectWithoutUserInputSchema } from './SubscriptionHistoryCreateOrConnectWithoutUserInputSchema';
import { SubscriptionHistoryCreateManyUserInputEnvelopeSchema } from './SubscriptionHistoryCreateManyUserInputEnvelopeSchema';
import { SubscriptionHistoryWhereUniqueInputSchema } from './SubscriptionHistoryWhereUniqueInputSchema';

export const SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionHistoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInputSchema;
