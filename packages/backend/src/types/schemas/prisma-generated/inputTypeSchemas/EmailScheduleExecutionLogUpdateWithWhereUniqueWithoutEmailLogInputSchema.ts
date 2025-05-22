import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema';

export const EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateWithoutEmailLogInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpdateWithWhereUniqueWithoutEmailLogInputSchema;
