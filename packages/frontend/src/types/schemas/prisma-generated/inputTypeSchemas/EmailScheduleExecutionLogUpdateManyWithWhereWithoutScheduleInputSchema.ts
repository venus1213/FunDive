import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogScalarWhereInputSchema } from './EmailScheduleExecutionLogScalarWhereInputSchema';
import { EmailScheduleExecutionLogUpdateManyMutationInputSchema } from './EmailScheduleExecutionLogUpdateManyMutationInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleInputSchema';

export const EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateManyMutationInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateManyWithoutScheduleInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpdateManyWithWhereWithoutScheduleInputSchema;
