import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const NotificationSettingCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationSettingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  emailEnabled: z.lazy(() => SortOrderSchema).optional(),
  directMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  projectMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  mentionEnabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default NotificationSettingCountOrderByAggregateInputSchema;
