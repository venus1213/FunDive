import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { NestedEnumEmailScheduleStatusWithAggregatesFilterSchema } from './NestedEnumEmailScheduleStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailScheduleStatusFilterSchema } from './NestedEnumEmailScheduleStatusFilterSchema';

export const EnumEmailScheduleStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmailScheduleStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailScheduleStatusSchema).optional(),
  in: z.lazy(() => EmailScheduleStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleStatusSchema),z.lazy(() => NestedEnumEmailScheduleStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailScheduleStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailScheduleStatusFilterSchema).optional()
}).strict();

export default EnumEmailScheduleStatusWithAggregatesFilterSchema;
