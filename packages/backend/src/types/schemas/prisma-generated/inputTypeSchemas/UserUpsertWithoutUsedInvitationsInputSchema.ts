import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutUsedInvitationsInputSchema } from './UserUpdateWithoutUsedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutUsedInvitationsInputSchema } from './UserUncheckedUpdateWithoutUsedInvitationsInputSchema';
import { UserCreateWithoutUsedInvitationsInputSchema } from './UserCreateWithoutUsedInvitationsInputSchema';
import { UserUncheckedCreateWithoutUsedInvitationsInputSchema } from './UserUncheckedCreateWithoutUsedInvitationsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutUsedInvitationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUsedInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsedInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsedInvitationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutUsedInvitationsInputSchema;
