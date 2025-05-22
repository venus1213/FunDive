import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvitationCodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationCodeSumOrderByAggregateInput> = z.object({
  maxUses: z.lazy(() => SortOrderSchema).optional(),
  currentUses: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default InvitationCodeSumOrderByAggregateInputSchema;
