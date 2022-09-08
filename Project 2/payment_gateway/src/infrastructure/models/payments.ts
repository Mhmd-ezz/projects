import { ProviderEnum } from './../enum/provider.enum';
import { IsNotEmpty, IsString, IsDefined, IsEnum, IsBoolean, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import "reflect-metadata";

export class StripePayment {

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    id: string;
}

export class Payment {

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    orderId: string;

    @IsNotEmpty()
    @IsDefined()
    @IsEnum(ProviderEnum)
    provider: string;

    @IsOptional()
    @IsEnum(ProviderEnum)
    status: string;

    @IsBoolean()
    isConfirmed: boolean;

    @IsBoolean()
    isPaid: boolean;

    @IsInt()
    @IsNotEmpty()
    @IsDefined()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    currency: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    createdAt: string;

    @IsOptional()
    @IsString()
    canceledAt?: string;

    @IsOptional()
    @IsString()
    cancellationReason?: string;

    @Type(() => StripePayment)
    @ValidateNested()
    stripe: StripePayment;
}