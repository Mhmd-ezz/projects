/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class VendorProductRequest {

    @IsNotEmpty()
    public productName: string;

    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    public upc: string;

    public productSlug: string;

    public quantity: number;

    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: number;

    public location: string;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public others: number;

    public productOptions: [];

    public productDiscount: [];

    public productSpecial: [];

    public productTranslation: [];

    public isActive: true;
}
