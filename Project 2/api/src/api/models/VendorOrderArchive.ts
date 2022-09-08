/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {Vendor} from './Vendor';
import {Order} from './Order';
import {OrderProduct} from './OrderProduct';
import {VendorOrderStatus} from './VendorOrderStatus';
import {VendorOrderArchiveLog} from './VendorOrderArchiveLog';

@Entity('vendor_order_archive')
export class VendorOrderArchive extends BaseModel {

    @PrimaryGeneratedColumn({name: 'vendor_order_archive_id'})
    public vendorOrderArchiveId: number;

    @Column({name: 'sub_order_id'})
    public subOrderId: string;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'sub_order_status_id'})
    public subOrderStatusId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    @Column({name: 'order_product_id'})
    public orderProductId: number;

    @Column({name: 'commission'})
    public commission: number;

    @Column({name: 'total'})
    public total: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendorOrderArchive)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.vendorOrderArchive)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => VendorOrderStatus, vendorOrderStatus => vendorOrderStatus.vendorOrderArchive)
    @JoinColumn({ name: 'sub_order_status_id' })
    public vendorOrderStatus: VendorOrderStatus[];

    @ManyToOne(type => Order, order => order.vendorOrderArchive)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendorOrderArchive)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
