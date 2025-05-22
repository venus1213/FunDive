import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleCreateWithoutTemplateInputSchema } from './EmailScheduleCreateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedCreateWithoutTemplateInputSchema } from './EmailScheduleUncheckedCreateWithoutTemplateInputSchema';

export const EmailScheduleCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailScheduleCreateOrConnectWithoutTemplateInputSchema;
