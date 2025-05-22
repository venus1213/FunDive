import { z } from 'zod';

export const InvitationCodeScalarFieldEnumSchema = z.enum(['id','code','createdById','usedById','expiresAt','isUsed','isActive','maxUses','currentUses','createdAt','updatedAt']);

export default InvitationCodeScalarFieldEnumSchema;
