import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

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

export default InvitationCodeSelectSchema;
