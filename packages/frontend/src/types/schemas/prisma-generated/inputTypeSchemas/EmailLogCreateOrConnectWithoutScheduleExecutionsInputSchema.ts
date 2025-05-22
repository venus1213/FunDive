import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogCreateWithoutScheduleExecutionsInputSchema } from './EmailLogCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema';

export const EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema: z.ZodType<Prisma.EmailLogCreateOrConnectWithoutScheduleExecutionsInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema) ]),
}).strict();

export default EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema;
