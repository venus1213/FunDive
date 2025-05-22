import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentCreateWithoutUserInputSchema } from './PaymentCreateWithoutUserInputSchema';
import { PaymentUncheckedCreateWithoutUserInputSchema } from './PaymentUncheckedCreateWithoutUserInputSchema';
import { PaymentCreateOrConnectWithoutUserInputSchema } from './PaymentCreateOrConnectWithoutUserInputSchema';
import { PaymentCreateManyUserInputEnvelopeSchema } from './PaymentCreateManyUserInputEnvelopeSchema';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';

export const PaymentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutUserInputSchema),z.lazy(() => PaymentCreateWithoutUserInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutUserInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default PaymentUncheckedCreateNestedManyWithoutUserInputSchema;
