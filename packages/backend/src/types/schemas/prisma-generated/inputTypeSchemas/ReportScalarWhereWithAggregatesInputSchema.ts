import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumReportTypeWithAggregatesFilterSchema } from './EnumReportTypeWithAggregatesFilterSchema';
import { ReportTypeSchema } from './ReportTypeSchema';
import { EnumReportReasonWithAggregatesFilterSchema } from './EnumReportReasonWithAggregatesFilterSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { EnumReportStatusWithAggregatesFilterSchema } from './EnumReportStatusWithAggregatesFilterSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTypeWithAggregatesFilterSchema),z.lazy(() => ReportTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => EnumReportReasonWithAggregatesFilterSchema),z.lazy(() => ReportReasonSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusWithAggregatesFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  adminComment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ReportScalarWhereWithAggregatesInputSchema;
