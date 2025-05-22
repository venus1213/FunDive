import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithoutReporterInputSchema } from './ReportUpdateWithoutReporterInputSchema';
import { ReportUncheckedUpdateWithoutReporterInputSchema } from './ReportUncheckedUpdateWithoutReporterInputSchema';

export const ReportUpdateWithWhereUniqueWithoutReporterInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReporterInputSchema) ]),
}).strict();

export default ReportUpdateWithWhereUniqueWithoutReporterInputSchema;
