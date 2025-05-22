import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogListRelationFilterSchema: z.ZodType<Prisma.EmailLogListRelationFilter> = z.object({
  every: z.lazy(() => EmailLogWhereInputSchema).optional(),
  some: z.lazy(() => EmailLogWhereInputSchema).optional(),
  none: z.lazy(() => EmailLogWhereInputSchema).optional()
}).strict();

export default EmailLogListRelationFilterSchema;
