import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeUpdateManyMutationInputSchema } from '../inputTypeSchemas/InvitationCodeUpdateManyMutationInputSchema'
import { InvitationCodeUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/InvitationCodeUncheckedUpdateManyInputSchema'
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'

export const InvitationCodeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InvitationCodeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InvitationCodeUpdateManyMutationInputSchema,InvitationCodeUncheckedUpdateManyInputSchema ]),
  where: InvitationCodeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default InvitationCodeUpdateManyAndReturnArgsSchema;
