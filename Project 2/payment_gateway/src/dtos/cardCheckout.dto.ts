import { IsNotEmpty, ValidateNested, IsString, IsDefined, IsInt } from "class-validator";
import Stripe from "stripe";

export class CardCheckoutDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oBuyerId: string;

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oSellerId: string;

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public cardId: string;

    @IsNotEmpty()
    @IsInt()
    @IsDefined()
    public amount: number;

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public orderId: string;
}



