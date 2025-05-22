import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateScalarRelationFilterSchema: z.ZodType<Prisma.EmailTemplateScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateScalarRelationFilterSchema;
