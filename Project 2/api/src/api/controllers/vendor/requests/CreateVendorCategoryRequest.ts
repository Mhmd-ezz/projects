/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class CreateVendorCategoryRequest {
    @IsNotEmpty()
    public vendorId: number;

    @IsNotEmpty()
    public categoryId: string;

    public commission: number;
}
