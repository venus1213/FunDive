import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogWhereInputSchema } from './ErrorLogWhereInputSchema';

export const ErrorLogListRelationFilterSchema: z.ZodType<Prisma.ErrorLogListRelationFilter> = z.object({
  every: z.lazy(() => ErrorLogWhereInputSchema).optional(),
  some: z.lazy(() => ErrorLogWhereInputSchema).optional(),
  none: z.lazy(() => ErrorLogWhereInputSchema).optional()
}).strict();

export default ErrorLogListRelationFilterSchema;
