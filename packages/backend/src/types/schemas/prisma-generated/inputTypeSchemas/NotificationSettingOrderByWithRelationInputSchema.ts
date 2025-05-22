import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const NotificationSettingOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationSettingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  emailEnabled: z.lazy(() => SortOrderSchema).optional(),
  directMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  projectMessageEnabled: z.lazy(() => SortOrderSchema).optional(),
  mentionEnabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export default NotificationSettingOrderByWithRelationInputSchema;
