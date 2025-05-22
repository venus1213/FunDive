import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithoutUsedByInputSchema } from './InvitationCodeUpdateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedUpdateWithoutUsedByInputSchema } from './InvitationCodeUncheckedUpdateWithoutUsedByInputSchema';

export const InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeUpdateWithWhereUniqueWithoutUsedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationCodeUpdateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateWithoutUsedByInputSchema) ]),
}).strict();

export default InvitationCodeUpdateWithWhereUniqueWithoutUsedByInputSchema;
