import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateWithoutReporterInputSchema } from './ReportCreateWithoutReporterInputSchema';
import { ReportUncheckedCreateWithoutReporterInputSchema } from './ReportUncheckedCreateWithoutReporterInputSchema';
import { ReportCreateOrConnectWithoutReporterInputSchema } from './ReportCreateOrConnectWithoutReporterInputSchema';
import { ReportUpsertWithWhereUniqueWithoutReporterInputSchema } from './ReportUpsertWithWhereUniqueWithoutReporterInputSchema';
import { ReportCreateManyReporterInputEnvelopeSchema } from './ReportCreateManyReporterInputEnvelopeSchema';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithWhereUniqueWithoutReporterInputSchema } from './ReportUpdateWithWhereUniqueWithoutReporterInputSchema';
import { ReportUpdateManyWithWhereWithoutReporterInputSchema } from './ReportUpdateManyWithWhereWithoutReporterInputSchema';
import { ReportScalarWhereInputSchema } from './ReportScalarWhereInputSchema';

export const ReportUpdateManyWithoutReporterNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutReporterNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReporterInputSchema),z.lazy(() => ReportCreateWithoutReporterInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReporterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutReporterInputSchema),z.lazy(() => ReportCreateOrConnectWithoutReporterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutReporterInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutReporterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyReporterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutReporterInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutReporterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutReporterInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutReporterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ReportUpdateManyWithoutReporterNestedInputSchema;
