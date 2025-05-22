import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestUpdateWithoutTemplateInputSchema } from './EmailABTestUpdateWithoutTemplateInputSchema';
import { EmailABTestUncheckedUpdateWithoutTemplateInputSchema } from './EmailABTestUncheckedUpdateWithoutTemplateInputSchema';

export const EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailABTestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailABTestUpdateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema;
