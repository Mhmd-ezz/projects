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
import {Order} from './Order';
import {CouponUsage} from './CouponUsage';
import { OrderProduct } from './OrderProduct';

@Entity('coupon_usage_product')
export class CouponUsageProduct extends BaseModel {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'coupon_usage_id'})
    public couponUsageId: number;

    @Column({name: 'customer_id'})
    public customerId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'order_product_id'})
    public orderProductId: number;

    @Column({name: 'quantity'})
    public quantity: number;

    @Column({name: 'amount'})
    public amount: number;

    @Column({name: 'discount_amount'})
    public discountAmount: number;

    @ManyToOne(type => CouponUsage, couponUsage => couponUsage.couponUsageProduct)
    @JoinColumn({name: 'coupon_usage_id'})
    public couponUsage: CouponUsage[];

    @ManyToOne(type => Order, order => order.couponUsageProduct)
    @JoinColumn({name: 'order_id'})
    public order: Order[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.couponUsageProduct)
    @JoinColumn({name: 'order_product_id'})
    public orderProduct: OrderProduct[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
