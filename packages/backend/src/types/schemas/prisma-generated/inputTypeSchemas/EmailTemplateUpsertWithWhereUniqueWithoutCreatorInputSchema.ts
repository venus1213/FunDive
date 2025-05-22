import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithoutCreatorInputSchema } from './EmailTemplateUpdateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedUpdateWithoutCreatorInputSchema } from './EmailTemplateUncheckedUpdateWithoutCreatorInputSchema';
import { EmailTemplateCreateWithoutCreatorInputSchema } from './EmailTemplateCreateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedCreateWithoutCreatorInputSchema } from './EmailTemplateUncheckedCreateWithoutCreatorInputSchema';

export const EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.EmailTemplateUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export default EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema;
