import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeIncludeSchema } from '../inputTypeSchemas/InvitationCodeIncludeSchema'
import { InvitationCodeWhereInputSchema } from '../inputTypeSchemas/InvitationCodeWhereInputSchema'
import { InvitationCodeOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvitationCodeOrderByWithRelationInputSchema'
import { InvitationCodeWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationCodeWhereUniqueInputSchema'
import { InvitationCodeScalarFieldEnumSchema } from '../inputTypeSchemas/InvitationCodeScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvitationCodeSelectSchema: z.ZodType<Prisma.InvitationCodeSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  createdById: z.boolean().optional(),
  usedById: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  isUsed: z.boolean().optional(),
  isActive: z.boolean().optional(),
  maxUses: z.boolean().optional(),
  currentUses: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  usedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InvitationCodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationCodeFindFirstOrThrowArgs> = z.object({
  select: InvitationCodeSelectSchema.optional(),
  include: z.lazy(() => InvitationCodeIncludeSchema).optional(),
  where: InvitationCodeWhereInputSchema.optional(),
  orderBy: z.union([ InvitationCodeOrderByWithRelationInputSchema.array(),InvitationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationCodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationCodeScalarFieldEnumSchema,InvitationCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default InvitationCodeFindFirstOrThrowArgsSchema;
