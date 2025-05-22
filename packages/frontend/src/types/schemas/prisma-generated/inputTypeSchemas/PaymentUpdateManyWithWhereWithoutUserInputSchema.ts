import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentScalarWhereInputSchema } from './PaymentScalarWhereInputSchema';
import { PaymentUpdateManyMutationInputSchema } from './PaymentUpdateManyMutationInputSchema';
import { PaymentUncheckedUpdateManyWithoutUserInputSchema } from './PaymentUncheckedUpdateManyWithoutUserInputSchema';

export const PaymentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PaymentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateManyMutationInputSchema),z.lazy(() => PaymentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default PaymentUpdateManyWithWhereWithoutUserInputSchema;
