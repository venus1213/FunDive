import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutPaymentInputSchema } from './TransactionUpdateWithoutPaymentInputSchema';
import { TransactionUncheckedUpdateWithoutPaymentInputSchema } from './TransactionUncheckedUpdateWithoutPaymentInputSchema';
import { TransactionCreateWithoutPaymentInputSchema } from './TransactionCreateWithoutPaymentInputSchema';
import { TransactionUncheckedCreateWithoutPaymentInputSchema } from './TransactionUncheckedCreateWithoutPaymentInputSchema';

export const TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutPaymentInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export default TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema;
