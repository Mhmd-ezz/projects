import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmCardPaymentDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public orderId: string;
}



