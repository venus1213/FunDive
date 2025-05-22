import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutUsedInvitationsInputSchema } from './UserCreateWithoutUsedInvitationsInputSchema';
import { UserUncheckedCreateWithoutUsedInvitationsInputSchema } from './UserUncheckedCreateWithoutUsedInvitationsInputSchema';

export const UserCreateOrConnectWithoutUsedInvitationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUsedInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsedInvitationsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutUsedInvitationsInputSchema;
