import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleIncludeSchema } from '../inputTypeSchemas/ArticleIncludeSchema'
import { ArticleWhereUniqueInputSchema } from '../inputTypeSchemas/ArticleWhereUniqueInputSchema'
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

export const ArticleFindUniqueArgsSchema: z.ZodType<Prisma.ArticleFindUniqueArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export default ArticleFindUniqueArgsSchema;
