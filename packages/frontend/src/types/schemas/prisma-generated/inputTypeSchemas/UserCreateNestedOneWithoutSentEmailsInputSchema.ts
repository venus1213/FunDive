import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSentEmailsInputSchema } from './UserCreateWithoutSentEmailsInputSchema';
import { UserUncheckedCreateWithoutSentEmailsInputSchema } from './UserUncheckedCreateWithoutSentEmailsInputSchema';
import { UserCreateOrConnectWithoutSentEmailsInputSchema } from './UserCreateOrConnectWithoutSentEmailsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSentEmailsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSentEmailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentEmailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutSentEmailsInputSchema;
