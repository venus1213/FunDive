import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateManyReporterInputSchema } from './ReportCreateManyReporterInputSchema';

export const ReportCreateManyReporterInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyReporterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyReporterInputSchema),z.lazy(() => ReportCreateManyReporterInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ReportCreateManyReporterInputEnvelopeSchema;
