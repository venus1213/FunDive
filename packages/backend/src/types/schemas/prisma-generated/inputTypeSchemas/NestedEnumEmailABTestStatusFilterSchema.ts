import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';

export const NestedEnumEmailABTestStatusFilterSchema: z.ZodType<Prisma.NestedEnumEmailABTestStatusFilter> = z.object({
  equals: z.lazy(() => EmailABTestStatusSchema).optional(),
  in: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailABTestStatusSchema),z.lazy(() => NestedEnumEmailABTestStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumEmailABTestStatusFilterSchema;
