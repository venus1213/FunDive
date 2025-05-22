import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestUpdateWithoutTemplateInputSchema } from './EmailABTestUpdateWithoutTemplateInputSchema';
import { EmailABTestUncheckedUpdateWithoutTemplateInputSchema } from './EmailABTestUncheckedUpdateWithoutTemplateInputSchema';
import { EmailABTestCreateWithoutTemplateInputSchema } from './EmailABTestCreateWithoutTemplateInputSchema';
import { EmailABTestUncheckedCreateWithoutTemplateInputSchema } from './EmailABTestUncheckedCreateWithoutTemplateInputSchema';

export const EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailABTestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailABTestUpdateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema;
