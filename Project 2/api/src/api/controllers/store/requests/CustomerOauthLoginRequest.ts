/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , IsEmail } from 'class-validator';

export class CustomerOauthLogin {
    @IsEmail({}, {
        message: 'Please give valid emailId',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    public source: string;

    public oauthData: string;
}
