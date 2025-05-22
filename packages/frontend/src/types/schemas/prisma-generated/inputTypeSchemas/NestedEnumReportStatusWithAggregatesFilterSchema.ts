import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportStatusSchema } from './ReportStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumReportStatusFilterSchema } from './NestedEnumReportStatusFilterSchema';

export const NestedEnumReportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportStatusFilterSchema).optional()
}).strict();

export default NestedEnumReportStatusWithAggregatesFilterSchema;
