import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateManyProjectInputSchema } from './MessageCreateManyProjectInputSchema';

export const MessageCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyProjectInputSchema),z.lazy(() => MessageCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MessageCreateManyProjectInputEnvelopeSchema;
