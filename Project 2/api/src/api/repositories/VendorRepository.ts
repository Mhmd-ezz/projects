/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from '../models/Vendor';
import { Customer } from '../models/Customer';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor>  {

    public async getByUsername(username: string, isActive: boolean, deleteFlag: boolean): Promise<Vendor> {

        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        // query.select(['SUM(orderProduct.total) as productPriceTotal', 'COUNT(orderProduct.orderId) as orderCount', 'SUM(orderProduct.quantity) as quantityCount', 'COUNT(DISTINCT(product.customer_id)) as buyerCount']);
        // query.select([]);
        query.innerJoin('vendor.customer', 'customer');
        // query.where('vendor.billingAddressCountryId = :countryId',  { countryId: billingCountryId});
        query.andWhere('customer.username = :value1', { value1: username });
        query.andWhere('customer.isActive = :value2', { value2: isActive ? 1 : 0 });
        query.andWhere('customer.deleteFlag = :value3', { value3: deleteFlag ? 1 : 0 });
        return query.getOne();
    }

    public async vendorList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        console.log(select);
        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && table.value !== '') {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }

        // Keyword Search
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('delete_flag = ' + table.value);
                    query.where(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'email' && table.value !== undefined && table.value !== '') {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('email LIKE ' + "'%" + table.value + "%'" + ' ');
                    query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'status' && table.value !== undefined && table.value !== '') {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('is_active = ' + table.value);
                    query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'name' && table.value !== undefined && table.value !== '') {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('first_name LIKE ' + "'%" + table.value + "%'" + ' ');
                    query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                }
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        query.orderBy('vendor.vendor_id', 'DESC');
        console.log(query.getQuery());
        if (count) {
            return query.getCount();
        }

        return query.getMany();
    }
}
