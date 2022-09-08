/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
export class CreateCartRequest {

    public productId: number;

    public productPrice: number;

    public quantity: number;

    public optionName: string;

    public optionValueName: string;

    public type: string;
}
