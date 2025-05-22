import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ErrorLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ErrorLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ErrorLogScalarWhereWithAggregatesInputSchema),z.lazy(() => ErrorLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ErrorLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ErrorLogScalarWhereWithAggregatesInputSchema),z.lazy(() => ErrorLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  error: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ErrorLogScalarWhereWithAggregatesInputSchema;
