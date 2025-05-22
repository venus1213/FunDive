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
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProjectNullableScalarRelationFilterSchema } from './ProjectNullableScalarRelationFilterSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
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
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  receiver: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectNullableScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
}).strict());

export default MessageWhereUniqueInputSchema;
