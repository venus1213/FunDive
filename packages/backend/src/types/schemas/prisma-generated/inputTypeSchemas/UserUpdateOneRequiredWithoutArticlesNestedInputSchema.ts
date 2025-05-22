import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutArticlesInputSchema } from './UserCreateWithoutArticlesInputSchema';
import { UserUncheckedCreateWithoutArticlesInputSchema } from './UserUncheckedCreateWithoutArticlesInputSchema';
import { UserCreateOrConnectWithoutArticlesInputSchema } from './UserCreateOrConnectWithoutArticlesInputSchema';
import { UserUpsertWithoutArticlesInputSchema } from './UserUpsertWithoutArticlesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutArticlesInputSchema } from './UserUpdateToOneWithWhereWithoutArticlesInputSchema';
import { UserUpdateWithoutArticlesInputSchema } from './UserUpdateWithoutArticlesInputSchema';
import { UserUncheckedUpdateWithoutArticlesInputSchema } from './UserUncheckedUpdateWithoutArticlesInputSchema';

export const UserUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutArticlesNestedInputSchema;
