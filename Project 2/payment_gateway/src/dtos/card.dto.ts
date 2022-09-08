import { IsNotEmpty, IsString, IsDefined, IsNotEmptyObject, ValidateNested, validate, IsInstance, IsInt } from "class-validator";
import { Type } from "class-transformer";

import "reflect-metadata";


export class CardDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public number: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public exp_month: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public exp_year: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public cvc: string;
}

export class CreateBuyerCardDto {

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    public oBuyerId: string;

    @IsDefined()
    @IsNotEmptyObject()
    @Type(() => CardDto)
    @ValidateNested()
    public card: CardDto

}