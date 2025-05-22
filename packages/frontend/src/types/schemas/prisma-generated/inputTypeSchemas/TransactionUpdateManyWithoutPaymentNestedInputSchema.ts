import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionCreateWithoutPaymentInputSchema } from './TransactionCreateWithoutPaymentInputSchema';
import { TransactionUncheckedCreateWithoutPaymentInputSchema } from './TransactionUncheckedCreateWithoutPaymentInputSchema';
import { TransactionCreateOrConnectWithoutPaymentInputSchema } from './TransactionCreateOrConnectWithoutPaymentInputSchema';
import { TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema } from './TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema';
import { TransactionCreateManyPaymentInputEnvelopeSchema } from './TransactionCreateManyPaymentInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema } from './TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema';
import { TransactionUpdateManyWithWhereWithoutPaymentInputSchema } from './TransactionUpdateManyWithWhereWithoutPaymentInputSchema';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';

export const TransactionUpdateManyWithoutPaymentNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutPaymentInputSchema),z.lazy(() => TransactionCreateWithoutPaymentInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutPaymentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutPaymentInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutPaymentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutPaymentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyPaymentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutPaymentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutPaymentInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutPaymentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TransactionUpdateManyWithoutPaymentNestedInputSchema;
