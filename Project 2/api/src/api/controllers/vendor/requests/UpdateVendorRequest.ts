/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsDefined } from 'class-validator';

export class UpdateVendor {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsDefined()
    @IsNotEmpty()
    public mobileNumber: string;

    public avatar: string;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;

    @IsDefined()
    @IsNotEmpty()
    public sellerAccountSettingsId: number;

    public approvalFlag: number;

    public commission: number;

    public companyName: string;

    public companyLogo: string;

    public companyDescription: string;

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

    @IsDefined()
    @IsNotEmpty()
    public pincode: string;

    @IsDefined()
    @IsNotEmpty()
    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyGstNumber: string;

    public companyPanNumber: string;

    public paymentInformation: string;

}
