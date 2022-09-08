/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {Vendor} from './Vendor';
import {Order} from './Order';
import {OrderStatus} from './OrderStatus';
import {VendorOrderProducts} from './VendorOrderProducts';
import {DeliveryAllocation} from './DeliveryAllocation';
import {VendorOrderStatus} from './VendorOrderStatus';
import {OrderProduct} from './OrderProduct';
import { VendorPayment } from './VendorPayment';

@Entity('vendor_orders')
export class VendorOrders extends BaseModel {

    @PrimaryGeneratedColumn({name: 'vendor_order_id'})
    public vendorOrderId: number;

    @Column({name: 'sub_order_id'})
    public subOrderId: string;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'sub_order_status_id'})
    public subOrderStatusId: number;

    @Column({name: 'order_product_id'})
    public orderProductId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'total'})
    public total: number;

    @Column({name: 'commission'})
    public commission: number;

    @Column({name: 'tracking_url'})
    public trackingUrl: string;

    @Column({name: 'tracking_no'})
    public trackingNo: string;

    @ManyToOne(type => Vendor, vendor => vendor.vendororder)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.vendorOrders)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => VendorOrderStatus, vendorOrderStatus => vendorOrderStatus.vendorOrders)
    @JoinColumn({ name: 'sub_order_status_id' })
    public orderStatus: OrderStatus[];

    @ManyToOne(type => Order, order => order.vendorOrders)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @OneToOne(type => Order)
    @JoinColumn({ name: 'order_id' })
    public orderDetail: Order;

    @OneToOne(type => OrderProduct)
    @JoinColumn({ name: 'order_product_id' })
    public orderProductDetail: OrderProduct;

    @OneToMany(type => VendorOrderProducts, vendorOrderProducts => vendorOrderProducts.vendororder)
    public vendororderproducts: VendorOrderProducts[];

    @OneToMany(type => DeliveryAllocation, deliveryAllocation => deliveryAllocation.vendorOrders)
    public deliveryAllocation: DeliveryAllocation[];

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendorOrders)
    public vendorPayment: VendorPayment[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
