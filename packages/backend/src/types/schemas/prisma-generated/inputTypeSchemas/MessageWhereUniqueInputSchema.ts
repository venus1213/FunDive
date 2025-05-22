import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereInputSchema } from './MessageWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumMessageTypeFilterSchema } from './EnumMessageTypeFilterSchema';
import { MessageTypeSchema } from './MessageTypeSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProjectNullableRelationFilterSchema } from './ProjectNullableRelationFilterSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receiverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isRead: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  messageType: z.union([ z.lazy(() => EnumMessageTypeFilterSchema),z.lazy(() => MessageTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  mentionedUsers: z.lazy(() => UserListRelationFilterSchema).optional(),
  sender: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  receiver: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectNullableRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
}).strict());

export default MessageWhereUniqueInputSchema;
