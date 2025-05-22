import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeCreateWithoutCreatedByInputSchema } from './InvitationCodeCreateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedCreateWithoutCreatedByInputSchema';

export const InvitationCodeCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export default InvitationCodeCreateOrConnectWithoutCreatedByInputSchema;
