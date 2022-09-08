/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { Order } from './Order';
import { OrderStatus } from './OrderStatus';
import { OrderProduct } from './OrderProduct';

@Entity('order_product_log')
export class OrderProductLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'order_product_log_id'})
    public orderProductLogId: number;

    @Column({name: 'order_product_id'})
    public orderProductId: number;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'name'})
    public name: string;

    @Column({name: 'model'})
    public model: string;

    @Column({name: 'quantity'})
    public quantity: number;

    @Column({name: 'product_price'})
    public productPrice: number;

    @Column({name: 'total'})
    public total: number;

    @Column({name: 'order_status_id'})
    public orderStatusId: number;

    @Column({name: 'tracking_url'})
    public trackingUrl: string;

    @Column({name: 'tracking_no'})
    public trackingNo: string;

    @Column({name: 'trace'})
    public trace: number;

    @Column({name: 'tax'})
    public tax: number;

    @Column({name: 'is_active'})
    public isActive: number;

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.orderProductLog)
    @JoinColumn({name: 'order_product_id'})
    public orderProduct: OrderProduct;

    @ManyToOne(type => Product, product => product.orderProductLog)
    @JoinColumn({name: 'product_id'})
    public product: Product;

    @ManyToOne(type => Order, order => order.orderProductLog)
    @JoinColumn({name: 'order_id'})
    public order: Order;

    @ManyToOne(type => OrderStatus, orderStatus => orderStatus.orderProductLog)
    @JoinColumn({name: 'order_status_id'})
    public orderStatus: OrderStatus;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
