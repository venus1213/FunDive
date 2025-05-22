import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumEmailABTestStatusFilterSchema } from './EnumEmailABTestStatusFilterSchema';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const EmailABTestScalarWhereInputSchema: z.ZodType<Prisma.EmailABTestScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailABTestScalarWhereInputSchema),z.lazy(() => EmailABTestScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestScalarWhereInputSchema),z.lazy(() => EmailABTestScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  variantA: z.lazy(() => JsonFilterSchema).optional(),
  variantB: z.lazy(() => JsonFilterSchema).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailABTestStatusFilterSchema),z.lazy(() => EmailABTestStatusSchema) ]).optional(),
  winningVariant: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metrics: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailABTestScalarWhereInputSchema;
