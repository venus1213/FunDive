import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionCreateWithoutPaymentInputSchema } from './TransactionCreateWithoutPaymentInputSchema';
import { TransactionUncheckedCreateWithoutPaymentInputSchema } from './TransactionUncheckedCreateWithoutPaymentInputSchema';
import { TransactionCreateOrConnectWithoutPaymentInputSchema } from './TransactionCreateOrConnectWithoutPaymentInputSchema';
import { TransactionCreateManyPaymentInputEnvelopeSchema } from './TransactionCreateManyPaymentInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';

export const TransactionUncheckedCreateNestedManyWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutPaymentInputSchema),z.lazy(() => TransactionCreateWithoutPaymentInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutPaymentInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutPaymentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyPaymentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TransactionUncheckedCreateNestedManyWithoutPaymentInputSchema;
