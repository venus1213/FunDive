import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestSelectSchema } from '../inputTypeSchemas/EmailABTestSelectSchema';
import { EmailABTestIncludeSchema } from '../inputTypeSchemas/EmailABTestIncludeSchema';

export const EmailABTestArgsSchema: z.ZodType<Prisma.EmailABTestDefaultArgs> = z.object({
  select: z.lazy(() => EmailABTestSelectSchema).optional(),
  include: z.lazy(() => EmailABTestIncludeSchema).optional(),
}).strict();

export default EmailABTestArgsSchema;
