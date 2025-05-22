import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';

export const SubscriptionNullableScalarRelationFilterSchema: z.ZodType<Prisma.SubscriptionNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable()
}).strict();

export default SubscriptionNullableScalarRelationFilterSchema;
