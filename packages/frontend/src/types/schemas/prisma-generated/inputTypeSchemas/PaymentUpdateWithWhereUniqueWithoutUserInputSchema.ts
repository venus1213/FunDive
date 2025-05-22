import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereUniqueInputSchema } from './PaymentWhereUniqueInputSchema';
import { PaymentUpdateWithoutUserInputSchema } from './PaymentUpdateWithoutUserInputSchema';
import { PaymentUncheckedUpdateWithoutUserInputSchema } from './PaymentUncheckedUpdateWithoutUserInputSchema';

export const PaymentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateWithoutUserInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default PaymentUpdateWithWhereUniqueWithoutUserInputSchema;
