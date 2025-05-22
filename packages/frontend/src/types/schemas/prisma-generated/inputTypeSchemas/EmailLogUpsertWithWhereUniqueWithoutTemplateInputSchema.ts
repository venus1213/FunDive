import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithoutTemplateInputSchema } from './EmailLogUpdateWithoutTemplateInputSchema';
import { EmailLogUncheckedUpdateWithoutTemplateInputSchema } from './EmailLogUncheckedUpdateWithoutTemplateInputSchema';
import { EmailLogCreateWithoutTemplateInputSchema } from './EmailLogCreateWithoutTemplateInputSchema';
import { EmailLogUncheckedCreateWithoutTemplateInputSchema } from './EmailLogUncheckedCreateWithoutTemplateInputSchema';

export const EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailLogUpdateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export default EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema;
