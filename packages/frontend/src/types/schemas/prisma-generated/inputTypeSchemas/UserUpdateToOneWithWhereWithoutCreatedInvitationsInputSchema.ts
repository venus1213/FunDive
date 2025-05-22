import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutCreatedInvitationsInputSchema } from './UserUpdateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedUpdateWithoutCreatedInvitationsInputSchema } from './UserUncheckedUpdateWithoutCreatedInvitationsInputSchema';

export const UserUpdateToOneWithWhereWithoutCreatedInvitationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedInvitationsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutCreatedInvitationsInputSchema;
