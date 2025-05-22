import { z } from 'zod';
import { ArticleStatusSchema } from '../inputTypeSchemas/ArticleStatusSchema'

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  status: ArticleStatusSchema,
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnail: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  authorId: z.string(),
  tags: z.string().array(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema;
