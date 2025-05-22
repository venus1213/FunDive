import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSentEmailsInputSchema } from './UserCreateWithoutSentEmailsInputSchema';
import { UserUncheckedCreateWithoutSentEmailsInputSchema } from './UserUncheckedCreateWithoutSentEmailsInputSchema';
import { UserCreateOrConnectWithoutSentEmailsInputSchema } from './UserCreateOrConnectWithoutSentEmailsInputSchema';
import { UserUpsertWithoutSentEmailsInputSchema } from './UserUpsertWithoutSentEmailsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSentEmailsInputSchema } from './UserUpdateToOneWithWhereWithoutSentEmailsInputSchema';
import { UserUpdateWithoutSentEmailsInputSchema } from './UserUpdateWithoutSentEmailsInputSchema';
import { UserUncheckedUpdateWithoutSentEmailsInputSchema } from './UserUncheckedUpdateWithoutSentEmailsInputSchema';

export const UserUpdateOneRequiredWithoutSentEmailsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSentEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentEmailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSentEmailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSentEmailsInputSchema),z.lazy(() => UserUpdateWithoutSentEmailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentEmailsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSentEmailsNestedInputSchema;
