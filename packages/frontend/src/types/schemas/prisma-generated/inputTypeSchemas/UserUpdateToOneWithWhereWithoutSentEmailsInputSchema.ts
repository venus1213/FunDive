import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSentEmailsInputSchema } from './UserUpdateWithoutSentEmailsInputSchema';
import { UserUncheckedUpdateWithoutSentEmailsInputSchema } from './UserUncheckedUpdateWithoutSentEmailsInputSchema';

export const UserUpdateToOneWithWhereWithoutSentEmailsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSentEmailsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentEmailsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSentEmailsInputSchema;
