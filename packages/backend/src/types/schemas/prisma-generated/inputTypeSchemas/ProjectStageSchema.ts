import { z } from 'zod';

export const ProjectStageSchema = z.enum(['idea','mvp','early_stage','growth','mature']);

export type ProjectStageType = `${z.infer<typeof ProjectStageSchema>}`

export default ProjectStageSchema;
