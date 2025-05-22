import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestCountOutputTypeSelectSchema } from './EmailABTestCountOutputTypeSelectSchema';

export const EmailABTestCountOutputTypeArgsSchema: z.ZodType<Prisma.EmailABTestCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmailABTestCountOutputTypeSelectSchema).nullish(),
}).strict();

export default EmailABTestCountOutputTypeSelectSchema;
