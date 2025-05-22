import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutCreatedInvitationsInputSchema } from './UserCreateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedCreateWithoutCreatedInvitationsInputSchema } from './UserUncheckedCreateWithoutCreatedInvitationsInputSchema';

export const UserCreateOrConnectWithoutCreatedInvitationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedInvitationsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutCreatedInvitationsInputSchema;
