import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { NestedEnumEmailABTestStatusFilterSchema } from './NestedEnumEmailABTestStatusFilterSchema';

export const EnumEmailABTestStatusFilterSchema: z.ZodType<Prisma.EnumEmailABTestStatusFilter> = z.object({
  equals: z.lazy(() => EmailABTestStatusSchema).optional(),
  in: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailABTestStatusSchema),z.lazy(() => NestedEnumEmailABTestStatusFilterSchema) ]).optional(),
}).strict();

export default EnumEmailABTestStatusFilterSchema;
