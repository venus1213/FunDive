import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutSentEmailsInputSchema } from './EmailTemplateCreateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema';
import { EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema } from './EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema';
import { EmailTemplateUpsertWithoutSentEmailsInputSchema } from './EmailTemplateUpsertWithoutSentEmailsInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInputSchema } from './EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInputSchema';
import { EmailTemplateUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUpdateWithoutSentEmailsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema } from './EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema';

export const EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInputSchema: z.ZodType<Prisma.EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSentEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutSentEmailsInputSchema).optional(),
  upsert: z.lazy(() => EmailTemplateUpsertWithoutSentEmailsInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailTemplateUpdateToOneWithWhereWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUpdateWithoutSentEmailsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSentEmailsInputSchema) ]).optional(),
}).strict();

export default EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInputSchema;
