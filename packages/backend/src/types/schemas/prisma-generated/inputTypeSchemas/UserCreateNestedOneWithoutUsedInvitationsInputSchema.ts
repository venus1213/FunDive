import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUsedInvitationsInputSchema } from './UserCreateWithoutUsedInvitationsInputSchema';
import { UserUncheckedCreateWithoutUsedInvitationsInputSchema } from './UserUncheckedCreateWithoutUsedInvitationsInputSchema';
import { UserCreateOrConnectWithoutUsedInvitationsInputSchema } from './UserCreateOrConnectWithoutUsedInvitationsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutUsedInvitationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUsedInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUsedInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsedInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUsedInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutUsedInvitationsInputSchema;
