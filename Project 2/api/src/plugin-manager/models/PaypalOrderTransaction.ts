/*
 * ocrafter marketplace API
 * version 2.1
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from '../../api/models/BaseModel';
import moment = require('moment');
@Entity('paypal_order_transaction')
export class PaypalOrderTransaction extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'paypal_order_id' })
    public paypalOrderId: number;

    @Column({ name: 'payment_type' })
    public paymentType: string;

    @Column({ name: 'payment_data' })
    public paymentData: string;

    @Column({ name: 'payment_status' })
    public paymentStatus: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
