import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogCreateWithoutSenderInputSchema } from './EmailLogCreateWithoutSenderInputSchema';
import { EmailLogUncheckedCreateWithoutSenderInputSchema } from './EmailLogUncheckedCreateWithoutSenderInputSchema';

export const EmailLogCreateOrConnectWithoutSenderInputSchema: z.ZodType<Prisma.EmailLogCreateOrConnectWithoutSenderInput> = z.object({
  where: z.lazy(() => EmailLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailLogCreateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export default EmailLogCreateOrConnectWithoutSenderInputSchema;
