import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateManyCreatorInputSchema } from './EmailTemplateCreateManyCreatorInputSchema';

export const EmailTemplateCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.EmailTemplateCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailTemplateCreateManyCreatorInputSchema),z.lazy(() => EmailTemplateCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailTemplateCreateManyCreatorInputEnvelopeSchema;
