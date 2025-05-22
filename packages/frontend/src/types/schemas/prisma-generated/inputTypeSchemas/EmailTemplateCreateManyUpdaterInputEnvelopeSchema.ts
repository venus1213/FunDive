import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateManyUpdaterInputSchema } from './EmailTemplateCreateManyUpdaterInputSchema';

export const EmailTemplateCreateManyUpdaterInputEnvelopeSchema: z.ZodType<Prisma.EmailTemplateCreateManyUpdaterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailTemplateCreateManyUpdaterInputSchema),z.lazy(() => EmailTemplateCreateManyUpdaterInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailTemplateCreateManyUpdaterInputEnvelopeSchema;
