import { plainToClass } from "class-transformer";
import { Buyer } from "../infrastructure/models/buyer";
import { Seller } from "../infrastructure/models/seller";
import Stripe from "stripe";
import HttpException from "../exceptions/HttpException";

export class PaymentsUtil {

    public createCardCheckoutObject = (buyerModel, sellerModel, cardId, amount, orderId): Stripe.PaymentIntentCreateParams => {

        try {

            let buyer = plainToClass(Buyer, buyerModel);
            // const buyerCheckoutDetails = buyer.getCheckoutDetails(cardId);

            const card = buyer.getCard(cardId);
            const stripeCardId = buyer.getStpCardIdByCardId(cardId);
            if (!stripeCardId || !card)
                throw new HttpException(500, `Couldn't find card with id: ${cardId}.`)

            const stripeCustomeId = buyer.stripe.id;
            if (!stripeCustomeId)
                throw new HttpException(500, "Stripe customer wasn't found.")

            let seller = plainToClass(Seller, sellerModel);
            const sellerStripeId = seller.getStripeId();
            if (!sellerStripeId)
                throw new HttpException(500, "Seller wasn't found.")

            // @ TODO: calculate fees and update amount
            let paymentIntent: Stripe.PaymentIntentCreateParams = {
                customer: stripeCustomeId,
                payment_method: stripeCardId,
                payment_method_types: ['card'],
                confirmation_method: 'manual',
                confirm: false,
                amount: amount,
                currency: 'usd',
                metadata: { "orderId": orderId },                
                // application_fee_amount: 200,
                on_behalf_of: sellerStripeId,
                transfer_data: {
                    amount: amount,
                    destination: sellerStripeId,
                },
            }

            return paymentIntent;
        } catch (error) {
            throw new HttpException(error.status || 500, error.message || error);

        }
    }
}