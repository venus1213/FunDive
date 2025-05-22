import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleUpdateWithoutTemplateInputSchema } from './EmailScheduleUpdateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedUpdateWithoutTemplateInputSchema } from './EmailScheduleUncheckedUpdateWithoutTemplateInputSchema';
import { EmailScheduleCreateWithoutTemplateInputSchema } from './EmailScheduleCreateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedCreateWithoutTemplateInputSchema } from './EmailScheduleUncheckedCreateWithoutTemplateInputSchema';

export const EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailScheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailScheduleUpdateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema;
