import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionCreateWithoutUserInputSchema } from './SubscriptionCreateWithoutUserInputSchema';
import { SubscriptionUncheckedCreateWithoutUserInputSchema } from './SubscriptionUncheckedCreateWithoutUserInputSchema';
import { SubscriptionCreateOrConnectWithoutUserInputSchema } from './SubscriptionCreateOrConnectWithoutUserInputSchema';
import { SubscriptionUpsertWithoutUserInputSchema } from './SubscriptionUpsertWithoutUserInputSchema';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';
import { SubscriptionWhereUniqueInputSchema } from './SubscriptionWhereUniqueInputSchema';
import { SubscriptionUpdateToOneWithWhereWithoutUserInputSchema } from './SubscriptionUpdateToOneWithWhereWithoutUserInputSchema';
import { SubscriptionUpdateWithoutUserInputSchema } from './SubscriptionUpdateWithoutUserInputSchema';
import { SubscriptionUncheckedUpdateWithoutUserInputSchema } from './SubscriptionUncheckedUpdateWithoutUserInputSchema';

export const SubscriptionUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export default SubscriptionUpdateOneWithoutUserNestedInputSchema;
