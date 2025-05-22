import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleCountOutputTypeSelectSchema } from './EmailScheduleCountOutputTypeSelectSchema';

export const EmailScheduleCountOutputTypeArgsSchema: z.ZodType<Prisma.EmailScheduleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmailScheduleCountOutputTypeSelectSchema).nullish(),
}).strict();

export default EmailScheduleCountOutputTypeSelectSchema;
