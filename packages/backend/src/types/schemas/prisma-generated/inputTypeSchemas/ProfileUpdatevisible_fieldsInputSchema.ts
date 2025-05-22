import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProfileUpdatevisible_fieldsInputSchema: z.ZodType<Prisma.ProfileUpdatevisible_fieldsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default ProfileUpdatevisible_fieldsInputSchema;
