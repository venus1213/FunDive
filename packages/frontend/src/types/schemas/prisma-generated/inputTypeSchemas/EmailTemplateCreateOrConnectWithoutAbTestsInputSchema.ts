import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateCreateWithoutAbTestsInputSchema } from './EmailTemplateCreateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedCreateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedCreateWithoutAbTestsInputSchema';

export const EmailTemplateCreateOrConnectWithoutAbTestsInputSchema: z.ZodType<Prisma.EmailTemplateCreateOrConnectWithoutAbTestsInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutAbTestsInputSchema) ]),
}).strict();

export default EmailTemplateCreateOrConnectWithoutAbTestsInputSchema;
