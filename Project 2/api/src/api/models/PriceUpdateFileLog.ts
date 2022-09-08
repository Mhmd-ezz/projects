/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import moment = require('moment');
@Entity('price_update_file_log')
export class PriceUpdateFileLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'vendor_id'})
    public vendorId: number;

    @Column({name: 'title'})
    public title: string;

    @Column({name: 'file'})
    public file: string;

    @Column({name: 'file_path'})
    public filePath: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
