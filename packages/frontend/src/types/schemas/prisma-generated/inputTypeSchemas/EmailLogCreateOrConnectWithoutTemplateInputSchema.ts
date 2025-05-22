import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogCreateWithoutTemplateInputSchema } from './EmailLogCreateWithoutTemplateInputSchema';
import { EmailLogUncheckedCreateWithoutTemplateInputSchema } from './EmailLogUncheckedCreateWithoutTemplateInputSchema';

export const EmailLogCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailLogCreateOrConnectWithoutTemplateInputSchema;
