import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutCreatedInvitationsInputSchema } from './UserCreateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedCreateWithoutCreatedInvitationsInputSchema } from './UserUncheckedCreateWithoutCreatedInvitationsInputSchema';
import { UserCreateOrConnectWithoutCreatedInvitationsInputSchema } from './UserCreateOrConnectWithoutCreatedInvitationsInputSchema';
import { UserUpsertWithoutCreatedInvitationsInputSchema } from './UserUpsertWithoutCreatedInvitationsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutCreatedInvitationsInputSchema } from './UserUpdateToOneWithWhereWithoutCreatedInvitationsInputSchema';
import { UserUpdateWithoutCreatedInvitationsInputSchema } from './UserUpdateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutCreatedInvitationsInputSchema } from './UserUncheckedUpdateWithoutCreatedInvitationsInputSchema';

export const UserUpdateOneRequiredWithoutCreatedInvitationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedInvitationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUpdateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedInvitationsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutCreatedInvitationsNestedInputSchema;
