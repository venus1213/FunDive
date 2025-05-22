import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { ProfileUpdateWithoutUserInputSchema } from './ProfileUpdateWithoutUserInputSchema';
import { ProfileUncheckedUpdateWithoutUserInputSchema } from './ProfileUncheckedUpdateWithoutUserInputSchema';

export const ProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ProfileUpdateToOneWithWhereWithoutUserInputSchema;
