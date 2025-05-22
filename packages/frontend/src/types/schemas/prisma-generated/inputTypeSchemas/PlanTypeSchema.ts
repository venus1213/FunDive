import { z } from 'zod';

export const PlanTypeSchema = z.enum(['free','standard','premium','startup_partner']);

export type PlanTypeType = `${z.infer<typeof PlanTypeSchema>}`

export default PlanTypeSchema;
