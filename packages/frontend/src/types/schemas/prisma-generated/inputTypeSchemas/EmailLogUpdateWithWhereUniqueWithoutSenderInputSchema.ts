import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithoutSenderInputSchema } from './EmailLogUpdateWithoutSenderInputSchema';
import { EmailLogUncheckedUpdateWithoutSenderInputSchema } from './EmailLogUncheckedUpdateWithoutSenderInputSchema';

export const EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.EmailLogUpdateWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailLogUpdateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutSenderInputSchema) ]),
}).strict();

export default EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema;
