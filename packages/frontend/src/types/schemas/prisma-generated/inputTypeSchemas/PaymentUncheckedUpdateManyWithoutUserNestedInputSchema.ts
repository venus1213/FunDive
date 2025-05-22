import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentCreateWithoutUserInputSchema } from './PaymentCreateWithoutUserInputSchema';
import { PaymentUncheckedCreateWithoutUserInputSchema } from './PaymentUncheckedCreateWithoutUserInputSchema';
import { PaymentCreateOrConnectWithoutUserInputSchema } from './PaymentCreateOrConnectWithoutUserInputSchema';
import { PaymentUpsertWithWhereUniqueWithoutUserInputSchema } from './PaymentUpsertWithWhereUniqueWithoutUserInputSchema';
import { PaymentCreateManyUserInputEnvelopeSchema } from './PaymentCreateManyUserInputEnvelopeSchema';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentUpdateWithWhereUniqueWithoutUserInputSchema } from './PaymentUpdateWithWhereUniqueWithoutUserInputSchema';
import { PaymentUpdateManyWithWhereWithoutUserInputSchema } from './PaymentUpdateManyWithWhereWithoutUserInputSchema';
import { PaymentScalarWhereInputSchema } from './PaymentScalarWhereInputSchema';

export const PaymentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutUserInputSchema),z.lazy(() => PaymentCreateWithoutUserInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutUserInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PaymentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PaymentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PaymentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PaymentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PaymentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default PaymentUncheckedUpdateManyWithoutUserNestedInputSchema;
