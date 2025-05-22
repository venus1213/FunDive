import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateManyTemplateInputSchema } from './EmailABTestCreateManyTemplateInputSchema';

export const EmailABTestCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.EmailABTestCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailABTestCreateManyTemplateInputSchema),z.lazy(() => EmailABTestCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailABTestCreateManyTemplateInputEnvelopeSchema;
