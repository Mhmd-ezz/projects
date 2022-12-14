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
@Entity('option_value_description')
export class OptionValueDescription extends BaseModel {

    @PrimaryGeneratedColumn({name: 'option_value_description_id'})
    public optionValueDescriptionId: number;

    @Column({name: 'option_value_id'})
    public optionValueId: number;

    @Column({name: 'language_id'})
    public languageId: number;

    @Column({name: 'option_id'})
    public optionId: number;

    @Column({name: 'name'})
    public name: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
