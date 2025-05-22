import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreateWithoutExecutionLogsInputSchema } from './EmailScheduleCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema } from './EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';

export const EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema: z.ZodType<Prisma.EmailScheduleCreateNestedOneWithoutExecutionLogsInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema).optional(),
  connect: z.lazy(() => EmailScheduleWhereUniqueInputSchema).optional()
}).strict();

export default EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema;
