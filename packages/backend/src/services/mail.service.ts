import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import {
  messageReceivedTemplate,
  projectCommentTemplate,
  subscriptionPaymentFailedTemplate,
} from '../templates/email/templates.js';
import type { EmailTemplateData } from '../templates/email/types.js';

const prisma = new PrismaClient();

export class MailService {
  private transporter: nodemailer.Transporter;
  private retryCount = 3;
  private retryDelay = 1000; // 1秒

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private async sendMailWithRetry(mailOptions: nodemailer.SendMailOptions): Promise<boolean> {
    for (let i = 0; i < this.retryCount; i++) {
      try {
        await this.transporter.sendMail(mailOptions);
        return true;
      } catch (error) {
        console.error(`メール送信失敗 (試行 ${i + 1}/${this.retryCount}):`, error);
        if (i === this.retryCount - 1) return false;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * Math.pow(2, i)));
      }
    }
    return false;
  }

  private getEmailTemplate(templateData: EmailTemplateData) {
    switch (templateData.type) {
    case 'message_received':
      return messageReceivedTemplate(templateData.data);
    case 'project_comment':
    case 'project_commented':
      return projectCommentTemplate(templateData.data);
    case 'user_mentioned':
      return messageReceivedTemplate(templateData.data);
    case 'subscription_payment_failed':
      return subscriptionPaymentFailedTemplate(templateData.data);
    default:
      throw new Error('Unknown email template type');
    }
  }

  async sendNotificationEmail(userId: string, templateData: EmailTemplateData): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });

      if (!user?.email) {
        console.error('ユーザーのメールアドレスが見つかりません:', userId);
        return false;
      }

      const template = this.getEmailTemplate(templateData);

      return await this.sendMailWithRetry({
        from: `"Fundive サポート" <${process.env.SMTP_FROM}>`,
        to: user.email,
        subject: template.subject,
        html: template.html,
      });
    } catch (error) {
      console.error('通知メール送信エラー:', error);
      return false;
    }
  }
}

export const mailService = new MailService(); 