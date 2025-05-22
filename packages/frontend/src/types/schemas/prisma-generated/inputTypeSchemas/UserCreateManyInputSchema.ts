import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { PlanTypeSchema } from './PlanTypeSchema';

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  firebaseUid: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  planType: z.lazy(() => PlanTypeSchema).optional(),
  isAdmin: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  verificationToken: z.string().optional().nullable(),
  resetPasswordToken: z.string().optional().nullable(),
  resetPasswordExpires: z.coerce.date().optional().nullable(),
  invitationExpires: z.coerce.date().optional().nullable(),
  invitedBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFirstLogin: z.boolean().optional()
}).strict();

export default UserCreateManyInputSchema;
