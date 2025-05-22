import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ProcessedStripeEventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProcessedStripeEventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProcessedStripeEventScalarWhereWithAggregatesInputSchema),z.lazy(() => ProcessedStripeEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProcessedStripeEventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProcessedStripeEventScalarWhereWithAggregatesInputSchema),z.lazy(() => ProcessedStripeEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  processedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ProcessedStripeEventScalarWhereWithAggregatesInputSchema;
