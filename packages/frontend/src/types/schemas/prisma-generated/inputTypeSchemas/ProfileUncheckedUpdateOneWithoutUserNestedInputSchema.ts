import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';
import { ProfileCreateOrConnectWithoutUserInputSchema } from './ProfileCreateOrConnectWithoutUserInputSchema';
import { ProfileUpsertWithoutUserInputSchema } from './ProfileUpsertWithoutUserInputSchema';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { ProfileWhereUniqueInputSchema } from './ProfileWhereUniqueInputSchema';
import { ProfileUpdateToOneWithWhereWithoutUserInputSchema } from './ProfileUpdateToOneWithWhereWithoutUserInputSchema';
import { ProfileUpdateWithoutUserInputSchema } from './ProfileUpdateWithoutUserInputSchema';
import { ProfileUncheckedUpdateWithoutUserInputSchema } from './ProfileUncheckedUpdateWithoutUserInputSchema';

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export default ProfileUncheckedUpdateOneWithoutUserNestedInputSchema;
