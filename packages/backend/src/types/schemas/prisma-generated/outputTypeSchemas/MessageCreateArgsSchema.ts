import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageIncludeSchema } from '../inputTypeSchemas/MessageIncludeSchema'
import { MessageCreateInputSchema } from '../inputTypeSchemas/MessageCreateInputSchema'
import { MessageUncheckedCreateInputSchema } from '../inputTypeSchemas/MessageUncheckedCreateInputSchema'
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProjectArgsSchema } from "../outputTypeSchemas/ProjectArgsSchema"
import { MessageCountOutputTypeArgsSchema } from "../outputTypeSchemas/MessageCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export default MessageCreateArgsSchema;
