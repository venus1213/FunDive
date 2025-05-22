import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeCreateWithoutUsedByInputSchema } from './InvitationCodeCreateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutUsedByInputSchema } from './InvitationCodeUncheckedCreateWithoutUsedByInputSchema';

export const InvitationCodeCreateOrConnectWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateOrConnectWithoutUsedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema) ]),
}).strict();

export default InvitationCodeCreateOrConnectWithoutUsedByInputSchema;
