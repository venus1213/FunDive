import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const NotificationSettingUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationSettingUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  emailEnabled: z.boolean().optional(),
  directMessageEnabled: z.boolean().optional(),
  projectMessageEnabled: z.boolean().optional(),
  mentionEnabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default NotificationSettingUncheckedCreateInputSchema;
