import { z } from 'zod';

export const ActionTypeSchema = z.enum(['auth','login','logout','create','update','delete','report','admin_action','read','use','validate','search']);

export type ActionTypeType = `${z.infer<typeof ActionTypeSchema>}`

export default ActionTypeSchema;
