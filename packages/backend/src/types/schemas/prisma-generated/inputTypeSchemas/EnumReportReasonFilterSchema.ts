import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportReasonSchema } from './ReportReasonSchema';
import { NestedEnumReportReasonFilterSchema } from './NestedEnumReportReasonFilterSchema';

export const EnumReportReasonFilterSchema: z.ZodType<Prisma.EnumReportReasonFilter> = z.object({
  equals: z.lazy(() => ReportReasonSchema).optional(),
  in: z.lazy(() => ReportReasonSchema).array().optional(),
  notIn: z.lazy(() => ReportReasonSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportReasonSchema),z.lazy(() => NestedEnumReportReasonFilterSchema) ]).optional(),
}).strict();

export default EnumReportReasonFilterSchema;
