/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';

@Entity('product_translation')
export class ProductTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'translation_id' })
    @IsNotEmpty()
    public translationdId: number;

    @Column({ name: 'language_code' })
    public languageCode: string;

    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description' })
    public description: string;

    @ManyToOne(type => Product, product => product.productRating)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
