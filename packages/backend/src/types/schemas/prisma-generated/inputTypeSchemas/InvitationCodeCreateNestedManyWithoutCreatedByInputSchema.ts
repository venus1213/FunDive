import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateWithoutCreatedByInputSchema } from './InvitationCodeCreateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedCreateWithoutCreatedByInputSchema';
import { InvitationCodeCreateOrConnectWithoutCreatedByInputSchema } from './InvitationCodeCreateOrConnectWithoutCreatedByInputSchema';
import { InvitationCodeCreateManyCreatedByInputEnvelopeSchema } from './InvitationCodeCreateManyCreatedByInputEnvelopeSchema';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';

export const InvitationCodeCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema).array(),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCodeCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCodeCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvitationCodeCreateNestedManyWithoutCreatedByInputSchema;
