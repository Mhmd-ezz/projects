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
@Entity('payment')
export class Payment extends BaseModel {

    @PrimaryGeneratedColumn({name: 'payment_id'})
    public paymentId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'paid_date'})
    public paidDate: string;

    @Column({name: 'payment_number'})
    public paymentNumber: number;

    @Column({name: 'payment_information'})
    public paymentInformation: string;

    @Column({name: 'payment_amount'})
    public paymentAmount: number;

    @Column({name: 'payment_commission_amount'})
    public paymentCommissionAmount: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
