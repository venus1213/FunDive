import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutSenderInputSchema } from './EmailLogCreateWithoutSenderInputSchema';
import { EmailLogUncheckedCreateWithoutSenderInputSchema } from './EmailLogUncheckedCreateWithoutSenderInputSchema';
import { EmailLogCreateOrConnectWithoutSenderInputSchema } from './EmailLogCreateOrConnectWithoutSenderInputSchema';
import { EmailLogCreateManySenderInputEnvelopeSchema } from './EmailLogCreateManySenderInputEnvelopeSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';

export const EmailLogUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.EmailLogUncheckedCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutSenderInputSchema),z.lazy(() => EmailLogCreateWithoutSenderInputSchema).array(),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailLogCreateOrConnectWithoutSenderInputSchema),z.lazy(() => EmailLogCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailLogCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailLogUncheckedCreateNestedManyWithoutSenderInputSchema;
