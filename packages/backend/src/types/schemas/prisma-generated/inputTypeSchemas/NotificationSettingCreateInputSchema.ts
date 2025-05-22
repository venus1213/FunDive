import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutNotificationSettingInputSchema } from './UserCreateNestedOneWithoutNotificationSettingInputSchema';

export const NotificationSettingCreateInputSchema: z.ZodType<Prisma.NotificationSettingCreateInput> = z.object({
  id: z.string().optional(),
  emailEnabled: z.boolean().optional(),
  directMessageEnabled: z.boolean().optional(),
  projectMessageEnabled: z.boolean().optional(),
  mentionEnabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationSettingInputSchema)
}).strict();

export default NotificationSettingCreateInputSchema;
