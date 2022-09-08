/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {VendorCoupon} from './VendorCoupon';

@Entity('vendor_coupon_product_category')
export class VendorCouponProductCategory extends BaseModel {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'vendor_coupon_id'})
    public vendorCouponId: number;

    @Column({name: 'type'})
    public type: number;

    @Column({name: 'reference_id'})
    public referenceId: number;

    @ManyToOne(type => VendorCoupon, vendorCoupon => vendorCoupon.vendorCouponProductCategory)
    @JoinColumn({name: 'vendor_coupon_id'})
    public vendorCoupon: VendorCoupon;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
