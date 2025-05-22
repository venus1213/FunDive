import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const EmailABTestResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailABTestResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailABTestResultScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailABTestResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestResultScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailABTestResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  testId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  variant: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  opened: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  clicked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailABTestResultScalarWhereWithAggregatesInputSchema;
