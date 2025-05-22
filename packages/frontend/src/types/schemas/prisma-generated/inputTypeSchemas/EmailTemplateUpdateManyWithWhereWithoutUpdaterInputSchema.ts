import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateScalarWhereInputSchema } from './EmailTemplateScalarWhereInputSchema';
import { EmailTemplateUpdateManyMutationInputSchema } from './EmailTemplateUpdateManyMutationInputSchema';
import { EmailTemplateUncheckedUpdateManyWithoutUpdaterInputSchema } from './EmailTemplateUncheckedUpdateManyWithoutUpdaterInputSchema';

export const EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateUpdateManyWithWhereWithoutUpdaterInput> = z.object({
  where: z.lazy(() => EmailTemplateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailTemplateUpdateManyMutationInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateManyWithoutUpdaterInputSchema) ]),
}).strict();

export default EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema;
