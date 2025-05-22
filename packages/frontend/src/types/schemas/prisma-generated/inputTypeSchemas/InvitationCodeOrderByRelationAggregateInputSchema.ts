import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvitationCodeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationCodeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default InvitationCodeOrderByRelationAggregateInputSchema;
