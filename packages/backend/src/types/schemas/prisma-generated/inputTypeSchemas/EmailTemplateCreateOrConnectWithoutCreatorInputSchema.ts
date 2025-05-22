import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateCreateWithoutCreatorInputSchema } from './EmailTemplateCreateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedCreateWithoutCreatorInputSchema } from './EmailTemplateUncheckedCreateWithoutCreatorInputSchema';

export const EmailTemplateCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.EmailTemplateCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default EmailTemplateCreateOrConnectWithoutCreatorInputSchema;
