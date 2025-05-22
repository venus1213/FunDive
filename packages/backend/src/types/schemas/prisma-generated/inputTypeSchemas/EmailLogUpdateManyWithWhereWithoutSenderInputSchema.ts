import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogScalarWhereInputSchema } from './EmailLogScalarWhereInputSchema';
import { EmailLogUpdateManyMutationInputSchema } from './EmailLogUpdateManyMutationInputSchema';
import { EmailLogUncheckedUpdateManyWithoutSenderInputSchema } from './EmailLogUncheckedUpdateManyWithoutSenderInputSchema';

export const EmailLogUpdateManyWithWhereWithoutSenderInputSchema: z.ZodType<Prisma.EmailLogUpdateManyWithWhereWithoutSenderInput> = z.object({
  where: z.lazy(() => EmailLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailLogUpdateManyMutationInputSchema),z.lazy(() => EmailLogUncheckedUpdateManyWithoutSenderInputSchema) ]),
}).strict();

export default EmailLogUpdateManyWithWhereWithoutSenderInputSchema;
