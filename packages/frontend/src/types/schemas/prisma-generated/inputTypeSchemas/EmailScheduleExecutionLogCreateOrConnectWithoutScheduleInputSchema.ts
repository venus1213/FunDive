import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema';

export const EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogCreateOrConnectWithoutScheduleInputSchema;
