import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上である必要があります'),
});

export const registerSchema = z.object({
  name: z.string().min(2, '名前は2文字以上である必要があります'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上である必要があります'),
  confirmPassword: z.string(),
  role: z.enum(['entrepreneur', 'investor']),
  planType: z.enum(['free', 'standard', 'premium', 'startup_partner']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
}); 