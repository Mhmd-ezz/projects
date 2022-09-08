import { IsNotEmpty, ValidateNested, IsString, IsDefined } from "class-validator";
import Stripe from "stripe";

export class UpdateStripeCustomerDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oBuyerId: string;

    @ValidateNested()
    public customer: Stripe.CustomerUpdateParams
}


export class CreateStripeCustomerDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oBuyerId: string;

    @ValidateNested()
    @IsDefined()
    public customer: Stripe.CustomerCreateParams

}

