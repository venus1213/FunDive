import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ArticleCountOrderByAggregateInputSchema } from './ArticleCountOrderByAggregateInputSchema';
import { ArticleMaxOrderByAggregateInputSchema } from './ArticleMaxOrderByAggregateInputSchema';
import { ArticleMinOrderByAggregateInputSchema } from './ArticleMinOrderByAggregateInputSchema';

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export default ArticleOrderByWithAggregationInputSchema;
