import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProfileCreateinterestsInputSchema: z.ZodType<Prisma.ProfileCreateinterestsInput> = z.object({
  set: z.string().array()
}).strict();

export default ProfileCreateinterestsInputSchema;
