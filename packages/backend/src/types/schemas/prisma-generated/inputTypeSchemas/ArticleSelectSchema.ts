import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

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

export default ArticleSelectSchema;
