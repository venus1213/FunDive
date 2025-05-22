import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestCreateWithoutTemplateInputSchema } from './EmailABTestCreateWithoutTemplateInputSchema';
import { EmailABTestUncheckedCreateWithoutTemplateInputSchema } from './EmailABTestUncheckedCreateWithoutTemplateInputSchema';

export const EmailABTestCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailABTestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailABTestCreateOrConnectWithoutTemplateInputSchema;
