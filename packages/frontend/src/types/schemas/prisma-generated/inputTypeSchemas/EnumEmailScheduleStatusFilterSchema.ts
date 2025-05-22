import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { NestedEnumEmailScheduleStatusFilterSchema } from './NestedEnumEmailScheduleStatusFilterSchema';

export const EnumEmailScheduleStatusFilterSchema: z.ZodType<Prisma.EnumEmailScheduleStatusFilter> = z.object({
  equals: z.lazy(() => EmailScheduleStatusSchema).optional(),
  in: z.lazy(() => EmailScheduleStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleStatusSchema),z.lazy(() => NestedEnumEmailScheduleStatusFilterSchema) ]).optional(),
}).strict();

export default EnumEmailScheduleStatusFilterSchema;
