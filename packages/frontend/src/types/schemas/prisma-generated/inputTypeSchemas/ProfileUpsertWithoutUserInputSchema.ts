import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProfileUpdateWithoutUserInputSchema } from './ProfileUpdateWithoutUserInputSchema';
import { ProfileUncheckedUpdateWithoutUserInputSchema } from './ProfileUncheckedUpdateWithoutUserInputSchema';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export default ProfileUpsertWithoutUserInputSchema;
