import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { EmailTemplateUpdateWithoutSchedulesInputSchema } from './EmailTemplateUpdateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema';

export const EmailTemplateUpdateToOneWithWhereWithoutSchedulesInputSchema: z.ZodType<Prisma.EmailTemplateUpdateToOneWithWhereWithoutSchedulesInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailTemplateUpdateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema) ]),
}).strict();

export default EmailTemplateUpdateToOneWithWhereWithoutSchedulesInputSchema;
