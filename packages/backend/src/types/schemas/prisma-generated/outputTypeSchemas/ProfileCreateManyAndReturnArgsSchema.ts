import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileCreateManyInputSchema } from '../inputTypeSchemas/ProfileCreateManyInputSchema'

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ProfileCreateManyAndReturnArgsSchema;
