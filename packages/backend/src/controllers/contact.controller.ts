import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { AppError } from '../middlewares/error.middleware';
import nodemailer from 'nodemailer';

// 問い合わせフォームのバリデーションスキーマ
const contactSchema = z.object({
  name: z.string().min(2, 'お名前は2文字以上で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  type: z.enum(['mna', 'consulting', 'general', 'service', 'technical', 'other'], {
    required_error: '問い合わせ種類を選択してください',
  }),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
});

export class ContactController {
  /**
   * 問い合わせを受け付けるエンドポイント
   */
  async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      // リクエストボディのバリデーション
      const validatedData = contactSchema.parse(req.body);
      
      // 問い合わせ種類の日本語表記を取得
      const typeLabels: Record<string, string> = {
        mna: 'M&A相談窓口',
        consulting: 'ビジネスコンサルティング窓口',
        general: '一般的なお問い合わせ',
        service: 'サービスについて',
        technical: '技術的な問題',
        other: 'その他',
      };
      
      // メール送信の設定
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      // 管理者宛てのメール内容
      const adminMailOptions = {
        from: `"Fundive サポート" <${process.env.SMTP_FROM}>`,
        to: process.env.INITIAL_ADMIN_EMAIL,
        subject: `【FUNDIVE】問い合わせ: ${typeLabels[validatedData.type]}`,
        text: `
名前: ${validatedData.name}
メールアドレス: ${validatedData.email}
問い合わせ種類: ${typeLabels[validatedData.type]}

メッセージ:
${validatedData.message}
        `,
        html: `
<h2>FUNDIVE 問い合わせ</h2>
<p><strong>名前:</strong> ${validatedData.name}</p>
<p><strong>メールアドレス:</strong> ${validatedData.email}</p>
<p><strong>問い合わせ種類:</strong> ${typeLabels[validatedData.type]}</p>
<p><strong>メッセージ:</strong></p>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      // ユーザー宛ての自動返信メール内容
      const userMailOptions = {
        from: `"Fundive サポート" <${process.env.SMTP_FROM}>`,
        to: validatedData.email,
        subject: '【FUNDIVE】お問い合わせありがとうございます',
        text: `
${validatedData.name} 様

FUNDIVEにお問い合わせいただき、ありがとうございます。
以下の内容でお問い合わせを受け付けました。

問い合わせ種類: ${typeLabels[validatedData.type]}

メッセージ:
${validatedData.message}

内容を確認次第、担当者よりご連絡いたします。
今しばらくお待ちくださいませ。

※このメールは自動送信されています。返信はできませんのでご了承ください。

--
FUNDIVE サポートチーム
        `,
        html: `
<p>${validatedData.name} 様</p>

<p>FUNDIVEにお問い合わせいただき、ありがとうございます。<br>
以下の内容でお問い合わせを受け付けました。</p>

<p><strong>問い合わせ種類:</strong> ${typeLabels[validatedData.type]}</p>

<p><strong>メッセージ:</strong></p>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>

<p>内容を確認次第、担当者よりご連絡いたします。<br>
今しばらくお待ちくださいませ。</p>

<p><small>※このメールは自動送信されています。返信はできませんのでご了承ください。</small></p>

<p>--<br>
FUNDIVE サポートチーム</p>
        `,
      };
      
      // メール送信処理
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);
      
      // ログ記録
      logger.info('Contact form submitted', {
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.type,
      });
      
      // 成功レスポンス
      return res.status(200).json({
        success: true,
        message: 'お問い合わせを受け付けました',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // バリデーションエラーの場合
        const validationErrors = error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        }));
        
        return next(
          new AppError(422, 'VALIDATION_ERROR', 'バリデーションエラー', {
            validationErrors,
          })
        );
      }
      
      // その他のエラー
      logger.error('Error submitting contact form', { error });
      return next(
        new AppError(500, 'SERVER_ERROR', '問い合わせの送信に失敗しました')
      );
    }
  }
} 