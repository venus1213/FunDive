import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithoutSenderInputSchema } from './EmailLogUpdateWithoutSenderInputSchema';
import { EmailLogUncheckedUpdateWithoutSenderInputSchema } from './EmailLogUncheckedUpdateWithoutSenderInputSchema';
import { EmailLogCreateWithoutSenderInputSchema } from './EmailLogCreateWithoutSenderInputSchema';
import { EmailLogUncheckedCreateWithoutSenderInputSchema } from './EmailLogUncheckedCreateWithoutSenderInputSchema';

export const EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.EmailLogUpsertWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailLogUpdateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutSenderInputSchema) ]),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export default EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema;
