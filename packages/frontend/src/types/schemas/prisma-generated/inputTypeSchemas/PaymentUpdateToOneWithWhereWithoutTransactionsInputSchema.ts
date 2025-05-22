import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';
import { PaymentUpdateWithoutTransactionsInputSchema } from './PaymentUpdateWithoutTransactionsInputSchema';
import { PaymentUncheckedUpdateWithoutTransactionsInputSchema } from './PaymentUncheckedUpdateWithoutTransactionsInputSchema';

export const PaymentUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.PaymentUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => PaymentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PaymentUpdateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export default PaymentUpdateToOneWithWhereWithoutTransactionsInputSchema;
