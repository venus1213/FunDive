import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentCreateWithoutTransactionsInputSchema } from './PaymentCreateWithoutTransactionsInputSchema';
import { PaymentUncheckedCreateWithoutTransactionsInputSchema } from './PaymentUncheckedCreateWithoutTransactionsInputSchema';
import { PaymentCreateOrConnectWithoutTransactionsInputSchema } from './PaymentCreateOrConnectWithoutTransactionsInputSchema';
import { PaymentUpsertWithoutTransactionsInputSchema } from './PaymentUpsertWithoutTransactionsInputSchema';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentUpdateToOneWithWhereWithoutTransactionsInputSchema } from './PaymentUpdateToOneWithWhereWithoutTransactionsInputSchema';
import { PaymentUpdateWithoutTransactionsInputSchema } from './PaymentUpdateWithoutTransactionsInputSchema';
import { PaymentUncheckedUpdateWithoutTransactionsInputSchema } from './PaymentUncheckedUpdateWithoutTransactionsInputSchema';

export const PaymentUpdateOneRequiredWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.PaymentUpdateOneRequiredWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => PaymentUpdateWithoutTransactionsInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export default PaymentUpdateOneRequiredWithoutTransactionsNestedInputSchema;
