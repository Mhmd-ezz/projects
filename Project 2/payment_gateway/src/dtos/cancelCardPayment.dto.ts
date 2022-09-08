import { CancellationReasonEnum } from '../common/enum/cancellationReason.enum';
import { IsNotEmpty, ValidateNested, IsString, IsDefined, IsInt, IsEnum } from "class-validator";
import Stripe from "stripe";

export class CancelCardPaymentDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public orderId: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @IsEnum(CancellationReasonEnum)
    public cancellationReason: string;

}



