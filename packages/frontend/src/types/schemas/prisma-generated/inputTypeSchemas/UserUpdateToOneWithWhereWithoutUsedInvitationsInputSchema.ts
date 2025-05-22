import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutUsedInvitationsInputSchema } from './UserUpdateWithoutUsedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutUsedInvitationsInputSchema } from './UserUncheckedUpdateWithoutUsedInvitationsInputSchema';

export const UserUpdateToOneWithWhereWithoutUsedInvitationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUsedInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsedInvitationsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutUsedInvitationsInputSchema;
