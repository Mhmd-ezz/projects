/*
 * ocrafter marketplace API
 * version 4.0
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {EntityRepository, Repository} from 'typeorm';
import {ProductSpecial} from '../models/ProductSpecial';

@EntityRepository(ProductSpecial)
export class ProductSpecialRepository extends Repository<ProductSpecial> {

    public async findSpecialPrice(productId: number, todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(ProductSpecial, 'productSpecial');
        query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd']);
        query.where('productSpecial.productId = ' + productId);
        query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', {todaydate});
        query.orderBy('productSpecial.priority', 'ASC');
        query.addOrderBy('productSpecial.price', 'ASC');
        query.limit('1');
        console.log(query.getQuery());
        return query.getRawOne();
    }
}
