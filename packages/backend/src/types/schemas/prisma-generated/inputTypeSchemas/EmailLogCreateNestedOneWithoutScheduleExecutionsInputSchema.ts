import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutScheduleExecutionsInputSchema } from './EmailLogCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema } from './EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';

export const EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema: z.ZodType<Prisma.EmailLogCreateNestedOneWithoutScheduleExecutionsInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema).optional(),
  connect: z.lazy(() => EmailLogWhereUniqueInputSchema).optional()
}).strict();

export default EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema;
