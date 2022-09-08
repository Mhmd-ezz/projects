/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Vendor } from './Vendor';

@Entity('seller_account_settings')
export class SellerAccountSettings extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'seller_account_settings_id' })
    public sellerAccountSettingsId: number;

    @Column({ name: 'account_type' })
    public accountType: number;

    @Column({ name: 'fees' })
    public fees: number;

    @Column({ name: 'max_images' })
    public maxImages: number;

    @Column({ name: 'max_videos' })
    public maxVideos: number;

    @OneToMany(type => Vendor, x => x.sellerAccountSettings)
    public vendors: Vendor[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
