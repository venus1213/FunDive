import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailScheduleCreaterecipientIdsInputSchema: z.ZodType<Prisma.EmailScheduleCreaterecipientIdsInput> = z.object({
  set: z.string().array()
}).strict();

export default EmailScheduleCreaterecipientIdsInputSchema;
