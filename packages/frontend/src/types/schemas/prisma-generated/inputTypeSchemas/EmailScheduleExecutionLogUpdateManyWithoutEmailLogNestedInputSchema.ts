import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema } from './EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogScalarWhereInputSchema } from './EmailScheduleExecutionLogScalarWhereInputSchema';

export const EmailScheduleExecutionLogUpdateManyWithoutEmailLogNestedInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateManyWithoutEmailLogNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema).array(),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogUpdateManyWithoutEmailLogNestedInputSchema;
