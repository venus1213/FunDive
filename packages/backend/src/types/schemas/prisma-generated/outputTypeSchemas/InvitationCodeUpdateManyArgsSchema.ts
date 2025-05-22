import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeUpdateManyMutationInputSchema } from '../inputTypeSchemas/InvitationCodeUpdateManyMutationInputSchema'
import { InvitationCodeUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/InvitationCodeUncheckedUpdateManyInputSchema'
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'

export const InvitationCodeUpdateManyArgsSchema: z.ZodType<Prisma.InvitationCodeUpdateManyArgs> = z.object({
  data: z.union([ InvitationCodeUpdateManyMutationInputSchema,InvitationCodeUncheckedUpdateManyInputSchema ]),
  where: InvitationCodeWhereInputSchema.optional(),
}).strict() ;

export default InvitationCodeUpdateManyArgsSchema;
