import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const NotificationSettingUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationSettingUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  emailEnabled: z.boolean().optional(),
  directMessageEnabled: z.boolean().optional(),
  projectMessageEnabled: z.boolean().optional(),
  mentionEnabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default NotificationSettingUncheckedCreateWithoutUserInputSchema;
