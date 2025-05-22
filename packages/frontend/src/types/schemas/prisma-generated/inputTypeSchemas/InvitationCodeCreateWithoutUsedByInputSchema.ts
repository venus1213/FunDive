import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutCreatedInvitationsInputSchema } from './UserCreateNestedOneWithoutCreatedInvitationsInputSchema';

export const InvitationCodeCreateWithoutUsedByInputSchema: z.ZodType<Prisma.InvitationCodeCreateWithoutUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  isUsed: z.boolean().optional(),
  isActive: z.boolean().optional(),
  maxUses: z.number().int().optional(),
  currentUses: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedInvitationsInputSchema)
}).strict();

export default InvitationCodeCreateWithoutUsedByInputSchema;
