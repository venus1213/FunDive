import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereInputSchema } from './ReportWhereInputSchema';

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export default ReportListRelationFilterSchema;
