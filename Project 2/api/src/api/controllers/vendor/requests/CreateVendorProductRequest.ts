/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, IsDefined} from 'class-validator';

export class CreateVendorProductRequest {

    @IsNotEmpty()
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;

    // @IsNotEmpty()
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

    public price: number;

    public outOfStockStatus: number;

    // @IsNotEmpty()
    public requiredShipping: number;

    // @IsNotEmpty()
    public dateAvailable: string;

    @IsNotEmpty()
    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public vendorProductCommission: number;

    public productOptions: [];

    public productDiscount: [];

    public productSpecial: [];

    public productTranslation: [];

    @IsNotEmpty()
    @IsDefined()
    public vendorId: number;
}
