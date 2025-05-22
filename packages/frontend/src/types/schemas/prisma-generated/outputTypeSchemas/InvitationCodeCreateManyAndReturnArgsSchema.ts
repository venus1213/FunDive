import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCodeCreateManyInputSchema } from '../inputTypeSchemas/InvitationCodeCreateManyInputSchema'

export const InvitationCodeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvitationCodeCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvitationCodeCreateManyInputSchema,InvitationCodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default InvitationCodeCreateManyAndReturnArgsSchema;
