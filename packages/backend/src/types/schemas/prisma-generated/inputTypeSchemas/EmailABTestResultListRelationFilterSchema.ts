import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereInputSchema } from './EmailABTestResultWhereInputSchema';

export const EmailABTestResultListRelationFilterSchema: z.ZodType<Prisma.EmailABTestResultListRelationFilter> = z.object({
  every: z.lazy(() => EmailABTestResultWhereInputSchema).optional(),
  some: z.lazy(() => EmailABTestResultWhereInputSchema).optional(),
  none: z.lazy(() => EmailABTestResultWhereInputSchema).optional()
}).strict();

export default EmailABTestResultListRelationFilterSchema;
