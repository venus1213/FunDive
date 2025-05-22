import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateListRelationFilterSchema: z.ZodType<Prisma.EmailTemplateListRelationFilter> = z.object({
  every: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  some: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  none: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateListRelationFilterSchema;
