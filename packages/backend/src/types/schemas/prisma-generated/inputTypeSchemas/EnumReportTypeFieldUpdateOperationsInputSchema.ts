import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportTypeSchema } from './ReportTypeSchema';

export const EnumReportTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportTypeSchema).optional()
}).strict();

export default EnumReportTypeFieldUpdateOperationsInputSchema;
