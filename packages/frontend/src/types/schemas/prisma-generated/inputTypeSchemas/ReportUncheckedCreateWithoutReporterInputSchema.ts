import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { ReportStatusSchema } from './ReportStatusSchema';

export const ReportUncheckedCreateWithoutReporterInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutReporterInput> = z.object({
  id: z.string().uuid().optional(),
  targetType: z.lazy(() => ReportTypeSchema),
  targetId: z.string(),
  reason: z.lazy(() => ReportReasonSchema),
  status: z.lazy(() => ReportStatusSchema).optional(),
  comment: z.string().optional().nullable(),
  adminComment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ReportUncheckedCreateWithoutReporterInputSchema;
