import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeScalarWhereInputSchema } from './InvitationCodeScalarWhereInputSchema';
import { InvitationCodeUpdateManyMutationInputSchema } from './InvitationCodeUpdateManyMutationInputSchema';
import { InvitationCodeUncheckedUpdateManyWithoutCreatedByInputSchema } from './InvitationCodeUncheckedUpdateManyWithoutCreatedByInputSchema';

export const InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => InvitationCodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationCodeUpdateManyMutationInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export default InvitationCodeUpdateManyWithWhereWithoutCreatedByInputSchema;
