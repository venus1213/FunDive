import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportCreateWithoutProjectInputSchema } from './ReportCreateWithoutProjectInputSchema';
import { ReportUncheckedCreateWithoutProjectInputSchema } from './ReportUncheckedCreateWithoutProjectInputSchema';

export const ReportCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default ReportCreateOrConnectWithoutProjectInputSchema;
