import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailLogCreaterecipientIdsInputSchema: z.ZodType<Prisma.EmailLogCreaterecipientIdsInput> = z.object({
  set: z.string().array()
}).strict();

export default EmailLogCreaterecipientIdsInputSchema;
