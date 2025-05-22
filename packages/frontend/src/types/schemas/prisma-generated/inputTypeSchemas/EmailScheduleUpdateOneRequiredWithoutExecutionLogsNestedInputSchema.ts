import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreateWithoutExecutionLogsInputSchema } from './EmailScheduleCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema';
import { EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema } from './EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema';
import { EmailScheduleUpsertWithoutExecutionLogsInputSchema } from './EmailScheduleUpsertWithoutExecutionLogsInputSchema';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInputSchema } from './EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInputSchema';
import { EmailScheduleUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUpdateWithoutExecutionLogsInputSchema';
import { EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema } from './EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema';

export const EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInputSchema: z.ZodType<Prisma.EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutExecutionLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailScheduleCreateOrConnectWithoutExecutionLogsInputSchema).optional(),
  upsert: z.lazy(() => EmailScheduleUpsertWithoutExecutionLogsInputSchema).optional(),
  connect: z.lazy(() => EmailScheduleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailScheduleUpdateToOneWithWhereWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUpdateWithoutExecutionLogsInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateWithoutExecutionLogsInputSchema) ]).optional(),
}).strict();

export default EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInputSchema;
