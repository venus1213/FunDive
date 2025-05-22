import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogScalarWhereInputSchema } from './EmailLogScalarWhereInputSchema';
import { EmailLogUpdateManyMutationInputSchema } from './EmailLogUpdateManyMutationInputSchema';
import { EmailLogUncheckedUpdateManyWithoutTemplateInputSchema } from './EmailLogUncheckedUpdateManyWithoutTemplateInputSchema';

export const EmailLogUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailLogUpdateManyMutationInputSchema),z.lazy(() => EmailLogUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export default EmailLogUpdateManyWithWhereWithoutTemplateInputSchema;
