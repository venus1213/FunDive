import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithoutCreatedByInputSchema } from './InvitationCodeUpdateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema';
import { InvitationCodeCreateWithoutCreatedByInputSchema } from './InvitationCodeCreateWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutCreatedByInputSchema } from './InvitationCodeUncheckedCreateWithoutCreatedByInputSchema';

export const InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationCodeUpdateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutCreatedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export default InvitationCodeUpsertWithWhereUniqueWithoutCreatedByInputSchema;
