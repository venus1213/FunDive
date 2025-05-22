export type EmailTemplate = {
  subject: string;
  html: string;
};

export type MessageReceivedTemplateData = {
  recipientName: string;
  senderName: string;
  message: string;
};

export type ProjectCommentTemplateData = {
  recipientName: string;
  commenterName: string;
  projectTitle: string;
  comment: string;
};

export type SubscriptionPaymentFailedTemplateData = {
  recipientName: string;
  planName: string;
};

export type EmailTemplateData = 
  | { type: 'message_received'; data: MessageReceivedTemplateData }
  | { type: 'user_mentioned'; data: MessageReceivedTemplateData }
  | { type: 'project_comment'; data: ProjectCommentTemplateData }
  | { type: 'project_commented'; data: ProjectCommentTemplateData }
  | { type: 'subscription_payment_failed'; data: SubscriptionPaymentFailedTemplateData }; 