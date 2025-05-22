import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'
import { InvitationCodeOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvitationCodeOrderByWithRelationInputSchema'
import { InvitationCodeWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationCodeWhereUniqueInputSchema'

export const InvitationCodeAggregateArgsSchema: z.ZodType<Prisma.InvitationCodeAggregateArgs> = z.object({
  where: InvitationCodeWhereInputSchema.optional(),
  orderBy: z.union([ InvitationCodeOrderByWithRelationInputSchema.array(),InvitationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default InvitationCodeAggregateArgsSchema;
