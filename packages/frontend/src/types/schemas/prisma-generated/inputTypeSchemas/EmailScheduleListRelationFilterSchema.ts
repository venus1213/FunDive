import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereInputSchema } from './EmailScheduleWhereInputSchema';

export const EmailScheduleListRelationFilterSchema: z.ZodType<Prisma.EmailScheduleListRelationFilter> = z.object({
  every: z.lazy(() => EmailScheduleWhereInputSchema).optional(),
  some: z.lazy(() => EmailScheduleWhereInputSchema).optional(),
  none: z.lazy(() => EmailScheduleWhereInputSchema).optional()
}).strict();

export default EmailScheduleListRelationFilterSchema;
