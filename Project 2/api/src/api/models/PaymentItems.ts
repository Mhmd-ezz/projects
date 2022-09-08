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
@Entity('payment_items')
export class PaymentItems extends BaseModel {

    @PrimaryGeneratedColumn({name: 'payment_item_id'})
    public paymentItemId: number;

    @Column({name: 'order_product_id'})
    public orderProductId: number;

    @Column({name: 'payment_id'})
    public paymentId: number;

    @Column({name: 'total_amount'})
    public totalAmount: number;

    @Column({name: 'product_name'})
    public productName: string;

    @Column({name: 'product_quantity'})
    public productQuantity: number;

    @Column({name: 'product_price'})
    public productPrice: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
