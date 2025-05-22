import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeScalarWhereInputSchema } from './InvitationCodeScalarWhereInputSchema';
import { InvitationCodeUpdateManyMutationInputSchema } from './InvitationCodeUpdateManyMutationInputSchema';
import { InvitationCodeUncheckedUpdateManyWithoutUsedByInputSchema } from './InvitationCodeUncheckedUpdateManyWithoutUsedByInputSchema';

export const InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeUpdateManyWithWhereWithoutUsedByInput> = z.object({
  where: z.lazy(() => InvitationCodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationCodeUpdateManyMutationInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateManyWithoutUsedByInputSchema) ]),
}).strict();

export default InvitationCodeUpdateManyWithWhereWithoutUsedByInputSchema;
