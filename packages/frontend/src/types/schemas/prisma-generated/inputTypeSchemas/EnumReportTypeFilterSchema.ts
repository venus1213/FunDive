import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';
import { NestedEnumReportTypeFilterSchema } from './NestedEnumReportTypeFilterSchema';

export const EnumReportTypeFilterSchema: z.ZodType<Prisma.EnumReportTypeFilter> = z.object({
  equals: z.lazy(() => ReportTypeSchema).optional(),
  in: z.lazy(() => ReportTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportTypeSchema),z.lazy(() => NestedEnumReportTypeFilterSchema) ]).optional(),
}).strict();

export default EnumReportTypeFilterSchema;
