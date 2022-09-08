/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateProductRequest {

    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    // @IsNotEmpty()
    public upc: string;

    public productSlug: string;

    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: number;

    // @IsNotEmpty()
    public location: string;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    @IsNotEmpty()
    public status: number;

    public sortOrder: number;

    public defaultImage: number;

    public quantity: number;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public relatedProductId: string;

    public productOptions: [];

    public productDiscount: [];

    public productSpecial: [];
    
    public productTranslation: [];

}
