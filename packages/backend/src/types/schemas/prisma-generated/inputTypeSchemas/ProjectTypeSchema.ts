import { z } from 'zod';

export const ProjectTypeSchema = z.enum(['entrepreneur','investor','cofounder']);

export type ProjectTypeType = `${z.infer<typeof ProjectTypeSchema>}`

export default ProjectTypeSchema;
