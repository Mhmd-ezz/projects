/*
 * ocrafter marketplace API
 * version 2.3
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

// Validation file for creating new service
import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class CreateService {
    @IsNotEmpty()
    public serviceCategoryId: string;

    @IsNotEmpty()
    public title: string;

    public description: string;

    public mobile: number;

    public price: number;

    public image: string;

    @IsNotEmpty()
    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;

    @IsNotEmpty()
    public status: number;

    public defaultImage: number;

}
