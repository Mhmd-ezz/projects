import { env } from './../config';
// var SK;

// if (process.env.NODE_ENV != "production") {
//   const fs = require('fs')
//   const dotenv = require('dotenv')
//   const envConfig = dotenv.parse(fs.readFileSync('.env'))
//   SK = envConfig["STRIPE_SK"]
// } else {
//   SK = process.env.STRIPE_SK
// }

const SK = env.STRIPE_SK;

import Stripe from 'stripe';
import HttpException from '../exceptions/HttpException';
const stripe = new Stripe(SK, { apiVersion: "2020-03-02" });
// const stripe = require('stripe')(SK);

class StripeService {



  // ------------------------------------------------
  // @ Accounts
  // ------------------------------------------------

  // @ https://stripe.com/docs/api/accounts/list
  public async getAccounts(limit: number, ending_before: string, starting_after: string)
    : Promise<Stripe.ApiList<Stripe.Account>> {

    const params = {
      limit,
      ...(ending_before != null && { ending_before: ending_before }),
      ...(starting_after != null && { starting_after: starting_after }),
    }

    return stripe.accounts.list(params)
  }

  // @ https://stripe.com/docs/api/accounts/retrieve
  public async getAccount(accountId: string): Promise<Stripe.Account> {
    return stripe.accounts.retrieve(accountId)
  }

  // @ https://stripe.com/docs/api/accounts/update
  public async updateAccount(accountId: string, account: Stripe.AccountUpdateParams): Promise<Stripe.Account> {
    return stripe.accounts.update(accountId, account)
  }

  // @ https://stripe.com/docs/api/accounts/create
  public async createAccount(account: Stripe.AccountCreateParams): Promise<Stripe.Account> {
    return stripe.accounts.create(account)
  }

  // @ https://stripe.com/docs/api/accounts/update
  public async getAccountBalance(accountId: string): Promise<Stripe.Balance> {
    return stripe.balance.retrieve({ stripeAccount: accountId })
  }

  // ------------------------------------------------
  // @ Customer
  // ------------------------------------------------

  // @ https://stripe.com/docs/api/customers/retrieve
  public async getCustomer(customerId: string): Promise<Stripe.Customer> {
    return stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>;
  }

  // @ https://stripe.com/docs/api/customers/create
  public async createCustomer(customer: Stripe.CustomerCreateParams): Promise<Stripe.Customer> {
    return stripe.customers.create(customer);
  }

  // @ https://stripe.com/docs/api/customers/update
  public async updateCustomer(customerId: string, customer: Stripe.CustomerUpdateParams): Promise<Stripe.Customer> {
    return stripe.customers.update(customerId, customer);
  }

  // @ https://stripe.com/docs/api/tokens/create_card
  public async createCard(card: Stripe.TokenCreateParams.Card): Promise<Stripe.Token> {
    return stripe.tokens.create({ card });
  }

  // @ https://stripe.com/docs/api/sources/attach
  public async attachCardToCustomer(customerId: string, cardId: string): Promise<Stripe.CustomerSource> {
    return stripe.customers.createSource(customerId, { source: cardId });
  }

  // @ https://stripe.com/docs/api/payment_intents/create
  public async createCardPaymentIntents(payment: Stripe.PaymentIntentCreateParams): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.create(payment);
  }

  // @ https://stripe.com/docs/api/payment_intents/confirm
  public async confirmCardPayment(paymentId: string): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.confirm(paymentId);
  }

  public async cancelPaymentIntent(paymentId: string, cancellationReason: Stripe.PaymentIntentCancelParams.CancellationReason): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.cancel(paymentId, { cancellation_reason: cancellationReason });
  }

  public async checkWebhooksSignature(body, signature): Promise<Stripe.Event> {

    // const endpointSecret = 'whsec_L6qULSQciM6plXXOmXKURnUBnQ9QP9ux';
    const endpointSecret = env.STRIPE_WEBHOOKS_SECRET;

    try {
      return await stripe.webhooks.constructEvent(body, signature, endpointSecret);
    }
    catch (err) {
      throw new HttpException(400, `Webhook Error: ${err.message}`);
    }
  }
}

export default StripeService;
