import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleStatusSchema } from './ArticleStatusSchema';
import { ArticleCreatetagsInputSchema } from './ArticleCreatetagsInputSchema';

export const ArticleUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnail: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  status: z.lazy(() => ArticleStatusSchema).optional(),
  tags: z.union([ z.lazy(() => ArticleCreatetagsInputSchema),z.string().array() ]).optional(),
}).strict();

export default ArticleUncheckedCreateWithoutAuthorInputSchema;
