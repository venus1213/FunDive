import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'
import { InvitationCodeOrderByWithAggregationInputSchema } from '../inputTypeSchemas/InvitationCodeOrderByWithAggregationInputSchema'
import { InvitationCodeScalarFieldEnumSchema } from '../inputTypeSchemas/InvitationCodeScalarFieldEnumSchema'
import { InvitationCodeScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/InvitationCodeScalarWhereWithAggregatesInputSchema'

export const InvitationCodeGroupByArgsSchema: z.ZodType<Prisma.InvitationCodeGroupByArgs> = z.object({
  where: InvitationCodeWhereInputSchema.optional(),
  orderBy: z.union([ InvitationCodeOrderByWithAggregationInputSchema.array(),InvitationCodeOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationCodeScalarFieldEnumSchema.array(),
  having: InvitationCodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default InvitationCodeGroupByArgsSchema;
