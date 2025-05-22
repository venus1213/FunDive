import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { EnumEmailABTestStatusWithAggregatesFilterSchema } from './EnumEmailABTestStatusWithAggregatesFilterSchema';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const EmailABTestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailABTestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailABTestScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailABTestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailABTestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  variantA: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  variantB: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailABTestStatusWithAggregatesFilterSchema),z.lazy(() => EmailABTestStatusSchema) ]).optional(),
  winningVariant: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  metrics: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailABTestScalarWhereWithAggregatesInputSchema;
