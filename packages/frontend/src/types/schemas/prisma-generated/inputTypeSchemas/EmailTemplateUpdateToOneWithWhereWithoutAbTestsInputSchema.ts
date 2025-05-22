import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { EmailTemplateUpdateWithoutAbTestsInputSchema } from './EmailTemplateUpdateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema';

export const EmailTemplateUpdateToOneWithWhereWithoutAbTestsInputSchema: z.ZodType<Prisma.EmailTemplateUpdateToOneWithWhereWithoutAbTestsInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmailTemplateUpdateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema) ]),
}).strict();

export default EmailTemplateUpdateToOneWithWhereWithoutAbTestsInputSchema;
