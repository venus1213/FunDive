import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithoutProjectInputSchema } from './ReportUpdateWithoutProjectInputSchema';
import { ReportUncheckedUpdateWithoutProjectInputSchema } from './ReportUncheckedUpdateWithoutProjectInputSchema';
import { ReportCreateWithoutProjectInputSchema } from './ReportCreateWithoutProjectInputSchema';
import { ReportUncheckedCreateWithoutProjectInputSchema } from './ReportUncheckedCreateWithoutProjectInputSchema';

export const ReportUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default ReportUpsertWithWhereUniqueWithoutProjectInputSchema;
