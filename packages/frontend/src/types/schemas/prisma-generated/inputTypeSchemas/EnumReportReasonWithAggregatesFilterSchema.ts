import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportReasonSchema } from './ReportReasonSchema';
import { NestedEnumReportReasonWithAggregatesFilterSchema } from './NestedEnumReportReasonWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumReportReasonFilterSchema } from './NestedEnumReportReasonFilterSchema';

export const EnumReportReasonWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportReasonWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportReasonSchema).optional(),
  in: z.lazy(() => ReportReasonSchema).array().optional(),
  notIn: z.lazy(() => ReportReasonSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportReasonSchema),z.lazy(() => NestedEnumReportReasonWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportReasonFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportReasonFilterSchema).optional()
}).strict();

export default EnumReportReasonWithAggregatesFilterSchema;
