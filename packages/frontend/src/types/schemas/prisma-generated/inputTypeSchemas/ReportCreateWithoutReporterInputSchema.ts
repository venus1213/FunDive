import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { ProjectCreateNestedOneWithoutReportsInputSchema } from './ProjectCreateNestedOneWithoutReportsInputSchema';

export const ReportCreateWithoutReporterInputSchema: z.ZodType<Prisma.ReportCreateWithoutReporterInput> = z.object({
  id: z.string().uuid().optional(),
  targetType: z.lazy(() => ReportTypeSchema),
  reason: z.lazy(() => ReportReasonSchema),
  status: z.lazy(() => ReportStatusSchema).optional(),
  comment: z.string().optional().nullable(),
  adminComment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReportsInputSchema).optional()
}).strict();

export default ReportCreateWithoutReporterInputSchema;
