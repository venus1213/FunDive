import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProcessedStripeEventWhereInputSchema } from './ProcessedStripeEventWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ProcessedStripeEventWhereUniqueInputSchema: z.ZodType<Prisma.ProcessedStripeEventWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    eventId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    eventId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  eventId: z.string().optional(),
  AND: z.union([ z.lazy(() => ProcessedStripeEventWhereInputSchema),z.lazy(() => ProcessedStripeEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProcessedStripeEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProcessedStripeEventWhereInputSchema),z.lazy(() => ProcessedStripeEventWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  processedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export default ProcessedStripeEventWhereUniqueInputSchema;
