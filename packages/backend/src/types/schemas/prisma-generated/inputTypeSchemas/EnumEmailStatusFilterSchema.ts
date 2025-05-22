import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailStatusSchema } from './EmailStatusSchema';
import { NestedEnumEmailStatusFilterSchema } from './NestedEnumEmailStatusFilterSchema';

export const EnumEmailStatusFilterSchema: z.ZodType<Prisma.EnumEmailStatusFilter> = z.object({
  equals: z.lazy(() => EmailStatusSchema).optional(),
  in: z.lazy(() => EmailStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailStatusSchema),z.lazy(() => NestedEnumEmailStatusFilterSchema) ]).optional(),
}).strict();

export default EnumEmailStatusFilterSchema;
