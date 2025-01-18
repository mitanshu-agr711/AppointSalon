import { PayUClient } from 'payu-websdk';

export const PayData = {
  payu_key: process.env.NEXT_PUBLIC_PAYU_KEY!,
  payu_salt: process.env.NEXT_PUBLIC_PAYU_SALT!,
  payu_client: new PayUClient({
    key: process.env.NEXT_PUBLIC_PAYU_KEY!,
    salt: process.env.NEXT_PUBLIC_PAYU_SALT!,
    environment: 'sandbox', // Or 'LIVE' depending on your environment
  }),
};

