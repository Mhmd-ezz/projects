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
import {Product} from './ProductModel';

@Entity('customer_cart')
export class CustomerCart extends BaseModel {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'customer_id'})
    public customerId: number;

    @Column({name: 'name'})
    public name: number;

    @Column({name: 'quantity'})
    public quantity: string;

    @Column({name: 'product_price'})
    public productPrice: string;

    @Column({name: 'total'})
    public total: number;

    @Column({name: 'option_name'})
    public optionName: string;

    @Column({name: 'option_value_name'})
    public optionValueName: string;

    @ManyToOne(type => Product, product => product.cart)
    @JoinColumn({name: 'product_id'})
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
