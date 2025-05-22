import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithoutUpdaterInputSchema } from './EmailTemplateUpdateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema';
import { EmailTemplateCreateWithoutUpdaterInputSchema } from './EmailTemplateCreateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedCreateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedCreateWithoutUpdaterInputSchema';

export const EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInput> = z.object({
  where: z.lazy(() => EmailTemplateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedUpdateWithoutUpdaterInputSchema) ]),
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema) ]),
}).strict();

export default EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema;
