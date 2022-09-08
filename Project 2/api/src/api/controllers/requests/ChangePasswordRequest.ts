/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , MinLength } from 'class-validator';

export class ChangePassword {

    // @MaxLength(15, {
    //     message: 'Old Password is maximum 15 character',
    // })
    @MinLength(8, {
        message: 'Old Password is minimum 8 character',
    })
    @IsNotEmpty()
    public oldPassword: string;

    // @MaxLength(15, {
    //     message: 'New Password is maximum 15 character',
    // })
    @MinLength(8, {
        message: 'New Password is minimum 8 character',
    })
    @IsNotEmpty({
        message: 'New Password is required',
    })
    public newPassword: string;
}
