import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema';

export const EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema) ]),
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpsertWithWhereUniqueWithoutEmailLogInputSchema;
