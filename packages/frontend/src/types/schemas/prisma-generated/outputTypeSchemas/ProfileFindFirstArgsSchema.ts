import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'
import { ProfileWhereInputSchema } from '../inputTypeSchemas/ProfileWhereInputSchema'
import { ProfileOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProfileOrderByWithRelationInputSchema'
import { ProfileWhereUniqueInputSchema } from '../inputTypeSchemas/ProfileWhereUniqueInputSchema'
import { ProfileScalarFieldEnumSchema } from '../inputTypeSchemas/ProfileScalarFieldEnumSchema'
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

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ProfileFindFirstArgsSchema;
