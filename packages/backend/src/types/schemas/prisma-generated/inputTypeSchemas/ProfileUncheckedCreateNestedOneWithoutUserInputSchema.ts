import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';
import { ProfileCreateOrConnectWithoutUserInputSchema } from './ProfileCreateOrConnectWithoutUserInputSchema';
import { ProfileWhereUniqueInputSchema } from './ProfileWhereUniqueInputSchema';

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export default ProfileUncheckedCreateNestedOneWithoutUserInputSchema;
