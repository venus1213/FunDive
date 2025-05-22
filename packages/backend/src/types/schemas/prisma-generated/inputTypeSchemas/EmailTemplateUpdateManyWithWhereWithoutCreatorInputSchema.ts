import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateScalarWhereInputSchema } from './EmailTemplateScalarWhereInputSchema';
import { EmailTemplateUpdateManyMutationInputSchema } from './EmailTemplateUpdateManyMutationInputSchema';
import { EmailTemplateUncheckedUpdateManyWithoutCreatorInputSchema } from './EmailTemplateUncheckedUpdateManyWithoutCreatorInputSchema';

export const EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.EmailTemplateUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => EmailTemplateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailTemplateUpdateManyMutationInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export default EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema;
