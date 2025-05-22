import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportCreateWithoutReporterInputSchema } from './ReportCreateWithoutReporterInputSchema';
import { ReportUncheckedCreateWithoutReporterInputSchema } from './ReportUncheckedCreateWithoutReporterInputSchema';

export const ReportCreateOrConnectWithoutReporterInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutReporterInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema) ]),
}).strict();

export default ReportCreateOrConnectWithoutReporterInputSchema;
