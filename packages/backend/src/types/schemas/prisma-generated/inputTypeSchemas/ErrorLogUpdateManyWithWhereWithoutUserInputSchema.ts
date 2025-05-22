import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogScalarWhereInputSchema } from './ErrorLogScalarWhereInputSchema';
import { ErrorLogUpdateManyMutationInputSchema } from './ErrorLogUpdateManyMutationInputSchema';
import { ErrorLogUncheckedUpdateManyWithoutUserInputSchema } from './ErrorLogUncheckedUpdateManyWithoutUserInputSchema';

export const ErrorLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ErrorLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ErrorLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ErrorLogUpdateManyMutationInputSchema),z.lazy(() => ErrorLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ErrorLogUpdateManyWithWhereWithoutUserInputSchema;
