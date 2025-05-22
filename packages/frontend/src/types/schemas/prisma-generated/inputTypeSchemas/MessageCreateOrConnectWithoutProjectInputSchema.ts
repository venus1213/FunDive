import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutProjectInputSchema } from './MessageCreateWithoutProjectInputSchema';
import { MessageUncheckedCreateWithoutProjectInputSchema } from './MessageUncheckedCreateWithoutProjectInputSchema';

export const MessageCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutProjectInputSchema;
