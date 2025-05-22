import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileCreateManyInputSchema } from '../inputTypeSchemas/ProfileCreateManyInputSchema'

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ProfileCreateManyArgsSchema;
