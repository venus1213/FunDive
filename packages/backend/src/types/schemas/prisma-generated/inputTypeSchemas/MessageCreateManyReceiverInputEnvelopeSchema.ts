import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateManyReceiverInputSchema } from './MessageCreateManyReceiverInputSchema';

export const MessageCreateManyReceiverInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyReceiverInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyReceiverInputSchema),z.lazy(() => MessageCreateManyReceiverInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MessageCreateManyReceiverInputEnvelopeSchema;
