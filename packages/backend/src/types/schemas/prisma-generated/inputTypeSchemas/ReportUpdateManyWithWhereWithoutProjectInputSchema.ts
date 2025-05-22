import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportScalarWhereInputSchema } from './ReportScalarWhereInputSchema';
import { ReportUpdateManyMutationInputSchema } from './ReportUpdateManyMutationInputSchema';
import { ReportUncheckedUpdateManyWithoutProjectInputSchema } from './ReportUncheckedUpdateManyWithoutProjectInputSchema';

export const ReportUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export default ReportUpdateManyWithWhereWithoutProjectInputSchema;
