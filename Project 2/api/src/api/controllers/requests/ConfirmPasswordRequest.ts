/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty} from 'class-validator';
export class ConfirmPassword {
    
    @IsNotEmpty({
        message: 'username is required',
    })   
    // @IsEmail()
    public username: string;

    @IsNotEmpty({
        message: 'verificationCode is required',
    })       
    public verificationCode: string;

    @IsNotEmpty({
        message: 'newPassword is required',
    })   
    public newPassword: string;
}
