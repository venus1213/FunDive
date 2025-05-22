import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProfileCreateskillsInputSchema: z.ZodType<Prisma.ProfileCreateskillsInput> = z.object({
  set: z.string().array()
}).strict();

export default ProfileCreateskillsInputSchema;
