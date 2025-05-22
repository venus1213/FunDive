import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const InvitationCodeCreateManyUsedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateManyUsedByInput> = z.object({
  id: z.string().optional(),
  code: z.string(),
  createdById: z.string(),
  expiresAt: z.coerce.date(),
  isUsed: z.boolean().optional(),
  isActive: z.boolean().optional(),
  maxUses: z.number().int().optional(),
  currentUses: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default InvitationCodeCreateManyUsedByInputSchema;
