/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class CreateOrderStatus {

    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;

    @IsNotEmpty()
    public colorCode: string;

    public priority: number;

    @IsNotEmpty()
    public status: number;

}
