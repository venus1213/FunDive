import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema } from './EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogScalarWhereInputSchema } from './EmailScheduleExecutionLogScalarWhereInputSchema';

export const EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema).array(),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleNestedInputSchema;
