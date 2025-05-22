import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutReceiverInputSchema } from './MessageUncheckedUpdateManyWithoutReceiverInputSchema';

export const MessageUpdateManyWithWhereWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutReceiverInputSchema;
