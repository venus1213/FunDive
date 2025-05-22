import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutPaymentsInputSchema } from './UserUpdateWithoutPaymentsInputSchema';
import { UserUncheckedUpdateWithoutPaymentsInputSchema } from './UserUncheckedUpdateWithoutPaymentsInputSchema';

export const UserUpdateToOneWithWhereWithoutPaymentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPaymentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPaymentsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutPaymentsInputSchema;
