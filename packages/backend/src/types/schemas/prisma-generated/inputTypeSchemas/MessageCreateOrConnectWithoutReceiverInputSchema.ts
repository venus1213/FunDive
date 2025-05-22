import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutReceiverInputSchema } from './MessageCreateWithoutReceiverInputSchema';
import { MessageUncheckedCreateWithoutReceiverInputSchema } from './MessageUncheckedCreateWithoutReceiverInputSchema';

export const MessageCreateOrConnectWithoutReceiverInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutReceiverInputSchema;
