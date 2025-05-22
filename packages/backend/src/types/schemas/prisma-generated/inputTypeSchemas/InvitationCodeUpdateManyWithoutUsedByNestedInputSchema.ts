import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateWithoutUsedByInputSchema } from './InvitationCodeCreateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutUsedByInputSchema } from './InvitationCodeUncheckedCreateWithoutUsedByInputSchema';
import { InvitationCodeCreateOrConnectWithoutUsedByInputSchema } from './InvitationCodeCreateOrConnectWithoutUsedByInputSchema';
import { InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema } from './InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema';
import { InvitationCodeCreateManyUsedByInputEnvelopeSchema } from './InvitationCodeCreateManyUsedByInputEnvelopeSchema';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema } from './InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema';
import { InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema } from './InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema';
import { InvitationCodeScalarWhereInputSchema } from './InvitationCodeScalarWhereInputSchema';

export const InvitationCodeUpdateManyWithoutUsedByNestedInputSchema: z.ZodType<Prisma.InvitationCodeUpdateManyWithoutUsedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema).array(),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCodeCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => InvitationCodeCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCodeCreateManyUsedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationCodeScalarWhereInputSchema),z.lazy(() => InvitationCodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvitationCodeUpdateManyWithoutUsedByNestedInputSchema;
