import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = z.object({
  investmentAmount: z.lazy(() => SortOrderSchema).optional(),
  popularityScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProjectAvgOrderByAggregateInputSchema;
