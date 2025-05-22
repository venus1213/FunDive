import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateWithoutProjectInputSchema } from './ReportCreateWithoutProjectInputSchema';
import { ReportUncheckedCreateWithoutProjectInputSchema } from './ReportUncheckedCreateWithoutProjectInputSchema';
import { ReportCreateOrConnectWithoutProjectInputSchema } from './ReportCreateOrConnectWithoutProjectInputSchema';
import { ReportCreateManyProjectInputEnvelopeSchema } from './ReportCreateManyProjectInputEnvelopeSchema';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';

export const ReportCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ReportCreateNestedManyWithoutProjectInputSchema;
