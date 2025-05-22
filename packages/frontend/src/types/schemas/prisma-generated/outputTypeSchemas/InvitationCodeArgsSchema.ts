import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeSelectSchema } from '../inputTypeSchemas/InvitationCodeSelectSchema';
import { InvitationCodeIncludeSchema } from '../inputTypeSchemas/InvitationCodeIncludeSchema';

export const InvitationCodeArgsSchema: z.ZodType<Prisma.InvitationCodeDefaultArgs> = z.object({
  select: z.lazy(() => InvitationCodeSelectSchema).optional(),
  include: z.lazy(() => InvitationCodeIncludeSchema).optional(),
}).strict();

export default InvitationCodeArgsSchema;
