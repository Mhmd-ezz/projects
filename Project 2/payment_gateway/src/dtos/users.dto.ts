import { IsEmail, IsString, IsNotEmpty, ValidateNested, IsDefined } from 'class-validator';
import Stripe from 'stripe';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
