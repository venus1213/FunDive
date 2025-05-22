import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';

export const InvitationCodeScalarWhereInputSchema: z.ZodType<Prisma.InvitationCodeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationCodeScalarWhereInputSchema),z.lazy(() => InvitationCodeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationCodeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationCodeScalarWhereInputSchema),z.lazy(() => InvitationCodeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  usedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  maxUses: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  currentUses: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default InvitationCodeScalarWhereInputSchema;
