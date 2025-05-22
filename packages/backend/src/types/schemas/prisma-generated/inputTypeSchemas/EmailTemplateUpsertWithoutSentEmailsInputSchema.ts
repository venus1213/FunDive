import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUpdateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema';
import { EmailTemplateCreateWithoutSentEmailsInputSchema } from './EmailTemplateCreateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateUpsertWithoutSentEmailsInputSchema: z.ZodType<Prisma.EmailTemplateUpsertWithoutSentEmailsInput> = z.object({
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema) ]),
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateUpsertWithoutSentEmailsInputSchema;
