/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import {VendorOrders} from './VendorOrders';
// import {PaymentItems} from './PaymentItems';
import {Vendor} from './Vendor';
import moment = require('moment');
@Entity('vendor_payment')
export class VendorPayment extends BaseModel {

    @PrimaryGeneratedColumn({name: 'vendor_payment_id'})
    public vendorPaymentId: number;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'vendor_order_id'})
    public vendorOrderId: number;

    @Column({name: 'payment_item_id'})
    public paymentItemId: number;

    @Column({name: 'amount'})
    public amount: number;

    @Column({name: 'commission_amount'})
    public commissionAmount: number;

    @ManyToOne(type => VendorOrders, vendorOrders => vendorOrders.vendorPayment)
    @JoinColumn({ name: 'vendor_order_id' })
    public vendorOrders: VendorOrders[];

    // @ManyToOne(type => PaymentItems)
    // @JoinColumn({ name: 'payment_item_id' })
    // public paymentItem: PaymentItems;

    @ManyToOne(type => Vendor, vendor => vendor.vendorPayment)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
