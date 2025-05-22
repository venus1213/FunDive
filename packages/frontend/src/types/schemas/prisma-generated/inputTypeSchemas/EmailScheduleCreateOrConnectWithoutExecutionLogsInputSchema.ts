import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleCreateWithoutExecutionLogsInputSchema } from './EmailScheduleCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema';

export const EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema: z.ZodType<Prisma.EmailScheduleCreateOrConnectWithoutExecutionLogsInput> = z.object({
  where: z.lazy(() => EmailScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema) ]),
}).strict();

export default EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema;
