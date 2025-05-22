import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ReportCreateWithoutProjectInputSchema } from './ReportCreateWithoutProjectInputSchema';
import { ReportUncheckedCreateWithoutProjectInputSchema } from './ReportUncheckedCreateWithoutProjectInputSchema';
import { ReportCreateOrConnectWithoutProjectInputSchema } from './ReportCreateOrConnectWithoutProjectInputSchema';
import { ReportUpsertWithWhereUniqueWithoutProjectInputSchema } from './ReportUpsertWithWhereUniqueWithoutProjectInputSchema';
import { ReportCreateManyProjectInputEnvelopeSchema } from './ReportCreateManyProjectInputEnvelopeSchema';
import { ReportWhereUniqueInputSchema } from './ReportWhereUniqueInputSchema';
import { ReportUpdateWithWhereUniqueWithoutProjectInputSchema } from './ReportUpdateWithWhereUniqueWithoutProjectInputSchema';
import { ReportUpdateManyWithWhereWithoutProjectInputSchema } from './ReportUpdateManyWithWhereWithoutProjectInputSchema';
import { ReportScalarWhereInputSchema } from './ReportScalarWhereInputSchema';

export const ReportUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutProjectInputSchema),z.lazy(() => ReportCreateWithoutProjectInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema),z.lazy(() => ReportUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema),z.lazy(() => ReportCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ReportUpdateManyWithoutProjectNestedInputSchema;
