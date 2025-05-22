import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'
import { ProfileWhereUniqueInputSchema } from '../inputTypeSchemas/ProfileWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  displayName: z.boolean().optional(),
  bio: z.boolean().optional(),
  company: z.boolean().optional(),
  position: z.boolean().optional(),
  location: z.boolean().optional(),
  website: z.boolean().optional(),
  social_links: z.boolean().optional(),
  skills: z.boolean().optional(),
  interests: z.boolean().optional(),
  is_public: z.boolean().optional(),
  visible_fields: z.boolean().optional(),
  profile_image_url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export default ProfileFindUniqueOrThrowArgsSchema;
