import { env } from './../config';
import { PaymentStatusEnum } from './../infrastructure/enum/order_status.enum';
import { StripeEventEnum } from './../infrastructure/enum/stripe_event.enum';
import { plainToClass } from 'class-transformer';
import { CardCheckoutDto } from '../dtos/cardCheckout.dto';
import { NextFunction, Request, Response } from 'express';

import { CreateStripeAccountDto, UpdateStripeAccountDto } from '../dtos/stripeAccount.dto';
import { CreateStripeCustomerDto } from '../dtos/stripeCustomer.dto';
import HttpException from '../exceptions/HttpException';
import { Buyer, Card } from '../infrastructure/models/buyer';
import { Payment, StripePayment } from '../infrastructure/models/payments';
import { Seller } from '../infrastructure/models/seller';
import BuyerRepository from '../infrastructure/repository/buyer.repository';
import PaymentRepository from '../infrastructure/repository/payment.repository';
import SellerRepository from '../infrastructure/repository/seller.repository';
import StripeService from '../services/stripe.service';
import { CreateBuyerCardDto } from './../dtos/card.dto';
import { ProviderEnum } from './../infrastructure/enum/provider.enum';
import { StripeConnectedAccount } from './../infrastructure/models/seller';
import { PaymentsUtil } from '../utils/payments';
import { encrypt } from './../utils/encrypt';
import { generateObjectId } from './../utils/util';
import { validate } from 'class-validator';
import Stripe from 'stripe';

import { Consumer } from 'sqs-consumer';
import PaymentSQSService from '../services/sqs/payment-sqs.service';
import StripeWebhooks from '../webhooks/stripe.webhooks';
import { CancelCardPaymentDto } from 'dtos/cancelCardPayment.dto';

class StripeController {

  private stripeService = new StripeService();
  private stripeAccountRepository = new SellerRepository();
  private buyerRepository = new BuyerRepository();
  private paymentRepository = new PaymentRepository();
  private checkoutUtil = new PaymentsUtil();
  private stripeWebhooks = new StripeWebhooks();

  constructor() {

    // @ TEMPORARLY FOR TESTING
    const app = Consumer.create({
      messageAttributeNames: [
        "All"
      ],
      queueUrl: env.PAYMENT_QUEUE,

      handleMessage: async (message) => {
        console.log("[TESTING] : payment.fifo: ", message.Body)
      },
    });

    // app.start();
  }

  // ----------------------------------------------------------------------
  //  @ Accounts
  // ----------------------------------------------------------------------

  public getAccounts = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const limit = Number(req.query && req.query.limit ? req.query.limit : 1);
      const ending_before = req.query && req.query.ending_before ? String(req.query.ending_before) : null;
      const starting_after = req.query && req.query.starting_after ? String(req.query.starting_after) : null;

      const accounts = await this.stripeService.getAccounts(limit, ending_before, starting_after)

      res.status(200).json(accounts);

    } catch (error) {
      next(error);
    }
  }

  public getAccount = async (req: Request, res: Response, next: NextFunction) => {

    try {

      var oSellerId = req.params && req.params.oSellerId ? req.params.oSellerId : null;
      if (!oSellerId)
        return res.status(400).send("Seller id is required.")

      const sellerDetails: Seller = await this.stripeAccountRepository.getBySellerId(oSellerId);

      const account = await this.stripeService.getAccount(sellerDetails.stripe.id)

      res.status(200).json(account);

    } catch (error) {
      next(error);
    }
  }

  public createAccount = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oSellerId, account }: CreateStripeAccountDto = req.body;

      // @ Set stripe account metadata (Optional)
      account.metadata = Object.assign(account.metadata || {}, { oSellerId })

      // @ Check if conneted account is already exists
      const accountDetails: Buyer = await this.stripeAccountRepository.getBySellerId(oSellerId);
      if (accountDetails && accountDetails.stripe && accountDetails.stripe.id)
        return res.status(400).send("A connected account already exists.")

      // @ Create stripe account
      const createdAccount = await this.stripeService.createAccount(account);

      // @ Create new seller model
      const stripe = new StripeConnectedAccount();
      stripe.id = createdAccount.id;

      const model = new Seller();
      model.oSellerId = oSellerId;
      model.stripe = stripe;

      // @ Add Seller to db
      await this.stripeAccountRepository.upsert(model)

      res.status(200).json(createdAccount);

    } catch (error) {
      next(error);
    }
  }

  public updateAccount = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oSellerId, account }: UpdateStripeAccountDto = req.body;

      // @ Get seller details from dynamodb
      const sellerDetails: Seller = await this.stripeAccountRepository.getBySellerId(oSellerId);

      // @ Update stripe account
      const updatedAccount = await this.stripeService.updateAccount(sellerDetails.stripe.id, account);

      res.status(200).json(updatedAccount);

    } catch (error) {
      next(error);
    }
  }

  public getAccountBalance = async (req: Request, res: Response, next: NextFunction) => {

    try {

      var oSellerId = req.params && req.params.oSellerId ? req.params.oSellerId : null;
      if (!oSellerId)
        return res.status(400).send({ message: "Seller id is required." })

      // @ Get seller details from dynamodb
      const sellerDetails: Seller = await this.stripeAccountRepository.getBySellerId(oSellerId);

      // @ Get balance
      const account = await this.stripeService.getAccountBalance(sellerDetails.stripe.id);

      res.status(200).json(account);

    } catch (error) {
      next(error);
    }
  }



  // ----------------------------------------------------------------------
  //  @ Customers
  // ----------------------------------------------------------------------

  public getCustomer = async (req: Request, res: Response, next: NextFunction) => {

    try {

      var oBuyerId = req.params && req.params.oBuyerId ? req.params.oBuyerId : null;
      if (!oBuyerId)
        return res.status(400).send("Customer id is required.")

      const buyerDetails: Buyer = await this.buyerRepository.getByBuyerId(oBuyerId);

      if (buyerDetails == null || buyerDetails == undefined)
        throw new HttpException(404, `Failed to get buyer with id: ${oBuyerId}`);

      const customer = await this.stripeService.getCustomer(buyerDetails.stripe.id)

      res.status(200).json(customer);

    } catch (error) {
      next(error);
    }
  }

  public createCustomer = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oBuyerId, customer }: CreateStripeCustomerDto = req.body;

      // @ Check if customer account is already exists
      const customerDetails: Buyer = await this.buyerRepository.getByBuyerId(oBuyerId);
      if (customerDetails && customerDetails.stripe && customerDetails.stripe.id)
        return res.status(400).send("Customer account already exists.")

      // @ Set stripe customer metadata (Optional)
      customer.metadata = Object.assign(customer.metadata || {}, { oBuyerId })

      // @ Create stripe customer
      const createdCustomer = await this.stripeService.createCustomer(customer);

      // @ Create Buyer Model
      var buyer = new Buyer()
      buyer.oBuyerId = oBuyerId;
      buyer.stripe = { id: createdCustomer.id, payment_methods: [] };
      buyer.cards = [];

      // @ Add buyer to db
      await this.buyerRepository.upsert(buyer)

      res.status(200).json(createdCustomer);

    } catch (error) {
      next(error);
    }
  }

  public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oBuyerId, customer }: CreateStripeCustomerDto = req.body;

      // @ Get customer details from dynamodb
      const buyerDetails: Buyer = await this.buyerRepository.getByBuyerId(oBuyerId);

      // @ Update stripe customer
      const updatedAccount = await this.stripeService.updateCustomer(buyerDetails.stripe.id, customer);

      res.status(200).json(updatedAccount);

    } catch (error) {
      next(error);
    }
  }

  public addCustomerCard = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oBuyerId, card }: CreateBuyerCardDto = req.body;

      const buyerDetails: Buyer = await this.buyerRepository.getByBuyerId(oBuyerId);
      if (!buyerDetails || buyerDetails.stripe || buyerDetails.stripe.id)
        return res.status(404).send("Customer not found.")


      // @ Create card
      const source = await this.stripeService.createCard(card as any);

      // @ Attach card to customer
      await this.stripeService.attachCardToCustomer(buyerDetails.stripe.id, source.id)

      const mappedCard = new Card()
      mappedCard.id = generateObjectId();
      mappedCard.number = encrypt(card.number);
      mappedCard.exp_month = card.exp_month.toString();
      mappedCard.exp_year = card.exp_year.toString();
      mappedCard.cvc = encrypt(card.cvc);
      mappedCard.display = `**** **** **** ${source.card.last4}`;

      // @ Add card details to buyer
      buyerDetails.cards.push(mappedCard)

      // @ Add relation between -> stripe card  - persisted buyer card (gateway)
      buyerDetails.stripe.payment_methods.push({ cardId: mappedCard.id, srcId: source.card.id, tokenId: source.id })

      await this.buyerRepository.upsert(buyerDetails)

      res.status(200).json(source);

    } catch (error) {
      next(error);
    }
  }


  // ----------------------------------------------------------------------
  //  @ Card payment
  // ----------------------------------------------------------------------

  public getPayment = async (req: Request, res: Response, next: NextFunction) => {
  }

  public cardCheckout = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { oBuyerId, oSellerId, cardId, amount, orderId }: CardCheckoutDto = req.body;

      // @ Order payment should not exist.
      const paymentModel: Payment = await this.paymentRepository.getByOrderId(orderId);
      if (paymentModel)
        throw new HttpException(400, "Payment already created.")

      // @ Get buyer and seller details from db
      const { buyer: buyerModel, seller: sellerModel } = await this.buyerRepository.batchGetBuyerAndSeller(oSellerId, oBuyerId);

      // @ Prepare checkout object
      let paymentObject = this.checkoutUtil.createCardCheckoutObject(buyerModel, sellerModel, cardId, amount, orderId);

      // @ Send payment to stripe
      let stripePaymemntIntents = await this.stripeService.createCardPaymentIntents(paymentObject);

      // @ Add payment record in db
      const model_: Payment = {
        orderId: orderId,
        currency: paymentObject.currency,
        provider: ProviderEnum.stripe,
        isConfirmed: false,
        isPaid: false,
        status: PaymentStatusEnum.requires_confirmation,
        amount: amount,
        createdAt: new Date(stripePaymemntIntents.created).toJSON(),
        stripe: { id: stripePaymemntIntents.id }
      };

      let payment = plainToClass(Payment, model_);

      let isValid = await validate(payment);

      if (!!isValid && !isValid.length) {
        // @ LOG
      }
      else {
        await this.paymentRepository.create(payment);
      }

      res.status(200).json(stripePaymemntIntents);

    } catch (error) {
      next(error);
    }
  }

  public cancelCardPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { orderId, cancellationReason }: CancelCardPaymentDto = req.body;

      // @ Order payment should exist.
      const paymentModel: Payment = await this.paymentRepository.getByOrderId(orderId);
      if (paymentModel && paymentModel.stripe && paymentModel.stripe.id)
        throw new HttpException(400, "Payment doesn't exist.")

      await this.stripeService.cancelPaymentIntent(paymentModel.stripe.id, cancellationReason as any)

    } catch (error) {
      next(error);
    }
  }

  public confirmCardPayment = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let { orderId }: CardCheckoutDto = req.body;

      // @ Order payment should not exist.
      const paymentModel: Payment = await this.paymentRepository.getByOrderId(orderId);
      if (!paymentModel)
        throw new HttpException(404, "Order not found.")

      if (paymentModel.isConfirmed)
        throw new HttpException(400, "Order payment has already been confirmed.")

      paymentModel.isConfirmed = true;

      // @ Call confirm payment
      await this.stripeService.confirmCardPayment(paymentModel.stripe.id)

      await this.paymentRepository.upsert(paymentModel);

      res.status(200).json();

    } catch (error) {
      next(error);
    }
  }

  // ----------------------------------------------------------------------
  //  @ Webhooks
  // ----------------------------------------------------------------------
  public webHooks = async (req: Request, res: Response, next: NextFunction) => {

    const signature = req.headers['stripe-signature'];
    const rawBody = req['rawBody'];
    let event: Stripe.Event;
    try {

      // @ Verify incoming stripe payload
      event = await this.stripeService.checkWebhooksSignature(rawBody, signature);

      if (event.type == StripeEventEnum.paymentIntentCreated)
        await this.stripeWebhooks.paymentIntentCreated(event.data.object as Stripe.PaymentIntent);

      else if (event.type == StripeEventEnum.paymentIntentCanceled)
        await this.stripeWebhooks.paymentIntentCanceled(event.data.object as Stripe.PaymentIntent)

      else if (event.type == StripeEventEnum.paymentIntentSucceeded)
        await this.stripeWebhooks.paymentIntentCanceled(event.data.object as Stripe.PaymentIntent)

      else if (event.type == StripeEventEnum.paymentIntentFailed)
        await this.stripeWebhooks.paymentIntentCanceled(event.data.object as Stripe.PaymentIntent)

      res.json({ received: true });

    } catch (error) {
      next(error);
    }
  }



}

export default StripeController;




