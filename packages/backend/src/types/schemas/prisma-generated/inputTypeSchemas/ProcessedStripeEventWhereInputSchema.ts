import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ProcessedStripeEventWhereInputSchema: z.ZodType<Prisma.ProcessedStripeEventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProcessedStripeEventWhereInputSchema),z.lazy(() => ProcessedStripeEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProcessedStripeEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProcessedStripeEventWhereInputSchema),z.lazy(() => ProcessedStripeEventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  processedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ProcessedStripeEventWhereInputSchema;
