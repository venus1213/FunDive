import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogWhereUniqueInputSchema } from './ErrorLogWhereUniqueInputSchema';
import { ErrorLogUpdateWithoutUserInputSchema } from './ErrorLogUpdateWithoutUserInputSchema';
import { ErrorLogUncheckedUpdateWithoutUserInputSchema } from './ErrorLogUncheckedUpdateWithoutUserInputSchema';

export const ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ErrorLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ErrorLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ErrorLogUpdateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ErrorLogUpdateWithWhereUniqueWithoutUserInputSchema;
