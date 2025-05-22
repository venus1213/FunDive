import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';

export const SubscriptionNullableRelationFilterSchema: z.ZodType<Prisma.SubscriptionNullableRelationFilter> = z.object({
  is: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable()
}).strict();

export default SubscriptionNullableRelationFilterSchema;
