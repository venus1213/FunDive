import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutProjectInputSchema } from './MessageCreateWithoutProjectInputSchema';
import { MessageUncheckedCreateWithoutProjectInputSchema } from './MessageUncheckedCreateWithoutProjectInputSchema';
import { MessageCreateOrConnectWithoutProjectInputSchema } from './MessageCreateOrConnectWithoutProjectInputSchema';
import { MessageUpsertWithWhereUniqueWithoutProjectInputSchema } from './MessageUpsertWithWhereUniqueWithoutProjectInputSchema';
import { MessageCreateManyProjectInputEnvelopeSchema } from './MessageCreateManyProjectInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutProjectInputSchema } from './MessageUpdateWithWhereUniqueWithoutProjectInputSchema';
import { MessageUpdateManyWithWhereWithoutProjectInputSchema } from './MessageUpdateManyWithWhereWithoutProjectInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutProjectInputSchema),z.lazy(() => MessageCreateWithoutProjectInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => MessageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUpdateManyWithoutProjectNestedInputSchema;
