import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { ReportTypeSchema } from './ReportTypeSchema';
import { EnumReportTypeFieldUpdateOperationsInputSchema } from './EnumReportTypeFieldUpdateOperationsInputSchema';
import { ReportReasonSchema } from './ReportReasonSchema';
import { EnumReportReasonFieldUpdateOperationsInputSchema } from './EnumReportReasonFieldUpdateOperationsInputSchema';
import { ReportStatusSchema } from './ReportStatusSchema';
import { EnumReportStatusFieldUpdateOperationsInputSchema } from './EnumReportStatusFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const ReportUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTypeSchema),z.lazy(() => EnumReportTypeFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.lazy(() => ReportReasonSchema),z.lazy(() => EnumReportReasonFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default ReportUncheckedUpdateWithoutProjectInputSchema;
