import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema';

export const EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutScheduleInputSchema;
