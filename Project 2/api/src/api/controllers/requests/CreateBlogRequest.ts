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
import { IsNotEmpty } from 'class-validator';

export class CreateBlog {

    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    public categoryId: number;

    @IsNotEmpty()
    public description: string;

    public image: string;

    @IsNotEmpty()
    public status: number;

    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;
}
