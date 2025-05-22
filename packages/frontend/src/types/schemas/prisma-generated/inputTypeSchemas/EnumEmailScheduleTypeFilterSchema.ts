import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { NestedEnumEmailScheduleTypeFilterSchema } from './NestedEnumEmailScheduleTypeFilterSchema';

export const EnumEmailScheduleTypeFilterSchema: z.ZodType<Prisma.EnumEmailScheduleTypeFilter> = z.object({
  equals: z.lazy(() => EmailScheduleTypeSchema).optional(),
  in: z.lazy(() => EmailScheduleTypeSchema).array().optional(),
  notIn: z.lazy(() => EmailScheduleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailScheduleTypeSchema),z.lazy(() => NestedEnumEmailScheduleTypeFilterSchema) ]).optional(),
}).strict();

export default EnumEmailScheduleTypeFilterSchema;
