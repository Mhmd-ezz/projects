import { ISQSEvent } from './../common/interfaces/sqsEvent.interface';
import { Payment } from './../infrastructure/models/payments';
import { PaymentStatusEnum } from './../infrastructure/enum/order_status.enum';
import { IPaymentView } from '../common/interfaces/paymentView.interface';
import { ProviderEnum } from './../infrastructure/enum/provider.enum';
import { intAmountToFloat } from './../utils/util';
import Stripe from 'stripe';

import HttpException from '../exceptions/HttpException';
import PaymentRepository from '../infrastructure/repository/payment.repository';
import PaymentSQSService from '../services/sqs/payment-sqs.service';

var Q = require("q");

class StripeWebhooks {

    private paymentSQSService = new PaymentSQSService();
    private paymentRepository = new PaymentRepository();


    public async paymentIntentCreated(paymentIntent: Stripe.PaymentIntent): Promise<any> {
        try {

            var deferred = Q.defer();

            // @ DELETE ME: only used for stripe cli event trigger when testing
            if (paymentIntent.livemode == false && !paymentIntent.metadata.orderId)
                paymentIntent.metadata['orderId'] = "123"

            const payment: IPaymentView = {
                orderId: paymentIntent.metadata.orderId,
                provider: ProviderEnum.stripe,
                isConfirmed: false,
                isPaid: false,
                status: paymentIntent.status,
                amount: intAmountToFloat(paymentIntent.amount),
                currency: paymentIntent.currency,
                createdAt: new Date().toISOString(),
            };

            const sqsEvent: ISQSEvent<IPaymentView> = {
                event: "payment.created",
                data: payment
            }

            await this.paymentSQSService.addToPaymentQueue(sqsEvent);
            deferred.resolve();

        } catch (error) {
            throw new HttpException(500, ` Error: ${error}`);
        }

    }

    public async paymentIntentCanceled(paymentIntent: Stripe.PaymentIntent): Promise<any> {
        try {

            var deferred = Q.defer();

            // @ DELETE ME WHEN STRIPE CLI TRIGGER IS NO LONGER USED FOR TESTING
            if (paymentIntent.livemode == false && !paymentIntent.metadata.orderId)
                paymentIntent.metadata['orderId'] = "123";

            //-------------------------------------------------------------
            // @ Database Operation
            //-------------------------------------------------------------

            const paymentModel: Payment = await this.paymentRepository.getByOrderId(paymentIntent.metadata.orderId);
            if (!paymentModel)
                throw new HttpException(400, "Payment doesn't exist.")

            paymentModel.canceledAt = new Date(paymentIntent.canceled_at).toJSON();
            paymentModel.cancellationReason = paymentIntent.cancellation_reason;
            paymentModel.status = paymentIntent.status;

            await this.paymentRepository.upsert(paymentModel);

            //-------------------------------------------------------------
            // @ SQS Operation
            //-------------------------------------------------------------

            const payment: IPaymentView = {
                orderId: paymentIntent.metadata.orderId,
                provider: ProviderEnum.stripe,
                isConfirmed: paymentModel.isConfirmed,
                isPaid: paymentModel.isPaid,
                status: paymentModel.status,
                amount: intAmountToFloat(paymentModel.amount),
                currency: paymentModel.currency,
                canceledAt: new Date(paymentIntent.canceled_at).toJSON(),
                cancellationReason: paymentIntent.cancellation_reason,
                createdAt: paymentModel.createdAt,
            };

            const sqsEvent: ISQSEvent<IPaymentView> = {
                event: "payment.canceled",
                data: payment
            }

            await this.paymentSQSService.addToPaymentQueue(sqsEvent);

            deferred.resolve();

        } catch (error) {
            throw new HttpException(500, ` Error: ${error}`);
        }

    }

    public async paymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<any> {
        try {

            var deferred = Q.defer();

            // @ DELETE ME WHEN STRIPE CLI TRIGGER IS NO LONGER USED FOR TESTING
            if (paymentIntent.livemode == false && !paymentIntent.metadata.orderId)
                paymentIntent.metadata['orderId'] = "123";

            //-------------------------------------------------------------
            // @ Database Operation
            //-------------------------------------------------------------

            const paymentModel: Payment = await this.paymentRepository.getByOrderId(paymentIntent.metadata.orderId);
            if (!paymentModel)
                throw new HttpException(400, "Payment doesn't exist.")

            paymentModel.status = paymentIntent.status;
            paymentModel.isPaid = true;

            await this.paymentRepository.upsert(paymentModel);

            //-------------------------------------------------------------
            // @ SQS Operation
            //-------------------------------------------------------------

            const payment: IPaymentView = {
                orderId: paymentIntent.metadata.orderId,
                provider: ProviderEnum.stripe,
                isConfirmed: paymentModel.isConfirmed,
                isPaid: paymentModel.isPaid,
                status: paymentModel.status,
                amount: intAmountToFloat(paymentModel.amount),
                currency: paymentModel.currency,
                createdAt: paymentModel.createdAt,
            };

            const sqsEvent: ISQSEvent<IPaymentView> = {
                event: "payment.successded",
                data: payment
            }

            await this.paymentSQSService.addToPaymentQueue(sqsEvent);

            deferred.resolve();

        } catch (error) {
            throw new HttpException(500, ` Error: ${error}`);
        }

    }

    public async paymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<any> {
        try {

            var deferred = Q.defer();

            // @ DELETE ME WHEN STRIPE CLI TRIGGER IS NO LONGER USED FOR TESTING
            if (paymentIntent.livemode == false && !paymentIntent.metadata.orderId)
                paymentIntent.metadata['orderId'] = "123";

            //-------------------------------------------------------------
            // @ Database Operation
            //-------------------------------------------------------------

            const paymentModel: Payment = await this.paymentRepository.getByOrderId(paymentIntent.metadata.orderId);
            if (!paymentModel)
                throw new HttpException(400, "Payment doesn't exist.")

            paymentModel.status = paymentIntent.status;
            paymentModel.isPaid = false;

            await this.paymentRepository.upsert(paymentModel);

            //-------------------------------------------------------------
            // @ SQS Operation
            //-------------------------------------------------------------

            const payment: IPaymentView = {
                orderId: paymentIntent.metadata.orderId,
                provider: ProviderEnum.stripe,
                isConfirmed: paymentModel.isConfirmed,
                isPaid: paymentModel.isPaid,
                status: paymentModel.status,
                amount: intAmountToFloat(paymentModel.amount),
                currency: paymentModel.currency,
                createdAt: paymentModel.createdAt,
            };

            const sqsEvent: ISQSEvent<IPaymentView> = {
                event: "payment.failed",
                data: payment
            }

            await this.paymentSQSService.addToPaymentQueue(sqsEvent);

            deferred.resolve();

        } catch (error) {
            throw new HttpException(500, ` Error: ${error}`);
        }

    }
}

export default StripeWebhooks;