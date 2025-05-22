import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateManySenderInputSchema } from './EmailLogCreateManySenderInputSchema';

export const EmailLogCreateManySenderInputEnvelopeSchema: z.ZodType<Prisma.EmailLogCreateManySenderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailLogCreateManySenderInputSchema),z.lazy(() => EmailLogCreateManySenderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailLogCreateManySenderInputEnvelopeSchema;
