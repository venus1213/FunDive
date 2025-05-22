import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogNullableScalarRelationFilterSchema: z.ZodType<Prisma.EmailLogNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailLogWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EmailLogWhereInputSchema).optional().nullable()
}).strict();

export default EmailLogNullableScalarRelationFilterSchema;
