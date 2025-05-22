import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';
import { TransactionUpdateManyMutationInputSchema } from './TransactionUpdateManyMutationInputSchema';
import { TransactionUncheckedUpdateManyWithoutPaymentInputSchema } from './TransactionUncheckedUpdateManyWithoutPaymentInputSchema';

export const TransactionUpdateManyWithWhereWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutPaymentInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutPaymentInputSchema) ]),
}).strict();

export default TransactionUpdateManyWithWhereWithoutPaymentInputSchema;
