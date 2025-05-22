import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { EmailTemplateUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUpdateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema';

export const EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInputSchema: z.ZodType<Prisma.EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailTemplateUpdateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema) ]),
}).strict();

export default EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInputSchema;
