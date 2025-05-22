import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutAbTestsInputSchema } from './EmailTemplateCreateWithoutAbTestsInputSchema';
import { EmailTemplateUncheckedCreateWithoutAbTestsInputSchema } from './EmailTemplateUncheckedCreateWithoutAbTestsInputSchema';
import { EmailTemplateCreateOrConnectWithoutAbTestsInputSchema } from './EmailTemplateCreateOrConnectWithoutAbTestsInputSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';

export const EmailTemplateCreateNestedOneWithoutAbTestsInputSchema: z.ZodType<Prisma.EmailTemplateCreateNestedOneWithoutAbTestsInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutAbTestsInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutAbTestsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailTemplateCreateOrConnectWithoutAbTestsInputSchema).optional(),
  connect: z.lazy(() => EmailTemplateWhereUniqueInputSchema).optional()
}).strict();

export default EmailTemplateCreateNestedOneWithoutAbTestsInputSchema;
