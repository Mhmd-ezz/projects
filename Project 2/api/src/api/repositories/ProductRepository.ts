/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {EntityRepository, Repository} from 'typeorm';
import {Product} from '../models/ProductModel';
import {ProductToCategory} from '../models/ProductToCategory';
import {OrderProduct} from '../models/OrderProduct';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        console.log(select);
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && (table.value !== '' && table.value !== undefined)) {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && (table.value !== '' && table.value !== undefined)) {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && (table.value !== '' && table.value !== undefined)) {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }

        // Keyword Search
        if (categoryId) {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table: any) => {
                    const operator: string = table.op;
                    if (operator === 'inraw' && table.value !== undefined) {
                        const subQb = this.manager
                            .getRepository(ProductToCategory)
                            .createQueryBuilder('productToCategory')
                            .select('product_id')
                            .where('category_id = ' + table.value);
                        query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                });
            }
        }

        if (priceFrom && priceTo) {
            query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', {priceFrom, priceTo});
        }

        if (price) {
            query.orderBy('product.price', price === 1 ? 'ASC' : 'DESC');
        }

        query.orderBy('product.sortOrder', 'ASC');

        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        console.log(query.getQuery());
        if (count) {
            return query.getCount();
        }

        return query.getMany();
    }

    public async recentProductSelling(limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['COUNT(orderProduct.order_id) as ordercount', 'orderProduct.product_id as product']);
        query.groupBy('product');
        query.orderBy('ordercount', 'DESC');
        query.limit(limit);
        console.log(query.getQuery());
        return query.getRawMany();
    }

    // get product max price
    public async productMaxPrice(maximum: any): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(maximum);
        return query.getRawOne();
    }
    // custom product list
    public async customProductList(limit: number, offset: number, manufacturerId: number, categoryslug: string, keyword: string, priceFrom: string, priceTo: string, price: string): Promise<Product[]> {
console.log(manufacturerId , 'manufacturerId');
        let sql: any = 'SELECT p.tax_type as taxType, p.tax_value as taxValue, p.product_id as productId, p.price, p.keywords,  p.manufacturer_id as manufacturerId, p.sku, p.upc, p.quantity, p.stock_status_id as stockStatusId, p.manufacturer_id as manufacturerId, p.date_available as dateAvailable,' +
            ' p.sort_order as sortOrder, p.name, p.description, p.amount,  p.product_slug as productSlug, p.meta_tag_title as metaTagTitle, p.meta_tag_description as metaTagDescription, p.meta_tag_keyword as metaTagKeyword, p.rating , p.is_active as is_active,' +
            ' (SELECT price FROM product_discount pd2 WHERE pd2.product_id = p.product_id AND ((pd2.date_start <= NOW() AND  pd2.date_end >= NOW()))' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount,' + '(SELECT price FROM product_special ps WHERE ps.product_id = p.product_id AND  ((ps.date_start <= NOW() AND ps.date_end > NOW()))' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special' +
            ' ';

        if (categoryslug) {
            sql += 'FROM product_to_category p2c LEFT JOIN product p ON (p2c.product_id = p.product_id) ' +
            'LEFT JOIN vendor_product vp ON (p2c.product_id = vp.product_id) LEFT JOIN vendor v ON (vp.vendor_id = v.vendor_id) LEFT JOIN customer cs ON (v.customer_id = cs.id) LEFT JOIN category c ON (p2c.category_id = c.category_id) WHERE ((cs.is_active = 1 AND cs.delete_flag = 0) OR v.customer_id IS NULL)  AND c.category_slug = ' +  "'" + categoryslug + "'" +  ' ';
            sql += 'HAVING p.is_active = 1' + ' ';
        } else {
            sql += 'FROM product p LEFT JOIN vendor_product vp ON (p.product_id = vp.product_id) LEFT JOIN vendor v ON (vp.vendor_id = v.vendor_id) LEFT JOIN customer cs ON (v.customer_id = cs.id) WHERE ((cs.is_active = 1 AND cs.delete_flag = 0) OR v.customer_id IS NULL) AND p.is_active = 1' + ' ' ;
        }

        if (manufacturerId) {
            sql += 'AND p.manufacturer_id = ' + manufacturerId + ' ';
        }

        if (keyword) {
            sql += 'AND (p.keywords LIKE ' +  "'%" + keyword + "%'" + ' ';
            sql += 'OR p.name  LIKE ' +  "'%" + keyword + "%'" + ' )';
        }
        if (priceFrom && priceTo) {
            sql += ' AND p.price >= ' + priceFrom + ' AND p.price <= ' + priceTo + ' ';
            // sql += 'AND ((CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE p.price END) BETWEEN' + ' ' + priceFrom + ' AND ' + priceTo + ')' + ' ';
            // sql += 'AND ((CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE p.price END) >=' + priceFrom + ' AND (CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE p.price END) <= ' + priceTo + ')' + ' ';
        }

        if (price) {
            sql += 'ORDER BY (CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE p.price END)' + price + ' ';
        } else {
            sql += 'ORDER BY (CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE p.price END) ASC' + ' ';
        }
        if (limit) {
            sql += 'LIMIT ' + limit + ' ' ;
        }
        if (offset) {
            sql += 'OFFSET ' + offset ;
        }

        const query: any = await this.manager.query(sql);
        console.log(query);
        return query;
    }

    // custom product list
    public async customVendorProductList(limit: number, offset: number, status: number, vendorId: number,  keyword: string, price: string ): Promise<Product[]> {

        let sql: any = 'SELECT vp.vendor_product_id as vendorProductId,vp.vendor_product_commission as vendorProductCommission, vp.approval_flag as approvalFlag, vp.vendor_id as vendorId, p.product_id as productId, c.first_name as vendorName, p.price as productprice, p.keywords, p.sku,  p.quantity,' +
            ' p.sort_order as sortOrder, p.name, vp.created_date as createdDate, p.is_active as isActive, p.product_slug as productSlug,' +
            ' (SELECT price FROM product_discount pd2 WHERE pd2.product_id = p.product_id AND ((pd2.date_start <= NOW() AND  pd2.date_end >= NOW()))' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount,' + '(SELECT price FROM product_special ps WHERE ps.product_id = p.product_id AND  ((ps.date_start <= NOW() AND ps.date_end > NOW()))' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special' + ' ';

            sql += 'FROM vendor_product vp LEFT JOIN product p ON (vp.product_id = p.product_id)  LEFT JOIN vendor v ON (vp.vendor_id = v.vendor_id) LEFT JOIN customer c ON (v.customer_id = c.id) ' +   ' ';

        if (status !== undefined) {
        sql += 'WHERE p.is_active = ' + status + ' ';
        } else {
        sql += 'WHERE (p.is_active = 0 OR p.is_active = 1)' + ' ';
        }

        if (vendorId) {
            sql += 'AND vp.vendor_id = ' +  vendorId +  ' ';
        }

        if (keyword) {
            sql += 'AND (p.keywords LIKE ' +  "'%" + keyword + "%'" + ' ';
            sql += 'OR p.name  LIKE ' +  "'%" + keyword + "%'" + ' ';
            sql += 'OR c.first_name LIKE ' + "'%" + keyword + "%' )" + ' ';
        }
        if (price) {
            sql += 'ORDER BY createdDate DESC, (CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE productprice END)' + ' ' + price + ' ';
        } else {
            sql += 'ORDER BY createdDate DESC, (CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE productprice END) ASC' + ' ';
        }
        if (limit) {
            sql += 'LIMIT ' + limit + ' ' ;
        }
        if (offset) {
            sql += 'OFFSET ' + offset ;
        }

        const query: any = await this.manager.query(sql);
        console.log(query);
        return query;
    }

    // product count
    public async productCount(keyword: string, categoryslug: string, priceFrom: number, priceTo: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(['COUNT(product.product_id) as productCount']);
        query.where('product.is_active = ' + ' ' +  1 + ' ');
        if (categoryslug) {
            query.leftJoin('product.productToCategory', 'productToCategory');
            query.leftJoin('productToCategory.category', 'category');
            query.andWhere('category.category_slug LIKE ' + "'%" + categoryslug + "%'" + ' ');
        }
        if (keyword) {
            query.andWhere('(product.name LIKE' + "'%" + keyword + "%'");
            query.orWhere('product.keywords LIKE ' +  "'%" + keyword + "%'" + ')');
        }
        if (priceFrom && priceTo) {
            query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', {priceFrom, priceTo});
        }
        return query.getRawOne();
    }

    public async productSlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.where('product.metaTagTitle = :value OR product.name = :value',  { value: data});
        return query.getMany();
    }

    public async productSlugData(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select('product_slug');
        query.where('product.metaTagTitle = :value OR product.name = :value',  { value: data});
        return query.getMany();
    }
}
