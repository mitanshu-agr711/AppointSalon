declare module 'payu-websdk' {
  export class PayUClient {
    constructor(config?: PayUClientConfig);
    initialize(): void;
    createTransaction(data: TransactionData): Promise<TransactionResponse>;
    // Add other methods from the SDK as needed.
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
    [key: string]: unknown;
  }

  export interface TransactionResponse {
    status: string;
    message: string;
    transactionId: string;
    [key: string]: unknown;
  }
}
