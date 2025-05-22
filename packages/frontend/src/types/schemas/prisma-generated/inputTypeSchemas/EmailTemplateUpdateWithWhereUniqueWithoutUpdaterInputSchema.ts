import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithoutUpdaterInputSchema } from './EmailTemplateUpdateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema';

export const EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailTemplateUpdateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema) ]),
}).strict();

export default EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema;
