import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionCreateWithoutUserInputSchema } from './PendingSubscriptionCreateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedCreateWithoutUserInputSchema } from './PendingSubscriptionUncheckedCreateWithoutUserInputSchema';
import { PendingSubscriptionCreateOrConnectWithoutUserInputSchema } from './PendingSubscriptionCreateOrConnectWithoutUserInputSchema';
import { PendingSubscriptionUpsertWithoutUserInputSchema } from './PendingSubscriptionUpsertWithoutUserInputSchema';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';
import { PendingSubscriptionWhereUniqueInputSchema } from './PendingSubscriptionWhereUniqueInputSchema';
import { PendingSubscriptionUpdateToOneWithWhereWithoutUserInputSchema } from './PendingSubscriptionUpdateToOneWithWhereWithoutUserInputSchema';
import { PendingSubscriptionUpdateWithoutUserInputSchema } from './PendingSubscriptionUpdateWithoutUserInputSchema';
import { PendingSubscriptionUncheckedUpdateWithoutUserInputSchema } from './PendingSubscriptionUncheckedUpdateWithoutUserInputSchema';

export const PendingSubscriptionUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PendingSubscriptionUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PendingSubscriptionCreateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PendingSubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PendingSubscriptionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PendingSubscriptionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PendingSubscriptionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PendingSubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PendingSubscriptionUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => PendingSubscriptionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export default PendingSubscriptionUpdateOneWithoutUserNestedInputSchema;
