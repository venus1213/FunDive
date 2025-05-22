import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema';

export const EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithoutScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutScheduleInputSchema;
