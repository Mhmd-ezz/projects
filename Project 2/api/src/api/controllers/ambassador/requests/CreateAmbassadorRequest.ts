/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class CreateAmbassadorRequest {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    public email: string;

    // @IsNotEmpty()
    public mobileNumber: string;

    // @IsNotEmpty()
    // @MinLength(5, {
    //     message: 'password is minimum 5 character',
    // })
    public password: string;

    // @IsNotEmpty()
    public confirmPassword: string;

    public avatar: string;

    public commission: number;

    public address1: string;

    public address2: string;

    public city: string;

    public state: string;

    public countryId: number;

    public pincode: string;

    public paymentInformation: string;

}
