import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportSelectSchema } from '../inputTypeSchemas/ReportSelectSchema';
import { ReportIncludeSchema } from '../inputTypeSchemas/ReportIncludeSchema';

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
}).strict();

export default ReportArgsSchema;
