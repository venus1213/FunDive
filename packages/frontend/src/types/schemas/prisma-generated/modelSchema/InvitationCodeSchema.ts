import { z } from 'zod';

/////////////////////////////////////////
// INVITATION CODE SCHEMA
/////////////////////////////////////////

export const InvitationCodeSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  createdById: z.string(),
  usedById: z.string().nullable(),
  expiresAt: z.coerce.date(),
  isUsed: z.boolean(),
  isActive: z.boolean(),
  maxUses: z.number().int(),
  currentUses: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type InvitationCode = z.infer<typeof InvitationCodeSchema>

export default InvitationCodeSchema;
