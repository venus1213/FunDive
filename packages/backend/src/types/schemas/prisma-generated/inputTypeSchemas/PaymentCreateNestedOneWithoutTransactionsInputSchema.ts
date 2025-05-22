import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentCreateWithoutTransactionsInputSchema } from './PaymentCreateWithoutTransactionsInputSchema';
import { PaymentUncheckedCreateWithoutTransactionsInputSchema } from './PaymentUncheckedCreateWithoutTransactionsInputSchema';
import { PaymentCreateOrConnectWithoutTransactionsInputSchema } from './PaymentCreateOrConnectWithoutTransactionsInputSchema';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';

export const PaymentCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional()
}).strict();

export default PaymentCreateNestedOneWithoutTransactionsInputSchema;
