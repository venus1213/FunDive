import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleStatusSchema } from './ArticleStatusSchema';
import { ArticleCreatetagsInputSchema } from './ArticleCreatetagsInputSchema';

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnail: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  authorId: z.string(),
  status: z.lazy(() => ArticleStatusSchema).optional(),
  tags: z.union([ z.lazy(() => ArticleCreatetagsInputSchema),z.string().array() ]).optional(),
}).strict();

export default ArticleUncheckedCreateInputSchema;
