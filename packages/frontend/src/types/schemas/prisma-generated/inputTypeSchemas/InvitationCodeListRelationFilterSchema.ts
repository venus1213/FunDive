import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereInputSchema } from './InvitationCodeWhereInputSchema';

export const InvitationCodeListRelationFilterSchema: z.ZodType<Prisma.InvitationCodeListRelationFilter> = z.object({
  every: z.lazy(() => InvitationCodeWhereInputSchema).optional(),
  some: z.lazy(() => InvitationCodeWhereInputSchema).optional(),
  none: z.lazy(() => InvitationCodeWhereInputSchema).optional()
}).strict();

export default InvitationCodeListRelationFilterSchema;
