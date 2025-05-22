import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationTypeSchema } from './NotificationTypeSchema';
import { NestedEnumNotificationTypeWithAggregatesFilterSchema } from './NestedEnumNotificationTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumNotificationTypeFilterSchema } from './NestedEnumNotificationTypeFilterSchema';

export const EnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema),z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional()
}).strict();

export default EnumNotificationTypeWithAggregatesFilterSchema;
