import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutCreatedInvitationsInputSchema } from './UserUpdateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutCreatedInvitationsInputSchema } from './UserUncheckedUpdateWithoutCreatedInvitationsInputSchema';
import { UserCreateWithoutCreatedInvitationsInputSchema } from './UserCreateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedCreateWithoutCreatedInvitationsInputSchema } from './UserUncheckedCreateWithoutCreatedInvitationsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutCreatedInvitationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedInvitationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutCreatedInvitationsInputSchema;
