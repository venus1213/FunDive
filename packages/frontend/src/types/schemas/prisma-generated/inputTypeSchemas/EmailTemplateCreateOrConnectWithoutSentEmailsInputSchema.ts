import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateCreateWithoutSentEmailsInputSchema } from './EmailTemplateCreateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema';

export const EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema: z.ZodType<Prisma.EmailTemplateCreateOrConnectWithoutSentEmailsInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema) ]),
}).strict();

export default EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema;
