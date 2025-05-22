import { emailLayout } from './layout.js';
import type {
  EmailTemplate,
  MessageReceivedTemplateData,
  ProjectCommentTemplateData,
  SubscriptionPaymentFailedTemplateData,
} from './types.js';

export const messageReceivedTemplate = (data: MessageReceivedTemplateData): EmailTemplate => ({
  subject: `【FUNDIVE】${data.senderName}さんからメッセージが届きました`,
  html: emailLayout(`
    <h2>${data.recipientName}様</h2>
    <p>${data.senderName}さんからメッセージが届きました：</p>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0;">${data.message}</p>
    </div>
    <a href="${process.env.FRONTEND_URL}/messages/direct" class="button" style="color: #ffffff;">
      メッセージを確認する
    </a>
  `),
});

export const projectCommentTemplate = (data: ProjectCommentTemplateData): EmailTemplate => ({
  subject: `【FUNDIVE】${data.projectTitle}にコメントが届きました`,
  html: emailLayout(`
    <h2>${data.recipientName}様</h2>
    <p>プロジェクト「${data.projectTitle}」に${data.commenterName}さんからコメントが届きました。</p>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0;">${data.comment}</p>
    </div>
    <a href="${process.env.FRONTEND_URL}/messages/projects" class="button" style="color: #ffffff;">
      プロジェクトを確認する
    </a>
  `),
});

export const subscriptionPaymentFailedTemplate = (data: SubscriptionPaymentFailedTemplateData): EmailTemplate => ({
  subject: `【FUNDIVE】サブスクリプションの支払いに失敗しました`,
  html: emailLayout(`
    <h2>${data.recipientName}様</h2>
    <p>サブスクリプション（${data.planName}）の支払い処理に失敗しました。</p>
    <p>以下の理由が考えられます：</p>
    <ul>
      <li>クレジットカードの有効期限切れ</li>
      <li>クレジットカードの利用限度額超過</li>
      <li>クレジットカード情報の変更</li>
    </ul>
    <p>サービスの継続利用のため、お支払い方法の更新をお願いいたします。</p>
    <a href="${process.env.FRONTEND_URL}/subscription" class="button" style="color: #ffffff;">
      支払い方法を更新する
    </a>
  `),
}); 