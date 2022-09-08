/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateAmbassadorRequest {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    // @IsNotEmpty()
    public mobileNumber: string;

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
