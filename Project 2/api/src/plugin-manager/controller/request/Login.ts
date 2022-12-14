/*
 * ocrafter marketplace API
 * version 2.2
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class Login {

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;
}
