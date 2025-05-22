import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentCreateWithoutUserInputSchema } from './PaymentCreateWithoutUserInputSchema';
import { PaymentUncheckedCreateWithoutUserInputSchema } from './PaymentUncheckedCreateWithoutUserInputSchema';

export const PaymentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default PaymentCreateOrConnectWithoutUserInputSchema;
