import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUpdateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema';
import { EmailLogCreateWithoutScheduleExecutionsInputSchema } from './EmailLogCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailLogUpsertWithoutScheduleExecutionsInputSchema: z.ZodType<Prisma.EmailLogUpsertWithoutScheduleExecutionsInput> = z.object({
  update: z.union([ z.lazy(() => EmailLogUpdateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema) ]),
  where: z.lazy(() => EmailLogWhereInputSchema).optional()
}).strict();

export default EmailLogUpsertWithoutScheduleExecutionsInputSchema;
