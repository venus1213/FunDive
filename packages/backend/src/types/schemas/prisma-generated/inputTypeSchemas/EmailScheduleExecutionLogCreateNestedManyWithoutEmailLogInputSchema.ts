import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema';
import { EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema } from './EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema';
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from './EmailScheduleExecutionLogWhereUniqueInputSchema';

export const EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema).array(),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema),z.lazy(() => EmailScheduleExecutionLogCreateOrConnectWithoutEmailLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleExecutionLogCreateManyEmailLogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema;
