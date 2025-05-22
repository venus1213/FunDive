import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleSelectSchema } from '../inputTypeSchemas/EmailScheduleSelectSchema';
import { EmailScheduleIncludeSchema } from '../inputTypeSchemas/EmailScheduleIncludeSchema';

export const EmailScheduleArgsSchema: z.ZodType<Prisma.EmailScheduleDefaultArgs> = z.object({
  select: z.lazy(() => EmailScheduleSelectSchema).optional(),
  include: z.lazy(() => EmailScheduleIncludeSchema).optional(),
}).strict();

export default EmailScheduleArgsSchema;
