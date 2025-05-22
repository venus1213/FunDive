import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const MessageCountOutputTypeSelectSchema: z.ZodType<Prisma.MessageCountOutputTypeSelect> = z.object({
  mentionedUsers: z.boolean().optional(),
}).strict();

export default MessageCountOutputTypeSelectSchema;
