import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  planType: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  verificationToken: z.lazy(() => SortOrderSchema).optional(),
  resetPasswordToken: z.lazy(() => SortOrderSchema).optional(),
  resetPasswordExpires: z.lazy(() => SortOrderSchema).optional(),
  invitationExpires: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isFirstLogin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserMaxOrderByAggregateInputSchema;
