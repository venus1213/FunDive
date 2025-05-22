import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestScalarWhereInputSchema } from './EmailABTestScalarWhereInputSchema';
import { EmailABTestUpdateManyMutationInputSchema } from './EmailABTestUpdateManyMutationInputSchema';
import { EmailABTestUncheckedUpdateManyWithoutTemplateInputSchema } from './EmailABTestUncheckedUpdateManyWithoutTemplateInputSchema';

export const EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailABTestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailABTestUpdateManyMutationInputSchema),z.lazy(() => EmailABTestUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export default EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema;
