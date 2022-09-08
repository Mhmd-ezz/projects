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
import { SellerAccountSettingsRepository } from '../repositories/SellerAccountSettingsRepository';
import { SellerAccountSettings } from '../models/SellerAccountSettings';

@Service()
export class SellerAccountSettingsService {

    constructor(
        @OrmRepository() private sellerAccountSettingsRepository: SellerAccountSettingsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create model
    public async create(model: any): Promise<SellerAccountSettings> {
        this.log.info('Create a new seller account settings');
        return this.sellerAccountSettingsRepository.save(model);
    }

    // findCondition
    public findOne(model: any): Promise<any> {
        return this.sellerAccountSettingsRepository.findOne(model);
    }

    // update model
    public update(model: SellerAccountSettings): Promise<any> {
        return this.sellerAccountSettingsRepository.save(model);
    }

    // List
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

        condition.order = {};

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.sellerAccountSettingsRepository.count(condition);
        } else {
            return this.sellerAccountSettingsRepository.find(condition);
        }
    }

    // delete model
    public async delete(id: number): Promise<any> {
        return await this.sellerAccountSettingsRepository.delete(id);
    }
}
