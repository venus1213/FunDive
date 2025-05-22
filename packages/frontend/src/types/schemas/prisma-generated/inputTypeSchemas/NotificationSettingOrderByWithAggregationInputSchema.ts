import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { NotificationSettingCountOrderByAggregateInputSchema } from './NotificationSettingCountOrderByAggregateInputSchema';
import { NotificationSettingMaxOrderByAggregateInputSchema } from './NotificationSettingMaxOrderByAggregateInputSchema';
import { NotificationSettingMinOrderByAggregateInputSchema } from './NotificationSettingMinOrderByAggregateInputSchema';

export const NotificationSettingOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationSettingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  emailEnabled: z.lazy(() => SortOrderSchema).optional(),
  directMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  projectMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  mentionEnabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationSettingCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationSettingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationSettingMinOrderByAggregateInputSchema).optional()
}).strict();

export default NotificationSettingOrderByWithAggregationInputSchema;
