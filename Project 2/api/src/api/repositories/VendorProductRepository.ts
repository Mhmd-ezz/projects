/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorProducts } from '../models/VendorProducts';
import { VendorOrders } from '../models/VendorOrders';

@EntityRepository(VendorProducts)
export class VendorProductsRepository extends Repository<VendorProducts>  {

    public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrders');
        query.select(['SUM(orderProduct.quantity) as soldCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount', 'orderProduct.product_id as product']);
        query.leftJoin('vendorOrders.order', 'order');
        query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
        query.where('vendorOrders.vendorId = :id',  { id});
        // query.andWhere('order.paymentStatus = :value1', {value1: 1});
        if (duration === 1 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrders.created_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('MONTH(vendorOrders.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('YEAR(vendorOrders.created_date) = YEAR(NOW())');
        }
        query.groupBy('product');
        query.orderBy('soldCount', 'DESC');
        query.limit(limit);
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async vendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productId', 'product.is_active as isActive']);
        query.leftJoin('vendorProducts.product', 'product');
        query.where('vendorProducts.vendorId = :id',  { id});
        query.andWhere('product.isActive = :isActive',  { isActive: 1});
        query.limit(limit);
        query.offset(offset);
        console.log(query.getQuery());
        return query.getRawMany();
    }
}
