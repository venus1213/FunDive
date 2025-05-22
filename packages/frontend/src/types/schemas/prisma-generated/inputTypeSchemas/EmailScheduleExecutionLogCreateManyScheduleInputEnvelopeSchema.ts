import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateManyScheduleInputSchema } from './EmailScheduleExecutionLogCreateManyScheduleInputSchema';

export const EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateManyScheduleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateManyScheduleInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateManyScheduleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailScheduleExecutionLogCreateManyScheduleInputEnvelopeSchema;
