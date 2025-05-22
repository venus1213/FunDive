import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProjectIncludeSchema } from '../inputTypeSchemas/ProjectIncludeSchema'
import { ProjectWhereInputSchema } from '../inputTypeSchemas/ProjectWhereInputSchema'
import { ProjectOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProjectOrderByWithRelationInputSchema'
import { ProjectWhereUniqueInputSchema } from '../inputTypeSchemas/ProjectWhereUniqueInputSchema'
import { ProjectScalarFieldEnumSchema } from '../inputTypeSchemas/ProjectScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { BookmarkFindManyArgsSchema } from "../outputTypeSchemas/BookmarkFindManyArgsSchema"
import { ReportFindManyArgsSchema } from "../outputTypeSchemas/ReportFindManyArgsSchema"
import { ProjectCountOutputTypeArgsSchema } from "../outputTypeSchemas/ProjectCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  category: z.boolean().optional(),
  projectType: z.boolean().optional(),
  status: z.boolean().optional(),
  investmentAmount: z.boolean().optional(),
  location: z.boolean().optional(),
  projectStage: z.boolean().optional(),
  popularityScore: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  reports: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ProjectFindFirstOrThrowArgsSchema;
