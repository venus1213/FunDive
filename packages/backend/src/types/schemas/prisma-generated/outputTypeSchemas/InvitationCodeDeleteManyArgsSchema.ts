import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'

export const InvitationCodeDeleteManyArgsSchema: z.ZodType<Prisma.InvitationCodeDeleteManyArgs> = z.object({
  where: InvitationCodeWhereInputSchema.optional(),
}).strict() ;

export default InvitationCodeDeleteManyArgsSchema;
