/*
 * ocrafter marketplace API
 * version 2.3
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class EnquiryRequest {

    @IsNotEmpty()
    public serviceId: number;

    @IsNotEmpty()
    public name: string;

    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public mobile: number;

    public comments: string;

}
