import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutProjectInputSchema } from './MessageCreateWithoutProjectInputSchema';
import { MessageUncheckedCreateWithoutProjectInputSchema } from './MessageUncheckedCreateWithoutProjectInputSchema';
import { MessageCreateOrConnectWithoutProjectInputSchema } from './MessageCreateOrConnectWithoutProjectInputSchema';
import { MessageCreateManyProjectInputEnvelopeSchema } from './MessageCreateManyProjectInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutProjectInputSchema),z.lazy(() => MessageCreateWithoutProjectInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutProjectInputSchema),z.lazy(() => MessageCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedCreateNestedManyWithoutProjectInputSchema;
