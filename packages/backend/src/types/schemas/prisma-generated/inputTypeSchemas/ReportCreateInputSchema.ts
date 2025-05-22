import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { UserCreateNestedOneWithoutReportsInputSchema } from './UserCreateNestedOneWithoutReportsInputSchema';
import { ProjectCreateNestedOneWithoutReportsInputSchema } from './ProjectCreateNestedOneWithoutReportsInputSchema';

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string().optional(),
  targetType: z.lazy(() => ReportTypeSchema),
  reason: z.lazy(() => ReportReasonSchema),
  status: z.lazy(() => ReportStatusSchema).optional(),
  comment: z.string().optional().nullable(),
  adminComment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reporter: z.lazy(() => UserCreateNestedOneWithoutReportsInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutReportsInputSchema).optional()
}).strict();

export default ReportCreateInputSchema;
