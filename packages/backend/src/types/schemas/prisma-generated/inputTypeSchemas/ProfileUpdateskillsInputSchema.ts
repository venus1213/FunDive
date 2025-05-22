import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProfileUpdateskillsInputSchema: z.ZodType<Prisma.ProfileUpdateskillsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default ProfileUpdateskillsInputSchema;
