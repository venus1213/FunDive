import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = z.object({
  investmentAmount: z.lazy(() => SortOrderSchema).optional(),
  popularityScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProjectSumOrderByAggregateInputSchema;
