/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Like } from 'typeorm/index';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Customer } from '../models/Customer';

@Service()
export class CustomerService {

    constructor(@OrmRepository() private customerRepository: CustomerRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create customer
    public async create(customer: Customer): Promise<Customer> {
        this.log.info('Create a new customer ');
        return this.customerRepository.save(customer);
    }

    // find Condition
    public findOne(conditions: any): Promise<Customer> {
        return this.customerRepository.findOne(conditions);
    }

    // find Condition
    public findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    // update customer
    public update(id: any, customer: Customer): Promise<Customer> {
        customer.id = id;
        return this.customerRepository.save(customer);
    }
    // customer List
    public list(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number | boolean): Promise<any> {
        const condition: any = {};

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

        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;

        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.customerRepository.count(condition);
        } else {
            return this.customerRepository.find(condition);
        }
    }
    // delete customer
    public async delete(id: number): Promise<any> {
        return await this.customerRepository.delete(id);
    }
    // today customer count
    public async todayCustomerCount(todaydate: string): Promise<any> {

        return await this.customerRepository.TodayCustomerCount(todaydate);

    }
}
