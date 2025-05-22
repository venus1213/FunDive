import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleUpdateWithoutTemplateInputSchema } from './EmailScheduleUpdateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedUpdateWithoutTemplateInputSchema } from './EmailScheduleUncheckedUpdateWithoutTemplateInputSchema';

export const EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailScheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailScheduleUpdateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema;
