import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutReceiverInputSchema } from './MessageCreateWithoutReceiverInputSchema';
import { MessageUncheckedCreateWithoutReceiverInputSchema } from './MessageUncheckedCreateWithoutReceiverInputSchema';
import { MessageCreateOrConnectWithoutReceiverInputSchema } from './MessageCreateOrConnectWithoutReceiverInputSchema';
import { MessageUpsertWithWhereUniqueWithoutReceiverInputSchema } from './MessageUpsertWithWhereUniqueWithoutReceiverInputSchema';
import { MessageCreateManyReceiverInputEnvelopeSchema } from './MessageCreateManyReceiverInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutReceiverInputSchema } from './MessageUpdateWithWhereUniqueWithoutReceiverInputSchema';
import { MessageUpdateManyWithWhereWithoutReceiverInputSchema } from './MessageUpdateManyWithWhereWithoutReceiverInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutReceiverNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema;
