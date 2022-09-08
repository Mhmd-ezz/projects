/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import 'reflect-metadata';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateSellerAccountSettings {

    @IsNotEmpty()
    @IsInt()
    public accountType: number;

    @IsNotEmpty()
    @IsInt()
    public fees: number;

    @IsInt()
    @IsNotEmpty()
    public maxImages: number;

    @IsInt()
    @IsNotEmpty()
    public maxVideos: number;
}
