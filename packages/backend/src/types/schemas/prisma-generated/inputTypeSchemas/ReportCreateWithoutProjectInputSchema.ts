import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { UserCreateNestedOneWithoutReportsInputSchema } from './UserCreateNestedOneWithoutReportsInputSchema';

export const ReportCreateWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  targetType: z.lazy(() => ReportTypeSchema),
  reason: z.lazy(() => ReportReasonSchema),
  status: z.lazy(() => ReportStatusSchema).optional(),
  comment: z.string().optional().nullable(),
  adminComment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reporter: z.lazy(() => UserCreateNestedOneWithoutReportsInputSchema)
}).strict();

export default ReportCreateWithoutProjectInputSchema;
