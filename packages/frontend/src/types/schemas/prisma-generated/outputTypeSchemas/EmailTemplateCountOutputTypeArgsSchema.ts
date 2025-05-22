import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateCountOutputTypeSelectSchema } from './EmailTemplateCountOutputTypeSelectSchema';

export const EmailTemplateCountOutputTypeArgsSchema: z.ZodType<Prisma.EmailTemplateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmailTemplateCountOutputTypeSelectSchema).nullish(),
}).strict();

export default EmailTemplateCountOutputTypeSelectSchema;
