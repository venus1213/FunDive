import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultSelectSchema } from '../inputTypeSchemas/EmailABTestResultSelectSchema';
import { EmailABTestResultIncludeSchema } from '../inputTypeSchemas/EmailABTestResultIncludeSchema';

export const EmailABTestResultArgsSchema: z.ZodType<Prisma.EmailABTestResultDefaultArgs> = z.object({
  select: z.lazy(() => EmailABTestResultSelectSchema).optional(),
  include: z.lazy(() => EmailABTestResultIncludeSchema).optional(),
}).strict();

export default EmailABTestResultArgsSchema;
