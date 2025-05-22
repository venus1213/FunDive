import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutAbTestsInputSchema } from './EmailTemplateCreateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedCreateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedCreateWithoutAbTestsInputSchema';
import { EmailTemplateCreateOrConnectWithoutAbTestsInputSchema } from './EmailTemplateCreateOrConnectWithoutAbTestsInputSchema';
import { EmailTemplateUpsertWithoutAbTestsInputSchema } from './EmailTemplateUpsertWithoutAbTestsInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateToOneWithWhereWithoutAbTestsInputSchema } from './EmailTemplateUpdateToOneWithWhereWithoutAbTestsInputSchema';
import { EmailTemplateUpdateWithoutAbTestsInputSchema } from './EmailTemplateUpdateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema';

export const EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInputSchema: z.ZodType<Prisma.EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutAbTestsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutAbTestsInputSchema).optional(),
  upsert: z.lazy(() => EmailTemplateUpsertWithoutAbTestsInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailTemplateUpdateToOneWithWhereWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUpdateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema) ]).optional(),
}).strict();

export default EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInputSchema;
