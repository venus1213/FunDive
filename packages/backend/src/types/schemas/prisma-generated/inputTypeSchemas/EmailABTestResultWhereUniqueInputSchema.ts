import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultWhereInputSchema } from './EmailABTestResultWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EmailABTestRelationFilterSchema } from './EmailABTestRelationFilterSchema';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';
import { EmailLogRelationFilterSchema } from './EmailLogRelationFilterSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailABTestResultWhereUniqueInputSchema: z.ZodType<Prisma.EmailABTestResultWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => EmailABTestResultWhereInputSchema),z.lazy(() => EmailABTestResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestResultWhereInputSchema),z.lazy(() => EmailABTestResultWhereInputSchema).array() ]).optional(),
  testId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  variant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opened: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  clicked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  test: z.union([ z.lazy(() => EmailABTestRelationFilterSchema),z.lazy(() => EmailABTestWhereInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => EmailLogRelationFilterSchema),z.lazy(() => EmailLogWhereInputSchema) ]).optional(),
}).strict());

export default EmailABTestResultWhereUniqueInputSchema;
