import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateSelectSchema } from '../inputTypeSchemas/EmailTemplateSelectSchema';
import { EmailTemplateIncludeSchema } from '../inputTypeSchemas/EmailTemplateIncludeSchema';

export const EmailTemplateArgsSchema: z.ZodType<Prisma.EmailTemplateDefaultArgs> = z.object({
  select: z.lazy(() => EmailTemplateSelectSchema).optional(),
  include: z.lazy(() => EmailTemplateIncludeSchema).optional(),
}).strict();

export default EmailTemplateArgsSchema;
