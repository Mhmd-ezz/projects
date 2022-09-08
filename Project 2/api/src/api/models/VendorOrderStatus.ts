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
import {VendorOrders} from './VendorOrders';
import {VendorOrderArchiveLog} from './VendorOrderArchiveLog';
import {VendorOrderArchive} from './VendorOrderArchive';

@Entity('vendor_order_status')
export class VendorOrderStatus extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'vendor_order_status_id' })
    public vendorOrderStatusId: number;

    @IsNotEmpty()
    @Column({ name: 'order_status_name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'color_code' })
    public colorCode: string;

    @OneToMany(type => VendorOrders, vendorOrder => vendorOrder.orderStatus)
    public vendorOrders: VendorOrders[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendorOrderStatus)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendorOrderStatus)
    public vendorOrderArchive: VendorOrderArchive[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
