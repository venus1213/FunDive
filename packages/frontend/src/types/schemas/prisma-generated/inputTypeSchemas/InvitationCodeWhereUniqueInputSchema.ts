import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCodeWhereInputSchema } from './InvitationCodeWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserNullableScalarRelationFilterSchema } from './UserNullableScalarRelationFilterSchema';

export const InvitationCodeWhereUniqueInputSchema: z.ZodType<Prisma.InvitationCodeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    code: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => InvitationCodeWhereInputSchema),z.lazy(() => InvitationCodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationCodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationCodeWhereInputSchema),z.lazy(() => InvitationCodeWhereInputSchema).array() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  usedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  maxUses: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  currentUses: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  usedBy: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export default InvitationCodeWhereUniqueInputSchema;
