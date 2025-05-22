import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutReceiverInputSchema } from './MessageUpdateWithoutReceiverInputSchema';
import { MessageUncheckedUpdateWithoutReceiverInputSchema } from './MessageUncheckedUpdateWithoutReceiverInputSchema';

export const MessageUpdateWithWhereUniqueWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutReceiverInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutReceiverInputSchema;
