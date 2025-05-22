import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutCreatedInvitationsInputSchema } from './UserCreateWithoutCreatedInvitationsInputSchema';
import { UserUncheckedCreateWithoutCreatedInvitationsInputSchema } from './UserUncheckedCreateWithoutCreatedInvitationsInputSchema';
import { UserCreateOrConnectWithoutCreatedInvitationsInputSchema } from './UserCreateOrConnectWithoutCreatedInvitationsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutCreatedInvitationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutCreatedInvitationsInputSchema;
