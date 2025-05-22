import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogCountOutputTypeSelectSchema } from './EmailLogCountOutputTypeSelectSchema';

export const EmailLogCountOutputTypeArgsSchema: z.ZodType<Prisma.EmailLogCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmailLogCountOutputTypeSelectSchema).nullish(),
}).strict();

export default EmailLogCountOutputTypeSelectSchema;
