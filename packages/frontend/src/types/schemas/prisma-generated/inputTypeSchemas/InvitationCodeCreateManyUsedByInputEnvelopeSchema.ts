import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateManyUsedByInputSchema } from './InvitationCodeCreateManyUsedByInputSchema';

export const InvitationCodeCreateManyUsedByInputEnvelopeSchema: z.ZodType<Prisma.InvitationCodeCreateManyUsedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCodeCreateManyUsedByInputSchema),z.lazy(() => InvitationCodeCreateManyUsedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default InvitationCodeCreateManyUsedByInputEnvelopeSchema;
