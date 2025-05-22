import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const EmailABTestResultScalarWhereInputSchema: z.ZodType<Prisma.EmailABTestResultScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailABTestResultScalarWhereInputSchema),z.lazy(() => EmailABTestResultScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestResultScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestResultScalarWhereInputSchema),z.lazy(() => EmailABTestResultScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  testId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  variant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opened: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  clicked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailABTestResultScalarWhereInputSchema;
