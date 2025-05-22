import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { InvitationCodeCountOrderByAggregateInputSchema } from './InvitationCodeCountOrderByAggregateInputSchema';
import { InvitationCodeAvgOrderByAggregateInputSchema } from './InvitationCodeAvgOrderByAggregateInputSchema';
import { InvitationCodeMaxOrderByAggregateInputSchema } from './InvitationCodeMaxOrderByAggregateInputSchema';
import { InvitationCodeMinOrderByAggregateInputSchema } from './InvitationCodeMinOrderByAggregateInputSchema';
import { InvitationCodeSumOrderByAggregateInputSchema } from './InvitationCodeSumOrderByAggregateInputSchema';

export const InvitationCodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationCodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  maxUses: z.lazy(() => SortOrderSchema).optional(),
  currentUses: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvitationCodeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvitationCodeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationCodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationCodeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvitationCodeSumOrderByAggregateInputSchema).optional()
}).strict();

export default InvitationCodeOrderByWithAggregationInputSchema;
