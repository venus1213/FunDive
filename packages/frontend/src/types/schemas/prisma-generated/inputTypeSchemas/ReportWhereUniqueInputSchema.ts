import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereInputSchema } from './ReportWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumReportTypeFilterSchema } from './EnumReportTypeFilterSchema';
import { ReportTypeSchema } from './ReportTypeSchema';
import { EnumReportReasonFilterSchema } from './EnumReportReasonFilterSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { EnumReportStatusFilterSchema } from './EnumReportStatusFilterSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProjectNullableScalarRelationFilterSchema } from './ProjectNullableScalarRelationFilterSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTypeFilterSchema),z.lazy(() => ReportTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => EnumReportReasonFilterSchema),z.lazy(() => ReportReasonSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  adminComment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporter: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectNullableScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
}).strict());

export default ReportWhereUniqueInputSchema;
