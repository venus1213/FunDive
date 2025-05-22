import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutSentEmailsInputSchema } from './EmailTemplateCreateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema';
import { EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema } from './EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';

export const EmailTemplateCreateNestedOneWithoutSentEmailsInputSchema: z.ZodType<Prisma.EmailTemplateCreateNestedOneWithoutSentEmailsInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional()
}).strict();

export default EmailTemplateCreateNestedOneWithoutSentEmailsInputSchema;
