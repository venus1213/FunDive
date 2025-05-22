import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateManyEmailLogInputSchema } from './EmailScheduleExecutionLogCreateManyEmailLogInputSchema';

export const EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateManyEmailLogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateManyEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateManyEmailLogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema;
