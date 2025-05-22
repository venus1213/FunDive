import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereUniqueInputSchema } from './InvitationCodeWhereUniqueInputSchema';
import { InvitationCodeUpdateWithoutUsedByInputSchema } from './InvitationCodeUpdateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedUpdateWithoutUsedByInputSchema } from './InvitationCodeUncheckedUpdateWithoutUsedByInputSchema';
import { InvitationCodeCreateWithoutUsedByInputSchema } from './InvitationCodeCreateWithoutUsedByInputSchema';
import { InvitationCodeUncheckedCreateWithoutUsedByInputSchema } from './InvitationCodeUncheckedCreateWithoutUsedByInputSchema';

export const InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeUpsertWithWhereUniqueWithoutUsedByInput> = z.object({
  where: z.lazy(() => InvitationCodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationCodeUpdateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedUpdateWithoutUsedByInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCodeCreateWithoutUsedByInputSchema),z.lazy(() => InvitationCodeUncheckedCreateWithoutUsedByInputSchema) ]),
}).strict();

export default InvitationCodeUpsertWithWhereUniqueWithoutUsedByInputSchema;
