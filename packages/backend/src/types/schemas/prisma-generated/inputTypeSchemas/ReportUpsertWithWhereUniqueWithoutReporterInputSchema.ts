import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithoutReporterInputSchema } from './ReportUpdateWithoutReporterInputSchema';
import { ReportUncheckedUpdateWithoutReporterInputSchema } from './ReportUncheckedUpdateWithoutReporterInputSchema';
import { ReportCreateWithoutReporterInputSchema } from './ReportCreateWithoutReporterInputSchema';
import { ReportUncheckedCreateWithoutReporterInputSchema } from './ReportUncheckedCreateWithoutReporterInputSchema';

export const ReportUpsertWithWhereUniqueWithoutReporterInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReporterInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema) ]),
}).strict();

export default ReportUpsertWithWhereUniqueWithoutReporterInputSchema;
