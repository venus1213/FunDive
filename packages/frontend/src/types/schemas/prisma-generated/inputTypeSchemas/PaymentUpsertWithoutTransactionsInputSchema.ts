import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentUpdateWithoutTransactionsInputSchema } from './PaymentUpdateWithoutTransactionsInputSchema';
import { PaymentUncheckedUpdateWithoutTransactionsInputSchema } from './PaymentUncheckedUpdateWithoutTransactionsInputSchema';
import { PaymentCreateWithoutTransactionsInputSchema } from './PaymentCreateWithoutTransactionsInputSchema';
import { PaymentUncheckedCreateWithoutTransactionsInputSchema } from './PaymentUncheckedCreateWithoutTransactionsInputSchema';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';

export const PaymentUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.PaymentUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => PaymentUpdateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export default PaymentUpsertWithoutTransactionsInputSchema;
