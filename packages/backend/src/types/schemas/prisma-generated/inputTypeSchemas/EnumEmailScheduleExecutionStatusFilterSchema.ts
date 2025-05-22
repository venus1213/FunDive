import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { NestedEnumEmailScheduleExecutionStatusFilterSchema } from './NestedEnumEmailScheduleExecutionStatusFilterSchema';

export const EnumEmailScheduleExecutionStatusFilterSchema: z.ZodType<Prisma.EnumEmailScheduleExecutionStatusFilter> = z.object({
  equals: z.lazy(() => EmailScheduleExecutionStatusSchema).optional(),
  in: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => NestedEnumEmailScheduleExecutionStatusFilterSchema) ]).optional(),
}).strict();

export default EnumEmailScheduleExecutionStatusFilterSchema;
