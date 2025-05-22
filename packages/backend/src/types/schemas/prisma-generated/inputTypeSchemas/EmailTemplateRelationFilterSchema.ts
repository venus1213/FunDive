import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateRelationFilterSchema: z.ZodType<Prisma.EmailTemplateRelationFilter> = z.object({
  is: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateRelationFilterSchema;
