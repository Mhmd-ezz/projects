/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {Customer} from './Customer';
// import {VendorProducts} from './VendorProducts';
// import {VendorOrders} from './VendorOrders';
// import {VendorOrderLog} from './VendorOrderLog';
// import {VendorOrderArchive} from './VendorOrderArchive';
// import {VendorOrderArchiveLog} from './VendorOrderArchiveLog';
// import {VendorPayment} from './VendorPayment';
// import {VendorCoupon} from './VendorCoupon';

@Entity('ambassador')
export class Ambassador extends BaseModel {

    @PrimaryGeneratedColumn({name: 'ambassador_id'})
    public ambassadorId: number;

    @Column({name: 'ambassador_code'})
    public ambassadorCode: string;

    @Column({name: 'customer_id'})
    public customerId: number;

    @Column({name: 'commission'})
    public commission: number;

    @Column({name: 'address1'})
    public address1: string;

    @Column({name: 'address2'})
    public address2: string;

    @Column({name: 'city'})
    public city: string;

    @Column({name: 'state'})
    public state: string;

    @Column({name: 'country_id'})
    public countryId: number;

    @Column({name: 'pincode'})
    public pincode: string;

    @Column({name: 'payment_information'})
    public paymentInformation: string;

    @OneToOne(type => Customer)
    @JoinColumn({name: 'customer_id'})
    public customer: Customer;

    // @OneToMany(type => VendorProducts, vendorproducts => vendorproducts.product)
    // public vendorProducts: VendorProducts[];

    // @OneToMany(type => VendorOrders, vendororders => vendororders.vendor)
    // public vendororder: VendorOrders[];

    // @OneToMany(type => VendorOrderLog, vendororderlog => vendororderlog.vendor)
    // public vendororderlog: VendorOrderLog[];

    // @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendor)
    // public vendorOrderArchive: VendorOrderArchive[];

    // @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendor)
    // public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    // @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendor)
    // public vendorPayment: VendorPayment[];

    // @OneToMany(type => VendorCoupon, vendorCoupon => vendorCoupon.vendor)
    // public vendorCoupon: VendorCoupon[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
