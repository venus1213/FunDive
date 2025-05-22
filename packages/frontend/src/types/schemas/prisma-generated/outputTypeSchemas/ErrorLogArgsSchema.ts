import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogSelectSchema } from '../inputTypeSchemas/ErrorLogSelectSchema';
import { ErrorLogIncludeSchema } from '../inputTypeSchemas/ErrorLogIncludeSchema';

export const ErrorLogArgsSchema: z.ZodType<Prisma.ErrorLogDefaultArgs> = z.object({
  select: z.lazy(() => ErrorLogSelectSchema).optional(),
  include: z.lazy(() => ErrorLogIncludeSchema).optional(),
}).strict();

export default ErrorLogArgsSchema;
