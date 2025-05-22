import { z } from 'zod';

export const ActivityTargetTypeSchema = z.enum(['user','project','message','report','notification','subscription','invitation','email','admin','bookmark','stats']);

export type ActivityTargetTypeType = `${z.infer<typeof ActivityTargetTypeSchema>}`

export default ActivityTargetTypeSchema;
