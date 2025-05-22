import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutSchedulesInputSchema } from './EmailTemplateCreateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedCreateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedCreateWithoutSchedulesInputSchema';
import { EmailTemplateCreateOrConnectWithoutSchedulesInputSchema } from './EmailTemplateCreateOrConnectWithoutSchedulesInputSchema';
import { EmailTemplateUpsertWithoutSchedulesInputSchema } from './EmailTemplateUpsertWithoutSchedulesInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateToOneWithWhereWithoutSchedulesInputSchema } from './EmailTemplateUpdateToOneWithWhereWithoutSchedulesInputSchema';
import { EmailTemplateUpdateWithoutSchedulesInputSchema } from './EmailTemplateUpdateWithoutSchedulesInputSchema';
import { EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema } from './EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema';

export const EmailTemplateUpdateOneRequiredWithoutSchedulesNestedInputSchema: z.ZodType<Prisma.EmailTemplateUpdateOneRequiredWithoutSchedulesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutSchedulesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutSchedulesInputSchema).optional(),
  upsert: z.lazy(() => EmailTemplateUpsertWithoutSchedulesInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailTemplateUpdateToOneWithWhereWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUpdateWithoutSchedulesInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutSchedulesInputSchema) ]).optional(),
}).strict();

export default EmailTemplateUpdateOneRequiredWithoutSchedulesNestedInputSchema;
