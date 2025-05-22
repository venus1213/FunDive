import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithoutCreatedByInputSchema } from './InvitationCodeUpdateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema';

export const InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationCodeUpdateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export default InvitationCodeUpdateWithWhereUniqueWithoutCreatedByInputSchema;
