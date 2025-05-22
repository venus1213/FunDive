import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const NestedEnumEmailScheduleExecutionStatusFilterSchema: z.ZodType<Prisma.NestedEnumEmailScheduleExecutionStatusFilter> = z.object({
  equals: z.lazy(() => EmailScheduleExecutionStatusSchema).optional(),
  in: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => NestedEnumEmailScheduleExecutionStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumEmailScheduleExecutionStatusFilterSchema;
