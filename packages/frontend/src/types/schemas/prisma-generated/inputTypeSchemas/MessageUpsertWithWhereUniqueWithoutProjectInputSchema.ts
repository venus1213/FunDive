import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutProjectInputSchema } from './MessageUpdateWithoutProjectInputSchema';
import { MessageUncheckedUpdateWithoutProjectInputSchema } from './MessageUncheckedUpdateWithoutProjectInputSchema';
import { MessageCreateWithoutProjectInputSchema } from './MessageCreateWithoutProjectInputSchema';
import { MessageUncheckedCreateWithoutProjectInputSchema } from './MessageUncheckedCreateWithoutProjectInputSchema';

export const MessageUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutProjectInputSchema;
