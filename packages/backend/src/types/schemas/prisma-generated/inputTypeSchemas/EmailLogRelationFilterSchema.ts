import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogRelationFilterSchema: z.ZodType<Prisma.EmailLogRelationFilter> = z.object({
  is: z.lazy(() => EmailLogWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailLogWhereInputSchema).optional()
}).strict();

export default EmailLogRelationFilterSchema;
