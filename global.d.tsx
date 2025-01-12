

declare global {
    interface Window {
      Paytm: {
        CheckoutJS: {
          init: (config: object) => Promise<void>;
          invoke: () => void;
        };
      };
    }
  }
  
  export {};
  