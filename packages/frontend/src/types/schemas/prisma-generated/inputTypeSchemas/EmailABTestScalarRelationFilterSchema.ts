import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';

export const EmailABTestScalarRelationFilterSchema: z.ZodType<Prisma.EmailABTestScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailABTestWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailABTestWhereInputSchema).optional()
}).strict();

export default EmailABTestScalarRelationFilterSchema;
