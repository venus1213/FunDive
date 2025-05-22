import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleIncludeSchema } from '../inputTypeSchemas/ArticleIncludeSchema'
import { ArticleWhereInputSchema } from '../inputTypeSchemas/ArticleWhereInputSchema'
import { ArticleOrderByWithRelationInputSchema } from '../inputTypeSchemas/ArticleOrderByWithRelationInputSchema'
import { ArticleWhereUniqueInputSchema } from '../inputTypeSchemas/ArticleWhereUniqueInputSchema'
import { ArticleScalarFieldEnumSchema } from '../inputTypeSchemas/ArticleScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  content: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  publishedAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  status: z.boolean().optional(),
  tags: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindFirstOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ArticleFindFirstOrThrowArgsSchema;
