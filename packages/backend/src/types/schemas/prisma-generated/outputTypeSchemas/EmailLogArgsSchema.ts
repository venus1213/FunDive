import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogSelectSchema } from '../inputTypeSchemas/EmailLogSelectSchema';
import { EmailLogIncludeSchema } from '../inputTypeSchemas/EmailLogIncludeSchema';

export const EmailLogArgsSchema: z.ZodType<Prisma.EmailLogDefaultArgs> = z.object({
  select: z.lazy(() => EmailLogSelectSchema).optional(),
  include: z.lazy(() => EmailLogIncludeSchema).optional(),
}).strict();

export default EmailLogArgsSchema;
