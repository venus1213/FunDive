import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutMentionedInMessagesInputSchema } from './UserCreateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedCreateWithoutMentionedInMessagesInputSchema } from './UserUncheckedCreateWithoutMentionedInMessagesInputSchema';
import { UserCreateOrConnectWithoutMentionedInMessagesInputSchema } from './UserCreateOrConnectWithoutMentionedInMessagesInputSchema';
import { UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema } from './UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema } from './UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema';
import { UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema } from './UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';

export const UserUncheckedUpdateManyWithoutMentionedInMessagesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutMentionedInMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutMentionedInMessagesInputSchema),z.lazy(() => UserCreateOrConnectWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserUncheckedUpdateManyWithoutMentionedInMessagesNestedInputSchema;
