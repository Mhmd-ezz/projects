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
import {AmbassadorRepository} from '../repositories/AmbassadorRepository';
import { Ambassador } from '../models/Ambassador';

@Service()
export class AmbassadorService {

    constructor(@OrmRepository() private ambassadorRepository: AmbassadorRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create ambassador
    public async create(ambassador: any): Promise<Ambassador> {
        this.log.info('Create a new ambassador ');
        return this.ambassadorRepository.save(ambassador);
    }

    // find Condition
    public findOne(ambassador: any): Promise<Ambassador> {
        return this.ambassadorRepository.findOne(ambassador);
    }

    // find Condition
    public findAll(): Promise<Ambassador[]> {
        return this.ambassadorRepository.find();
    }

    // update ambassador
    public update(id: any, ambassador: Ambassador): Promise<Ambassador> {
        ambassador.ambassadorId = id;
        return this.ambassadorRepository.save(ambassador);
    }
    // ambassador List
    public list(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number|boolean): Promise<any> {
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
            return this.ambassadorRepository.count(condition);
        } else {
            return this.ambassadorRepository.find(condition);
        }
    }

    // ambassador list
    public async ambassadorList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [],  count: number | boolean): Promise<any> {
        return await this.ambassadorRepository.getList(limit, offset, select, searchConditions, whereConditions, count);
    }
    // delete ambassador
    public async delete(id: number): Promise<any> {
        return await this.ambassadorRepository.delete(id);
    }
}
