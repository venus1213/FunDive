import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutMentionedUsersInputSchema } from './MessageCreateWithoutMentionedUsersInputSchema';
import { MessageUncheckedCreateWithoutMentionedUsersInputSchema } from './MessageUncheckedCreateWithoutMentionedUsersInputSchema';
import { MessageCreateOrConnectWithoutMentionedUsersInputSchema } from './MessageCreateOrConnectWithoutMentionedUsersInputSchema';
import { MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema } from './MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema } from './MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema';
import { MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema } from './MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUpdateManyWithoutMentionedUsersNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutMentionedUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutMentionedUsersInputSchema),z.lazy(() => MessageCreateOrConnectWithoutMentionedUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUpdateManyWithoutMentionedUsersNestedInputSchema;
