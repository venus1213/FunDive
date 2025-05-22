import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereInputSchema } from './EmailABTestResultWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EmailABTestScalarRelationFilterSchema } from './EmailABTestScalarRelationFilterSchema';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';
import { EmailLogScalarRelationFilterSchema } from './EmailLogScalarRelationFilterSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailABTestResultWhereUniqueInputSchema: z.ZodType<Prisma.EmailABTestResultWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EmailABTestResultWhereInputSchema),z.lazy(() => EmailABTestResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestResultWhereInputSchema),z.lazy(() => EmailABTestResultWhereInputSchema).array() ]).optional(),
  testId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  variant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opened: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  clicked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  test: z.union([ z.lazy(() => EmailABTestScalarRelationFilterSchema),z.lazy(() => EmailABTestWhereInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => EmailLogScalarRelationFilterSchema),z.lazy(() => EmailLogWhereInputSchema) ]).optional(),
}).strict());

export default EmailABTestResultWhereUniqueInputSchema;
