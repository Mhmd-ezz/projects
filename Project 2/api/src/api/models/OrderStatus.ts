/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment');
import {Order} from './Order';
import {VendorOrders} from './VendorOrders';
import {OrderProductLog} from './OrderProductLog';

@Entity('order_status')
export class OrderStatus extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'order_status_id' })
    public orderStatusId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'priority' })
    public priority: number;

    @OneToMany(type => Order, order => order.orderStatus)
    public statusOfOrder: Order[];

    @OneToMany(type => VendorOrders, vendorOrder => vendorOrder.orderStatus)
    public vendorOrders: VendorOrders[];

    @Column({ name: 'color_code' })
    public colorCode: string;

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.orderStatus)
    public orderProductLog: OrderProductLog[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
