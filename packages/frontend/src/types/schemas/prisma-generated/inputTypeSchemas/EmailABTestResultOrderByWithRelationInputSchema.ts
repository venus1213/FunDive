import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { EmailABTestOrderByWithRelationInputSchema } from './EmailABTestOrderByWithRelationInputSchema';
import { EmailLogOrderByWithRelationInputSchema } from './EmailLogOrderByWithRelationInputSchema';

export const EmailABTestResultOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailABTestResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  testId: z.lazy(() => SortOrderSchema).optional(),
  variant: z.lazy(() => SortOrderSchema).optional(),
  emailId: z.lazy(() => SortOrderSchema).optional(),
  opened: z.lazy(() => SortOrderSchema).optional(),
  clicked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  test: z.lazy(() => EmailABTestOrderByWithRelationInputSchema).optional(),
  email: z.lazy(() => EmailLogOrderByWithRelationInputSchema).optional()
}).strict();

export default EmailABTestResultOrderByWithRelationInputSchema;
