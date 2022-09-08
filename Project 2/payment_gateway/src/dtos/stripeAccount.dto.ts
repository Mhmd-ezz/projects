import { IsNotEmpty, ValidateNested, IsString, IsDefined } from "class-validator";
import Stripe from "stripe";

export class UpdateStripeAccountDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oSellerId: string;

    @ValidateNested()
    public account: Stripe.AccountUpdateParams
}

export class CreateStripeAccountDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oSellerId: string;

    @ValidateNested()
    @IsDefined()
    public account: Stripe.AccountCreateParams

}