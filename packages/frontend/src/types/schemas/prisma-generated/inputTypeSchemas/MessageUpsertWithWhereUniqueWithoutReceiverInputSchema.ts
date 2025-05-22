import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutReceiverInputSchema } from './MessageUpdateWithoutReceiverInputSchema';
import { MessageUncheckedUpdateWithoutReceiverInputSchema } from './MessageUncheckedUpdateWithoutReceiverInputSchema';
import { MessageCreateWithoutReceiverInputSchema } from './MessageCreateWithoutReceiverInputSchema';
import { MessageUncheckedCreateWithoutReceiverInputSchema } from './MessageUncheckedCreateWithoutReceiverInputSchema';

export const MessageUpsertWithWhereUniqueWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutReceiverInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutReceiverInputSchema;
