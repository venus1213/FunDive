import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreateManyTemplateInputSchema } from './EmailScheduleCreateManyTemplateInputSchema';

export const EmailScheduleCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.EmailScheduleCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailScheduleCreateManyTemplateInputSchema),z.lazy(() => EmailScheduleCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailScheduleCreateManyTemplateInputEnvelopeSchema;
