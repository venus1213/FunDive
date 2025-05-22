import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateManyTemplateInputSchema } from './EmailLogCreateManyTemplateInputSchema';

export const EmailLogCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.EmailLogCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailLogCreateManyTemplateInputSchema),z.lazy(() => EmailLogCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailLogCreateManyTemplateInputEnvelopeSchema;
