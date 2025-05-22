import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailScheduleUpdaterecipientIdsInputSchema: z.ZodType<Prisma.EmailScheduleUpdaterecipientIdsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default EmailScheduleUpdaterecipientIdsInputSchema;
