import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutReceiverInputSchema } from './MessageCreateWithoutReceiverInputSchema';
import { MessageUncheckedCreateWithoutReceiverInputSchema } from './MessageUncheckedCreateWithoutReceiverInputSchema';
import { MessageCreateOrConnectWithoutReceiverInputSchema } from './MessageCreateOrConnectWithoutReceiverInputSchema';
import { MessageCreateManyReceiverInputEnvelopeSchema } from './MessageCreateManyReceiverInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageUncheckedCreateNestedManyWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutReceiverInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedCreateNestedManyWithoutReceiverInputSchema;
