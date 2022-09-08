/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsEmail , IsString } from 'class-validator';
export class CustomerCheckoutRequest {
    @IsNotEmpty({
        message: 'Shipping First name is required',
    })
    public shippingFirstName: string;

    public shippingLastName: string;
    @IsNotEmpty({
        message: 'Shipping Address 1 is required',
    })
    public shippingAddress_1: string;
    @IsNotEmpty({
        message: 'Shipping City is required',
    })
    @IsString()
    public shippingCity: string;

    @IsNotEmpty({
        message: 'Shipping Post Code is required',
    })
    public shippingPostCode: string;

    @IsNotEmpty({
        message: 'Shipping Zone is required',
    })
    public shippingZone: string;

    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: string;

    @IsEmail()
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;
    public shippingAddress_2: string;
    public shippingCompany: string;
    public shippingAddressFormat: string;

    public password: string;
    public paymentMethod: number;

    public couponCode: string;
    public couponDiscountAmount: number;
    public couponData: string;

    @IsNotEmpty()
    public productDetails: [];
}
