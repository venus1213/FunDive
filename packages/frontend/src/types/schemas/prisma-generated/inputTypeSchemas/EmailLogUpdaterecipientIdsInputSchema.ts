import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailLogUpdaterecipientIdsInputSchema: z.ZodType<Prisma.EmailLogUpdaterecipientIdsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default EmailLogUpdaterecipientIdsInputSchema;
