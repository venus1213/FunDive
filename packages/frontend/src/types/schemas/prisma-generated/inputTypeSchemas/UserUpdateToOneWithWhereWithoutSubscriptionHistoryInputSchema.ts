import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSubscriptionHistoryInputSchema } from './UserUpdateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema';

export const UserUpdateToOneWithWhereWithoutSubscriptionHistoryInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionHistoryInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSubscriptionHistoryInputSchema;
