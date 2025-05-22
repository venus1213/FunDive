import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','userId','title','description','category','projectType','status','investmentAmount','location','projectStage','popularityScore','createdAt','updatedAt']);

export default ProjectScalarFieldEnumSchema;
