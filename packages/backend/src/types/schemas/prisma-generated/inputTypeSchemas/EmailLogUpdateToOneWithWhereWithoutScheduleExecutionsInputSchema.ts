import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';
import { EmailLogUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUpdateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema';

export const EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInputSchema: z.ZodType<Prisma.EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInput> = z.object({
  where: z.lazy(() => EmailLogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailLogUpdateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema) ]),
}).strict();

export default EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInputSchema;
