import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema } from './EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';

export const EmailScheduleExecutionLogUncheckedCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedCreateNestedManyWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema).array(),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogUncheckedCreateNestedManyWithoutScheduleInputSchema;
