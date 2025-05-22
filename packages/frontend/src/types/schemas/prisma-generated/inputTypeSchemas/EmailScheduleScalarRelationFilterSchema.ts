import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereInputSchema } from './EmailScheduleWhereInputSchema';

export const EmailScheduleScalarRelationFilterSchema: z.ZodType<Prisma.EmailScheduleScalarRelationFilter> = z.object({
  is: z.lazy(() => EmailScheduleWhereInputSchema).optional(),
  isNot: z.lazy(() => EmailScheduleWhereInputSchema).optional()
}).strict();

export default EmailScheduleScalarRelationFilterSchema;
