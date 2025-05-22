import { z } from 'zod';

export const ProjectStatusSchema = z.enum(['draft','active','suspended']);

export type ProjectStatusType = `${z.infer<typeof ProjectStatusSchema>}`

export default ProjectStatusSchema;
