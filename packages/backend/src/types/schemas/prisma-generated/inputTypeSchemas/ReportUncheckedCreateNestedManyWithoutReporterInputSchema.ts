import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateWithoutReporterInputSchema } from './ReportCreateWithoutReporterInputSchema';
import { ReportUncheckedCreateWithoutReporterInputSchema } from './ReportUncheckedCreateWithoutReporterInputSchema';
import { ReportCreateOrConnectWithoutReporterInputSchema } from './ReportCreateOrConnectWithoutReporterInputSchema';
import { ReportCreateManyReporterInputEnvelopeSchema } from './ReportCreateManyReporterInputEnvelopeSchema';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';

export const ReportUncheckedCreateNestedManyWithoutReporterInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutReporterInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReporterInputSchema),z.lazy(() => ReportCreateWithoutReporterInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutReporterInputSchema),z.lazy(() => ReportCreateOrConnectWithoutReporterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyReporterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ReportUncheckedCreateNestedManyWithoutReporterInputSchema;
