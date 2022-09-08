/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MinLength, IsOptional} from 'class-validator';

export class VendorRegisterRequest {
    @IsNotEmpty({
        message: 'first name is required',
    })
    public firstName: string;

    public lastName: string;

    public contactPersonName: string;

    @MinLength(8, {
        message: 'password is minimum 8 character',
    })
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @MinLength(8, {
        message: 'Confirm password is minimum 8 character',
    })
    @IsNotEmpty({
        message: 'Confirm password is required',
    })
    public confirmPassword: string;

    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsOptional()
    public phoneNumber: string;

    public accountType: number; // 0: standard, 1: Premium, 2: Luxury

    public ambassadorCode: string;

    @IsNotEmpty({
        message: 'Shipping Country Id is required',
    })
    public shippingCountryId: number;
}
