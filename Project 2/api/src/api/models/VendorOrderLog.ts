/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {Vendor} from './Vendor';
import {Order} from './Order';

@Entity('vendor_orders_log')
export class VendorOrderLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'vendor_order_log_id'})
    public vendorOrderLogId: number;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'vendor_order_id'})
    public vendorOrderId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'sub_order_id'})
    public subOrderId: string;

    @Column({name: 'sub_order_status_id'})
    public subOrderStatusId: number;

    @Column({name: 'total'})
    public total: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendorOrderlog)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => Order, order => order.vendororderlog)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
