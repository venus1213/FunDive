import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

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

// メール送信処理
export async function sendEmail(params: SendEmailParams): Promise<void> {
  try {
    const { to, subject, html, from = `"Fundive サポート" <${process.env.SMTP_FROM}>` } = params;

    console.log('SMTP設定:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM
    });

    console.log('メール送信試行:', {
      to,
      from,
      subject,
      htmlLength: html.length
    });

    // HTMLメールとして送信するための設定
    const htmlContent = html.split('\n').join('<br />');
    const textContent = html.replace(/<[^>]*>/g, ''); // HTMLタグを除去したプレーンテキスト版

    await transporter.sendMail({
      from,
      to,
      subject,
      html: htmlContent,
      text: textContent, // プレーンテキスト版も送信
    });

    logger.info('メール送信成功', {
      to,
      subject,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('メール送信失敗', {
      error: error instanceof Error ? error.message : '不明なエラー',
      to: params.to,
      subject: params.subject,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
} 