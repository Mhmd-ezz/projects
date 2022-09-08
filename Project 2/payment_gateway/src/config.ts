import { defaultCipherList } from "constants";

// config.js
const dotenv = require('dotenv');
dotenv.config();

export const env = {
    STRIPE_PK: process.env.STRIPE_PK,
    STRIPE_SK: process.env.STRIPE_SK,
    REGION: process.env.REGION,
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    PORT: process.env.PORT,
    PAYMENT_QUEUE: process.env.PAYMENT_QUEUE,
    STRIPE_WEBHOOKS_SECRET: process.env.STRIPE_WEBHOOKS_SECRET,
};