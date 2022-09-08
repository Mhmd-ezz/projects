/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class UpdateSellerAccountSettings {

    @IsNotEmpty()
    public sellerAccountSettingsId: number;

    @IsNotEmpty()
    public accountType: number;

    @IsNotEmpty()
    public fees: number;

    @IsNotEmpty()
    public maxImages: number;
    
    @IsNotEmpty()
    public maxVideos: number;
}
