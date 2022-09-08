import { IsNotEmpty, IsString, IsDefined, IsNotEmptyObject, } from 'class-validator';

export class PaymentMethod {

    // @ Token source id returned created by stripe
    srcId: string;

    // @ Id returned created by stripe
    cardId: string;

    // @ Id returned created by stripe
    tokenId: string;
}

export class StripeCustomer {

    // @ Id returned created by stripe
    id: string;
    payment_methods: PaymentMethod[];
}


export class Card {

    id: string;
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    display: string;
}

export class Buyer {

    oBuyerId: string;
    stripe: StripeCustomer;
    cards: Card[];

    getCard(cardId: string) {
        if (!this.cards.length) return null;

        let card = this.cards.find(obj => obj.id == cardId);
        return !card ? null : card;
    }

    getStpCardIdByCardId(cardId: string) {
        if (!this.stripe || !this.stripe.payment_methods || !this.stripe.payment_methods.length || !this.cards.length)
            return null;

        let rel = this.stripe.payment_methods.find(obj => obj.cardId == cardId);
        return !rel ? null : rel.srcId;
    }

    getCheckoutDetails(cardId: string) {
        const card = this.getCard(cardId);
        const stripeCardId = this.getStpCardIdByCardId(cardId);
        const stripeCustomeId = this.stripe.id;

        if (!card || !stripeCardId || !stripeCustomeId) return null;

        return {
            card,
            stripeCardId,
            stripeCustomeId
        }
    }
}
