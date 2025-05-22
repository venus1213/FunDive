import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProjectArgsSchema } from "../outputTypeSchemas/ProjectArgsSchema"
import { MessageCountOutputTypeArgsSchema } from "../outputTypeSchemas/MessageCountOutputTypeArgsSchema"

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  senderId: z.boolean().optional(),
  receiverId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  content: z.boolean().optional(),
  isRead: z.boolean().optional(),
  messageType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  mentionedUsers: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  receiver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MessageSelectSchema;
