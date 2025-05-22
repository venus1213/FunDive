import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutSchedulesInputSchema } from './EmailTemplateCreateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedCreateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedCreateWithoutSchedulesInputSchema';
import { EmailTemplateCreateOrConnectWithoutSchedulesInputSchema } from './EmailTemplateCreateOrConnectWithoutSchedulesInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';

export const EmailTemplateCreateNestedOneWithoutSchedulesInputSchema: z.ZodType<Prisma.EmailTemplateCreateNestedOneWithoutSchedulesInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSchedulesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutSchedulesInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional()
}).strict();

export default EmailTemplateCreateNestedOneWithoutSchedulesInputSchema;
