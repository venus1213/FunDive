import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportStatusSchema } from './ReportStatusSchema';

export const NestedEnumReportStatusFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumReportStatusFilterSchema;
