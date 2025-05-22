import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutProjectInputSchema } from './MessageUpdateWithoutProjectInputSchema';
import { MessageUncheckedUpdateWithoutProjectInputSchema } from './MessageUncheckedUpdateWithoutProjectInputSchema';

export const MessageUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutProjectInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutProjectInputSchema;
