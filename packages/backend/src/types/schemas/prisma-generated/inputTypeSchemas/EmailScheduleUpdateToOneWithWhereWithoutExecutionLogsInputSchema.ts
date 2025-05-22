import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereInputSchema } from './EmailScheduleWhereInputSchema';
import { EmailScheduleUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUpdateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema';

export const EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInputSchema: z.ZodType<Prisma.EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInput> = z.object({
  where: z.lazy(() => EmailScheduleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailScheduleUpdateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema) ]),
}).strict();

export default EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInputSchema;
