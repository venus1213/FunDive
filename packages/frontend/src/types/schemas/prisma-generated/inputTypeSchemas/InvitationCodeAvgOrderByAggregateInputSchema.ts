import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvitationCodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationCodeAvgOrderByAggregateInput> = z.object({
  maxUses: z.lazy(() => SortOrderSchema).optional(),
  currentUses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default InvitationCodeAvgOrderByAggregateInputSchema;
