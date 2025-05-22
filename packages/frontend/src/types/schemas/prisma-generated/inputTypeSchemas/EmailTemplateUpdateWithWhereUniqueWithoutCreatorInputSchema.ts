import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithoutCreatorInputSchema } from './EmailTemplateUpdateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedUpdateWithoutCreatorInputSchema } from './EmailTemplateUncheckedUpdateWithoutCreatorInputSchema';

export const EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.EmailTemplateUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailTemplateUpdateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export default EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema;
