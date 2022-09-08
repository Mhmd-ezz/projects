import { Router } from 'express';

import StripeController from '../controllers/stripe.controller';
import { CardCheckoutDto } from '../dtos/cardCheckout.dto';
import { CreateStripeAccountDto, UpdateStripeAccountDto } from '../dtos/stripeAccount.dto';
import { CreateStripeCustomerDto, UpdateStripeCustomerDto } from '../dtos/stripeCustomer.dto';
import Route from '../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateBuyerCardDto } from './../dtos/card.dto';
import { ConfirmCardPaymentDto } from '../dtos/confirmCardPayment.dto';
import { CancelCardPaymentDto } from '../dtos/cancelCardPayment.dto';


class StripeRoute implements Route {
  public path = '/stripe';
  public router = Router();
  public stripeController = new StripeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    // ------------------------------------------------------
    // @ Accounts
    // ------------------------------------------------------

    this.router.get(`${this.path}/accounts`, this.stripeController.getAccounts);
    this.router.get(`${this.path}/accounts/:oSellerId/balance`, this.stripeController.getAccountBalance);
    this.router.get(`${this.path}/accounts/:oSellerId`, this.stripeController.getAccount);
    this.router.post(`${this.path}/accounts`, validationMiddleware(CreateStripeAccountDto, true), this.stripeController.createAccount);
    this.router.put(`${this.path}/accounts`, validationMiddleware(UpdateStripeAccountDto, true), this.stripeController.updateAccount);


    // ------------------------------------------------------
    // @ Customers
    // ------------------------------------------------------
    this.router.get(`${this.path}/customers/:oBuyerId`, this.stripeController.getCustomer);
    this.router.post(`${this.path}/customers`, validationMiddleware(CreateStripeCustomerDto, true), this.stripeController.createCustomer);
    this.router.put(`${this.path}/customers`, validationMiddleware(UpdateStripeCustomerDto, true), this.stripeController.updateCustomer);
    this.router.post(`${this.path}/customers/addcard`, validationMiddleware(CreateBuyerCardDto, true), this.stripeController.addCustomerCard);

    // ------------------------------------------------------
    // @ Payments
    // ------------------------------------------------------
    this.router.post(`${this.path}/checkout`, validationMiddleware(CardCheckoutDto, false), this.stripeController.cardCheckout);
    this.router.put(`${this.path}/confirmCardPayment`, validationMiddleware(ConfirmCardPaymentDto, false), this.stripeController.confirmCardPayment);
    this.router.put(`${this.path}/cancelCardPayment`, validationMiddleware(CancelCardPaymentDto, false), this.stripeController.cancelCardPayment);

    // ------------------------------------------------------
    // @ Webhooks
    // ------------------------------------------------------
    this.router.post(`${this.path}/webhooks`, this.stripeController.webHooks);

  }
}

export default StripeRoute;
