import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProfileCreatevisible_fieldsInputSchema: z.ZodType<Prisma.ProfileCreatevisible_fieldsInput> = z.object({
  set: z.string().array()
}).strict();

export default ProfileCreatevisible_fieldsInputSchema;
