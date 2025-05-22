import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUpdateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema';
import { EmailScheduleCreateWithoutExecutionLogsInputSchema } from './EmailScheduleCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleWhereInputSchema } from './EmailScheduleWhereInputSchema';

export const EmailScheduleUpsertWithoutExecutionLogsInputSchema: z.ZodType<Prisma.EmailScheduleUpsertWithoutExecutionLogsInput> = z.object({
  update: z.union([ z.lazy(() => EmailScheduleUpdateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema) ]),
  where: z.lazy(() => EmailScheduleWhereInputSchema).optional()
}).strict();

export default EmailScheduleUpsertWithoutExecutionLogsInputSchema;
