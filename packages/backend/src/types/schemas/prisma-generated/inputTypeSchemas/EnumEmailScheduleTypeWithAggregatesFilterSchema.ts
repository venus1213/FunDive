import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { NestedEnumEmailScheduleTypeWithAggregatesFilterSchema } from './NestedEnumEmailScheduleTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailScheduleTypeFilterSchema } from './NestedEnumEmailScheduleTypeFilterSchema';

export const EnumEmailScheduleTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmailScheduleTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailScheduleTypeSchema).optional(),
  in: z.lazy(() => EmailScheduleTypeSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleTypeSchema),z.lazy(() => NestedEnumEmailScheduleTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailScheduleTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailScheduleTypeFilterSchema).optional()
}).strict();

export default EnumEmailScheduleTypeWithAggregatesFilterSchema;
