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
import { VendorProducts } from '../models/VendorProducts';
import { VendorProductsRepository } from '../repositories/VendorProductRepository';

@Service()
export class VendorProductService {

    constructor(
        @OrmRepository() private vendorProductsRepository: VendorProductsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find user
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.vendorProductsRepository.findOne(findCondition);
    }

    // user list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
        console.log(keyword);
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorProductsRepository.count(condition);
        } else {
            return this.vendorProductsRepository.find(condition);
        }

    }

    // create user
    public async create(vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('Create a new vendorProducts => ', vendorProducts.toString());
        const newVendorProducts = await this.vendorProductsRepository.save(vendorProducts);
        return newVendorProducts;
    }

    // update user
    public update(id: any, vendorProducts: VendorProducts): Promise<VendorProducts> {
        this.log.info('Update a VendorProducts');
        vendorProducts.vendorProductId = id;
        return this.vendorProductsRepository.save(vendorProducts);
    }

    // delete user
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a VendorProducts');
        const vendorProducts = await this.vendorProductsRepository.delete(id);
        return vendorProducts;
    }

    // find user
    public findAll(): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.find();
    }

     // find user
     public find(data: any): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.find(data);
    }

     // find user
     public findVendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {
        this.log.info('Find all VendorProducts');
        return this.vendorProductsRepository.vendorActiveProduct(id, limit, offset);
    }

     // Top selling product
     public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {
        return await this.vendorProductsRepository.topProductSelling(id, duration, limit);
    }
}
