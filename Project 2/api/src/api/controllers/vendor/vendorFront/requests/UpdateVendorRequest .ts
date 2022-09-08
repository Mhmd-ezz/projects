/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class UpdateVendorRequest {
    @IsNotEmpty({
        message: 'first name is required',
    })
    public firstName: string;

    @IsNotEmpty({
        message: 'last name is required',
    })
    public lastName: string;

    public avatar: string;

    public designation: string;

    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public email: string;

    @IsNotEmpty({
        message: 'mobile number is required',
    })
    public mobileNumber: string;

    public companyName: string;

    public companyLogo: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public companyState: string;

    @IsNotEmpty()
    public shippingCountryId: number;

    public shippingAddressState: string;

    public shippingAddressCity: string;

    public shippingAddressLine1: string;

    public shippingAddressLine2: string;

    public shippingAddressStreet: string;

    public shippingAddressNotes: string;

    // @ Billing
    public billingAddressCountryId: number;

    public billingAddressState: string;

    public billingAddressCity: string;

    public billingAddressLine1: string;

    public billingAddressLine2: string;

    public billingAddressStreet: string;

    public billingAddressNotes: string;

    public iban: string;

    public currency: string;

    public pincode: string;

    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyGstNumber: string;

    public companyPanNumber: string;

    public paymentInformation: string;

    public ambassadorCode: string;

    public accountType: number;
}
