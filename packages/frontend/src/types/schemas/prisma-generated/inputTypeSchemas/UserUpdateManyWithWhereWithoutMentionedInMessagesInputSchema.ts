import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutMentionedInMessagesInputSchema } from './UserUncheckedUpdateManyWithoutMentionedInMessagesInputSchema';

export const UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutMentionedInMessagesInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutMentionedInMessagesInputSchema) ]),
}).strict();

export default UserUpdateManyWithWhereWithoutMentionedInMessagesInputSchema;
