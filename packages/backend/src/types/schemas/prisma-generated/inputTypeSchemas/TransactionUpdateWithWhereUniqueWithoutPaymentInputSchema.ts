import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutPaymentInputSchema } from './TransactionUpdateWithoutPaymentInputSchema';
import { TransactionUncheckedUpdateWithoutPaymentInputSchema } from './TransactionUncheckedUpdateWithoutPaymentInputSchema';

export const TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutPaymentInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutPaymentInputSchema) ]),
}).strict();

export default TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema;
