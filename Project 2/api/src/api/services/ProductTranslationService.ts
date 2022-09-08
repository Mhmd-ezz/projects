import { ProductTranslation } from './../models/ProductTranslation';
import { ProductTranslationRepository } from './../repositories/ProductTranslationRepository';
/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class ProductTranslationService {
    constructor(
        @OrmRepository() private productTranslationRepository: ProductTranslationRepository
    ) { }

    // create a option data
    public async create(model: any): Promise<ProductTranslation> {
        return this.productTranslationRepository.save(model);
    }

    // find a data
    public findAll(query: any): Promise<ProductTranslation[]> {
        return this.productTranslationRepository.find(query);
    }

    // findone a data
    public findOne(id: any): Promise<ProductTranslation> {
        return this.productTranslationRepository.findOne(id);
    }
    // Option List
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.productTranslationRepository.count(condition);
        } else {
            return this.productTranslationRepository.find(condition);
        }
    }

    // delete Option
    public async delete(id: any): Promise<any> {
        await this.productTranslationRepository.delete(id);
        return;
    }
}
