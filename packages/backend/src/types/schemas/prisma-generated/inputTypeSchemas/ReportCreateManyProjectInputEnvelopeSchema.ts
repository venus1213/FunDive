import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateManyProjectInputSchema } from './ReportCreateManyProjectInputSchema';

export const ReportCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyProjectInputSchema),z.lazy(() => ReportCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ReportCreateManyProjectInputEnvelopeSchema;
