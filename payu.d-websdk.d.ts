declare module 'payu-websdk' {
  export class PayUClient {
    constructor(config?: PayUClientConfig);
    initialize(): void;
    createTransaction(data: TransactionData): Promise<TransactionResponse>;

    // Add paymentInitiate method
    paymentInitiate(data: PaymentInitiateData): Promise<PaymentInitiateResponse>;
  }

  export interface PayUClientConfig {
    key: string;
    salt: string;
    environment?: 'sandbox' | 'production';
  }

  export interface TransactionData {
    amount: number;
    productInfo: string;
    firstName: string;
    email: string;
    phone: string;
    transactionId: string;
    callbackUrl: string;
    [key: string]: unknown; // Replaced `any` with `unknown`
  }

  export interface TransactionResponse {
    status: string;
    message: string;
    transactionId: string;
    [key: string]: unknown; // Replaced `any` with `unknown`
  }

  export interface PaymentInitiateData {
    txnid: string;
    amount: number;
    currency: string;
    productinfo: string;
    firstname: string;
    email: string;
    phone: string;
    surl: string;
    furl: string;
    hash: string;
  }

  export interface PaymentInitiateResponse {
    status: string;
    message: string;
    paymentId: string;
    [key: string]: unknown; // Replaced `any` with `unknown`
  }
}
