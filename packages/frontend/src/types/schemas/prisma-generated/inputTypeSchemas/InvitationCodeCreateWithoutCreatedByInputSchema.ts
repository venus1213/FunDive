import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutUsedInvitationsInputSchema } from './UserCreateNestedOneWithoutUsedInvitationsInputSchema';

export const InvitationCodeCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateWithoutCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  isUsed: z.boolean().optional(),
  isActive: z.boolean().optional(),
  maxUses: z.number().int().optional(),
  currentUses: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  usedBy: z.lazy(() => UserCreateNestedOneWithoutUsedInvitationsInputSchema).optional()
}).strict();

export default InvitationCodeCreateWithoutCreatedByInputSchema;
