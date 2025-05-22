import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutSenderInputSchema } from './EmailLogCreateWithoutSenderInputSchema';
import { EmailLogUncheckedCreateWithoutSenderInputSchema } from './EmailLogUncheckedCreateWithoutSenderInputSchema';
import { EmailLogCreateOrConnectWithoutSenderInputSchema } from './EmailLogCreateOrConnectWithoutSenderInputSchema';
import { EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema } from './EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema';
import { EmailLogCreateManySenderInputEnvelopeSchema } from './EmailLogCreateManySenderInputEnvelopeSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema } from './EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema';
import { EmailLogUpdateManyWithWhereWithoutSenderInputSchema } from './EmailLogUpdateManyWithWhereWithoutSenderInputSchema';
import { EmailLogScalarWhereInputSchema } from './EmailLogScalarWhereInputSchema';

export const EmailLogUncheckedUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.EmailLogUncheckedUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutSenderInputSchema),z.lazy(() => EmailLogCreateWithoutSenderInputSchema).array(),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailLogCreateOrConnectWithoutSenderInputSchema),z.lazy(() => EmailLogCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => EmailLogUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailLogCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => EmailLogUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailLogUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => EmailLogUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailLogScalarWhereInputSchema),z.lazy(() => EmailLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailLogUncheckedUpdateManyWithoutSenderNestedInputSchema;
