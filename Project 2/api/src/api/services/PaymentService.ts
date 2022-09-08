/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {PaymentRepository} from '../repositories/PaymentRepository';
import {Like} from 'typeorm/index';

@Service()
export class PaymentService {

    constructor(@OrmRepository() private paymentRepository: PaymentRepository) {
    }

    // create related product
    public async create(product: any): Promise<any> {

        const newProduct = await this.paymentRepository.save(product);
        return newProduct;
    }

    // find plugins
    public async findAll(plugins: any): Promise<any> {

        return await this.paymentRepository.find(plugins);
    }

   // country List
   public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
    const condition: any = {};

    if (select && select.length > 0) {
        condition.select = select;
    }
    condition.where = {};

    if (whereConditions && whereConditions.length > 0) {
        whereConditions.forEach((item: any) => {
            condition.where[item.name] = item.value;
        });
    }

    if (search && search.length > 0) {
        search.forEach((table: any) => {
            const operator: string = table.op;
            if (operator === 'where' && table.value !== '') {
                condition.where[table.name] = table.value;
            } else if (operator === 'like' && table.value !== '') {
                condition.where[table.name] = Like('%' + table.value + '%');
            }
        });
    }

    if (limit && limit > 0) {
        condition.take = limit;
        condition.skip = offset;
    }
    if (count) {
        return this.paymentRepository.count(condition);
    } else {
        return this.paymentRepository.find(condition);
    }
    }
    // delete plugin
    public async delete(id: any): Promise<any> {

        const newProduct = await this.paymentRepository.delete(id);
        return newProduct;
    }

    // find one plugin
    public findOne(plugins: any): Promise<any> {
        return this.paymentRepository.findOne(plugins);
    }
}
