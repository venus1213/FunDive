import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportStatusSchema } from './ReportStatusSchema';

export const EnumReportStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportStatusSchema).optional()
}).strict();

export default EnumReportStatusFieldUpdateOperationsInputSchema;
