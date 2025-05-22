import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateCreateWithoutUpdaterInputSchema } from './EmailTemplateCreateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedCreateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedCreateWithoutUpdaterInputSchema';

export const EmailTemplateCreateOrConnectWithoutUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateCreateOrConnectWithoutUpdaterInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema) ]),
}).strict();

export default EmailTemplateCreateOrConnectWithoutUpdaterInputSchema;
