import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUsedInvitationsInputSchema } from './UserCreateWithoutUsedInvitationsInputSchema';
import { UserUncheckedCreateWithoutUsedInvitationsInputSchema } from './UserUncheckedCreateWithoutUsedInvitationsInputSchema';
import { UserCreateOrConnectWithoutUsedInvitationsInputSchema } from './UserCreateOrConnectWithoutUsedInvitationsInputSchema';
import { UserUpsertWithoutUsedInvitationsInputSchema } from './UserUpsertWithoutUsedInvitationsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutUsedInvitationsInputSchema } from './UserUpdateToOneWithWhereWithoutUsedInvitationsInputSchema';
import { UserUpdateWithoutUsedInvitationsInputSchema } from './UserUpdateWithoutUsedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutUsedInvitationsInputSchema } from './UserUncheckedUpdateWithoutUsedInvitationsInputSchema';

export const UserUpdateOneWithoutUsedInvitationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutUsedInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsedInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUsedInvitationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUsedInvitationsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUsedInvitationsInputSchema),z.lazy(() => UserUpdateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsedInvitationsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutUsedInvitationsNestedInputSchema;
