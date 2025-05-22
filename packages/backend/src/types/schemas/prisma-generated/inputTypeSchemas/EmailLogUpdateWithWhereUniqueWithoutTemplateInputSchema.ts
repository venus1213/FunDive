import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithoutTemplateInputSchema } from './EmailLogUpdateWithoutTemplateInputSchema';
import { EmailLogUncheckedUpdateWithoutTemplateInputSchema } from './EmailLogUncheckedUpdateWithoutTemplateInputSchema';

export const EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailLogUpdateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema;
