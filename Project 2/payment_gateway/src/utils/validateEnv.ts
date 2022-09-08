import { cleanEnv, port, str, url } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    JWT_SECRET: str(),
    PORT: port(),

    STRIPE_PK: str(),
    STRIPE_SK: str(),
    REGION: str(),
    ENCRYPTION_KEY: str(),
    PAYMENT_QUEUE: url(),
    STRIPE_WEBHOOKS_SECRET: str(),

  });
}

export default validateEnv;
