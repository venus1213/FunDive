import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ProjectCountOrderByAggregateInputSchema } from './ProjectCountOrderByAggregateInputSchema';
import { ProjectAvgOrderByAggregateInputSchema } from './ProjectAvgOrderByAggregateInputSchema';
import { ProjectMaxOrderByAggregateInputSchema } from './ProjectMaxOrderByAggregateInputSchema';
import { ProjectMinOrderByAggregateInputSchema } from './ProjectMinOrderByAggregateInputSchema';
import { ProjectSumOrderByAggregateInputSchema } from './ProjectSumOrderByAggregateInputSchema';

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  projectType: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  investmentAmount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectStage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  popularityScore: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSumOrderByAggregateInputSchema).optional()
}).strict();

export default ProjectOrderByWithAggregationInputSchema;
