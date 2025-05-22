import { User } from './user';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'convenience_store';

export type TransactionType = 'payment' | 'refund' | 'transfer' | 'adjustment';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  user?: User;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  paymentId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  stripeTransactionId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  payment?: Payment;
}

export interface ErrorLog {
  id: string;
  userId?: string;
  type: string;
  error: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface ProcessedStripeEvent {
  id: string;
  eventId: string;
  type: string;
  processedAt: string;
  createdAt: string;
} 