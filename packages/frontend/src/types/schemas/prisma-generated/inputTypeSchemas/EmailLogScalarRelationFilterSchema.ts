import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogScalarRelationFilterSchema: z.ZodType<Prisma.EmailLogScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailLogWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailLogWhereInputSchema).optional()
}).strict();

export default EmailLogScalarRelationFilterSchema;
