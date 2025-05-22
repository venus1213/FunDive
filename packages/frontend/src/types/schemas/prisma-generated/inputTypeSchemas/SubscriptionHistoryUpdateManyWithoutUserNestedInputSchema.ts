import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryCreateWithoutUserInputSchema } from './SubscriptionHistoryCreateWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedCreateWithoutUserInputSchema } from './SubscriptionHistoryUncheckedCreateWithoutUserInputSchema';
import { SubscriptionHistoryCreateOrConnectWithoutUserInputSchema } from './SubscriptionHistoryCreateOrConnectWithoutUserInputSchema';
import { SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema } from './SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema';
import { SubscriptionHistoryCreateManyUserInputEnvelopeSchema } from './SubscriptionHistoryCreateManyUserInputEnvelopeSchema';
import { SubscriptionHistoryWhereUniqueInputSchema } from './SubscriptionHistoryWhereUniqueInputSchema';
import { SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema } from './SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema';
import { SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema } from './SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema';
import { SubscriptionHistoryScalarWhereInputSchema } from './SubscriptionHistoryScalarWhereInputSchema';

export const SubscriptionHistoryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryCreateWithoutUserInputSchema).array(),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscriptionHistoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscriptionHistoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema),z.lazy(() => SubscriptionHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionHistoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscriptionHistoryScalarWhereInputSchema),z.lazy(() => SubscriptionHistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default SubscriptionHistoryUpdateManyWithoutUserNestedInputSchema;
