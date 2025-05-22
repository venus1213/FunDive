import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumReportTypeFilterSchema } from './EnumReportTypeFilterSchema';
import { ReportTypeSchema } from './ReportTypeSchema';
import { EnumReportReasonFilterSchema } from './EnumReportReasonFilterSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { EnumReportStatusFilterSchema } from './EnumReportStatusFilterSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTypeFilterSchema),z.lazy(() => ReportTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => EnumReportReasonFilterSchema),z.lazy(() => ReportReasonSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  adminComment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ReportScalarWhereInputSchema;
