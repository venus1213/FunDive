import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateUpdateWithoutSchedulesInputSchema } from './EmailTemplateUpdateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema';
import { EmailTemplateCreateWithoutSchedulesInputSchema } from './EmailTemplateCreateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedCreateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedCreateWithoutSchedulesInputSchema';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateUpsertWithoutSchedulesInputSchema: z.ZodType<Prisma.EmailTemplateUpsertWithoutSchedulesInput> = z.object({
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema) ]),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSchedulesInputSchema) ]),
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateUpsertWithoutSchedulesInputSchema;
