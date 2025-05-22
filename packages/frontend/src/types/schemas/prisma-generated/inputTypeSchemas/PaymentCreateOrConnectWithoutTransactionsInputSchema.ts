import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentCreateWithoutTransactionsInputSchema } from './PaymentCreateWithoutTransactionsInputSchema';
import { PaymentUncheckedCreateWithoutTransactionsInputSchema } from './PaymentUncheckedCreateWithoutTransactionsInputSchema';

export const PaymentCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export default PaymentCreateOrConnectWithoutTransactionsInputSchema;
