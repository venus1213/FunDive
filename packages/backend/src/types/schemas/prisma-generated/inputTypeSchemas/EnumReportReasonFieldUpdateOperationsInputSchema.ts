import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportReasonSchema } from './ReportReasonSchema';

export const EnumReportReasonFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportReasonFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportReasonSchema).optional()
}).strict();

export default EnumReportReasonFieldUpdateOperationsInputSchema;
