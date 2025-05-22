import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';

export const EmailABTestListRelationFilterSchema: z.ZodType<Prisma.EmailABTestListRelationFilter> = z.object({
  every: z.lazy(() => EmailABTestWhereInputSchema).optional(),
  some: z.lazy(() => EmailABTestWhereInputSchema).optional(),
  none: z.lazy(() => EmailABTestWhereInputSchema).optional()
}).strict();

export default EmailABTestListRelationFilterSchema;
