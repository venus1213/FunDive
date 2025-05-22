import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionCreateWithoutPaymentInputSchema } from './TransactionCreateWithoutPaymentInputSchema';
import { TransactionUncheckedCreateWithoutPaymentInputSchema } from './TransactionUncheckedCreateWithoutPaymentInputSchema';

export const TransactionCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export default TransactionCreateOrConnectWithoutPaymentInputSchema;
