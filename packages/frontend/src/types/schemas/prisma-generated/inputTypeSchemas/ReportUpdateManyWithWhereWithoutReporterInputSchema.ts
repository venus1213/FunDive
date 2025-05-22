import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportScalarWhereInputSchema } from './ReportScalarWhereInputSchema';
import { ReportUpdateManyMutationInputSchema } from './ReportUpdateManyMutationInputSchema';
import { ReportUncheckedUpdateManyWithoutReporterInputSchema } from './ReportUncheckedUpdateManyWithoutReporterInputSchema';

export const ReportUpdateManyWithWhereWithoutReporterInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutReporterInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutReporterInputSchema) ]),
}).strict();

export default ReportUpdateManyWithWhereWithoutReporterInputSchema;
