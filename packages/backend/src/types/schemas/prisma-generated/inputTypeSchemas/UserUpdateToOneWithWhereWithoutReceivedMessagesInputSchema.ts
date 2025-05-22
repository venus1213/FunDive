import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutReceivedMessagesInputSchema } from './UserUpdateWithoutReceivedMessagesInputSchema';
import { UserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateWithoutReceivedMessagesInputSchema';

export const UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema;
