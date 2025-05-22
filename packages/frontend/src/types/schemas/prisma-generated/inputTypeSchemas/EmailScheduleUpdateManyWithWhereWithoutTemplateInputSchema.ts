import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleScalarWhereInputSchema } from './EmailScheduleScalarWhereInputSchema';
import { EmailScheduleUpdateManyMutationInputSchema } from './EmailScheduleUpdateManyMutationInputSchema';
import { EmailScheduleUncheckedUpdateManyWithoutTemplateInputSchema } from './EmailScheduleUncheckedUpdateManyWithoutTemplateInputSchema';

export const EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailScheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleUpdateManyMutationInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export default EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema;
