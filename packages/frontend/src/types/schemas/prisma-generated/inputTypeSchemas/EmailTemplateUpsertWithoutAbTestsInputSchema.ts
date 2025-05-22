import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateUpdateWithoutAbTestsInputSchema } from './EmailTemplateUpdateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema';
import { EmailTemplateCreateWithoutAbTestsInputSchema } from './EmailTemplateCreateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedCreateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedCreateWithoutAbTestsInputSchema';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';

export const EmailTemplateUpsertWithoutAbTestsInputSchema: z.ZodType<Prisma.EmailTemplateUpsertWithoutAbTestsInput> = z.object({
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutAbTestsInputSchema) ]),
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional()
}).strict();

export default EmailTemplateUpsertWithoutAbTestsInputSchema;
