import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithoutProjectInputSchema } from './ReportUpdateWithoutProjectInputSchema';
import { ReportUncheckedUpdateWithoutProjectInputSchema } from './ReportUncheckedUpdateWithoutProjectInputSchema';

export const ReportUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export default ReportUpdateWithWhereUniqueWithoutProjectInputSchema;
