import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutSentEmailsInputSchema } from './UserCreateWithoutSentEmailsInputSchema';
import { UserUncheckedCreateWithoutSentEmailsInputSchema } from './UserUncheckedCreateWithoutSentEmailsInputSchema';

export const UserCreateOrConnectWithoutSentEmailsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSentEmailsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentEmailsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutSentEmailsInputSchema;
