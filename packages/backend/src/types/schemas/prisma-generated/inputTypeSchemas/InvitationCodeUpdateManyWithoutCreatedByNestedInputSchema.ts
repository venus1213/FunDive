import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateWithoutCreatedByInputSchema } from './InvitationCodeCreateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedCreateWithoutCreatedByInputSchema';
import { InvitationCodeCreateOrConnectWithoutCreatedByInputSchema } from './InvitationCodeCreateOrConnectWithoutCreatedByInputSchema';
import { InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema } from './InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema';
import { InvitationCodeCreateManyCreatedByInputEnvelopeSchema } from './InvitationCodeCreateManyCreatedByInputEnvelopeSchema';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema } from './InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema';
import { InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema } from './InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema';
import { InvitationCodeScalarWhereInputSchema } from './InvitationCodeScalarWhereInputSchema';

export const InvitationCodeUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.InvitationCodeUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema).array(),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCodeCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCodeCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationCodeScalarWhereInputSchema),z.lazy(() => InvitationCodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvitationCodeUpdateManyWithoutCreatedByNestedInputSchema;
