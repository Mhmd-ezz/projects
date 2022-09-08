import { IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class StripeConnectedAccount {

    id: string
}

export class Seller {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    oSellerId: string;

    stripe: StripeConnectedAccount;

    getStripeId() {
        if (this.stripe && this.stripe.id)
            return this.stripe.id

        return null;
    }
}