/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import moment = require('moment');
@Entity('product_price_log')
export class ProductPriceLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'product_price_log_id'})
    public productPriceLogId: number;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'price_update_file_log_id'})
    public priceUpdateFileLogId: number;

    @Column({name: 'sku'})
    public sku: string;

    @Column({name: 'price'})
    public price: number;

    @Column({name: 'discount_price'})
    public discountPrice: number;

    @Column({name: 'discount_start_date'})
    public discountStartDate: Date;

    @Column({name: 'discount_end_date'})
    public discountEndDate: Date;

    @Column({name: 'special_price'})
    public specialPrice: number;

    @Column({name: 'special_start_date'})
    public specialStartDate: Date;

    @Column({name: 'special_end_date'})
    public specialEndDate: Date;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
