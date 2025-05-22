import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentUpdateWithoutUserInputSchema } from './PaymentUpdateWithoutUserInputSchema';
import { PaymentUncheckedUpdateWithoutUserInputSchema } from './PaymentUncheckedUpdateWithoutUserInputSchema';
import { PaymentCreateWithoutUserInputSchema } from './PaymentCreateWithoutUserInputSchema';
import { PaymentUncheckedCreateWithoutUserInputSchema } from './PaymentUncheckedCreateWithoutUserInputSchema';

export const PaymentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default PaymentUpsertWithWhereUniqueWithoutUserInputSchema;
