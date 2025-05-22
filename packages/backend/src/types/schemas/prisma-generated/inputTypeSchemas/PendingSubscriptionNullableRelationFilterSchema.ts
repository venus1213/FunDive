import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';

export const PendingSubscriptionNullableRelationFilterSchema: z.ZodType<Prisma.PendingSubscriptionNullableRelationFilter> = z.object({
  is: z.lazy(() => PendingSubscriptionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PendingSubscriptionWhereInputSchema).optional().nullable()
}).strict();

export default PendingSubscriptionNullableRelationFilterSchema;
