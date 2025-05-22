import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogSelectSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogSelectSchema';
import { EmailScheduleExecutionLogIncludeSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogIncludeSchema';

export const EmailScheduleExecutionLogArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogDefaultArgs> = z.object({
  select: z.lazy(() => EmailScheduleExecutionLogSelectSchema).optional(),
  include: z.lazy(() => EmailScheduleExecutionLogIncludeSchema).optional(),
}).strict();

export default EmailScheduleExecutionLogArgsSchema;
