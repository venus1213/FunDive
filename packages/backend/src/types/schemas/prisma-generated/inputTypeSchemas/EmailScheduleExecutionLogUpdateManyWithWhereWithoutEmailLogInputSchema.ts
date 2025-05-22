import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogScalarWhereInputSchema } from './EmailScheduleExecutionLogScalarWhereInputSchema';
import { EmailScheduleExecutionLogUpdateManyMutationInputSchema } from './EmailScheduleExecutionLogUpdateManyMutationInputSchema';
import { EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInputSchema';

export const EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInput> = z.object({
  where: z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogUpdateManyMutationInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInputSchema) ]),
}).strict();

export default EmailScheduleExecutionLogUpdateManyWithWhereWithoutEmailLogInputSchema;
