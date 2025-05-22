import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateManyCreatedByInputSchema } from './InvitationCodeCreateManyCreatedByInputSchema';

export const InvitationCodeCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.InvitationCodeCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCodeCreateManyCreatedByInputSchema),z.lazy(() => InvitationCodeCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default InvitationCodeCreateManyCreatedByInputEnvelopeSchema;
