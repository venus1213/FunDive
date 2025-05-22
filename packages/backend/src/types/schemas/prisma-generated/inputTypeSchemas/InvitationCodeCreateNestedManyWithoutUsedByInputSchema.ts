import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeCreateWithoutUsedByInputSchema } from './InvitationCodeCreateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutUsedByInputSchema } from './InvitationCodeUncheckedCreateWithoutUsedByInputSchema';
import { InvitationCodeCreateOrConnectWithoutUsedByInputSchema } from './InvitationCodeCreateOrConnectWithoutUsedByInputSchema';
import { InvitationCodeCreateManyUsedByInputEnvelopeSchema } from './InvitationCodeCreateManyUsedByInputEnvelopeSchema';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';

export const InvitationCodeCreateNestedManyWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateNestedManyWithoutUsedByInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema).array(),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCodeCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => InvitationCodeCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCodeCreateManyUsedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationCodeWhereUniqueInputSchema),z.lazy(() => InvitationCodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvitationCodeCreateNestedManyWithoutUsedByInputSchema;
