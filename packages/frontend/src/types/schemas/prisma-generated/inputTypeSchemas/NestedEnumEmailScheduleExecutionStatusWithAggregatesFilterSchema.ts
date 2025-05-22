import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailScheduleExecutionStatusFilterSchema } from './NestedEnumEmailScheduleExecutionStatusFilterSchema';

export const NestedEnumEmailScheduleExecutionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEmailScheduleExecutionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailScheduleExecutionStatusSchema).optional(),
  in: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleExecutionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => NestedEnumEmailScheduleExecutionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailScheduleExecutionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailScheduleExecutionStatusFilterSchema).optional()
}).strict();

export default NestedEnumEmailScheduleExecutionStatusWithAggregatesFilterSchema;
