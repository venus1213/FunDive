import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';
import { EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema';

export const EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema;
