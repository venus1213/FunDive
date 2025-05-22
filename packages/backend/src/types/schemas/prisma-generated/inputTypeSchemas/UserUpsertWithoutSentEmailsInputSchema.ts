import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSentEmailsInputSchema } from './UserUpdateWithoutSentEmailsInputSchema';
import { UserUncheckedUpdateWithoutSentEmailsInputSchema } from './UserUncheckedUpdateWithoutSentEmailsInputSchema';
import { UserCreateWithoutSentEmailsInputSchema } from './UserCreateWithoutSentEmailsInputSchema';
import { UserUncheckedCreateWithoutSentEmailsInputSchema } from './UserUncheckedCreateWithoutSentEmailsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSentEmailsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSentEmailsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentEmailsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSentEmailsInputSchema;
