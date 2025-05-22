import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogWhereUniqueInputSchema } from './ErrorLogWhereUniqueInputSchema';
import { ErrorLogUpdateWithoutUserInputSchema } from './ErrorLogUpdateWithoutUserInputSchema';
import { ErrorLogUncheckedUpdateWithoutUserInputSchema } from './ErrorLogUncheckedUpdateWithoutUserInputSchema';
import { ErrorLogCreateWithoutUserInputSchema } from './ErrorLogCreateWithoutUserInputSchema';
import { ErrorLogUncheckedCreateWithoutUserInputSchema } from './ErrorLogUncheckedCreateWithoutUserInputSchema';

export const ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ErrorLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ErrorLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ErrorLogUpdateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ErrorLogCreateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ErrorLogUpsertWithWhereUniqueWithoutUserInputSchema;
