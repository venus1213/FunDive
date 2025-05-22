import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutProjectInputSchema } from './MessageUncheckedUpdateManyWithoutProjectInputSchema';

export const MessageUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutProjectInputSchema;
