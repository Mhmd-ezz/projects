/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { MinLength, IsEmail, IsNotEmpty} from 'class-validator';
export class VendorForgotPasswordRequest {
    @IsNotEmpty({
        message: 'Email is required',
    })
    @MinLength(4, {
        message: 'Email is minimum 4 character',
    })
    @IsEmail()
    public email: string;
}
