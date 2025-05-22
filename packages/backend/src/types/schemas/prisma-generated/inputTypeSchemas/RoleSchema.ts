import { z } from 'zod';

export const RoleSchema = z.enum(['entrepreneur','investor','admin']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
