import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateCreateWithoutSchedulesInputSchema } from './EmailTemplateCreateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedCreateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedCreateWithoutSchedulesInputSchema';

export const EmailTemplateCreateOrConnectWithoutSchedulesInputSchema: z.ZodType<Prisma.EmailTemplateCreateOrConnectWithoutSchedulesInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSchedulesInputSchema) ]),
}).strict();

export default EmailTemplateCreateOrConnectWithoutSchedulesInputSchema;
