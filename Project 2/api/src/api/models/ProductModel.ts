/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {IsNotEmpty} from 'class-validator';
import {BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {ProductToCategory} from './ProductToCategory';
import {ProductImage} from './ProductImage';
import {CustomerWishlist} from './CustomerWishlist';
import {ProductRelated} from './ProductRelated';
import {OrderProduct} from './OrderProduct';
import {ProductRating} from './ProductRating';
import { OrderProductLog } from './OrderProductLog';
import { CustomerCart } from './CustomerCart';
import { ProductTranslation } from './ProductTranslation';

@Entity('product')
export class Product extends BaseModel {
    
    @PrimaryGeneratedColumn({name: 'product_id'})
    @IsNotEmpty()
    public productId: number;

    @Column({name: 'sku'})
    public sku: string;

    @Column({name: 'upc'})
    public upc: string;

    @Column({name: 'location'})
    public location: string;

    @Column({name: 'quantity'})
    public quantity: number;

    @Column({name: 'minimum_quantity'})
    public minimumQuantity: number;

    @Column({name: 'subtract_stock'})
    public subtractStock: number;

    @Column({name: 'account_type'})
    public accountType: number;

    @IsNotEmpty()
    @Column({name: 'stock_status_id'})
    public stockStatusId: number;

    @Column({name: 'image'})
    public image: string;

    @Column({name: 'image_path'})
    public imagePath: string;

    @Column({name: 'manufacturer_id'})
    public manufacturerId: number;

    @Column({name: 'shipping'})
    public shipping: number;

    @Column({name: 'service_charges'})
    public serviceCharges: string;

    @Column({name: 'tax_type'})
    public taxType: number;

    @Column({name: 'tax_value'})
    public taxValue: number;

    @IsNotEmpty()
    @Column({name: 'price'})
    public price: number;

    @Column({name: 'price_update_file_log_id'})
    public priceUpdateFileLogId: number;

    @Column({name: 'date_available'})
    public dateAvailable: Date;

    @Column({name: 'sort_order'})
    public sortOrder: number;

    @Column({name: 'name'})
    public name: string;

    @Column({name: 'description'})
    public description: string;

    @Column({name: 'amount'})
    public amount: number;

    @Column({name: 'meta_tag_title'})
    public metaTagTitle: string;

    @Column({name: 'meta_tag_description'})
    public metaTagDescription: string;

    @Column({name: 'meta_tag_keyword'})
    public metaTagKeyword: string;

    @Column({name: 'keywords'})
    public keywords: string;

    @Column({name: 'discount'})
    public discount: number;

    @Column({name: 'delete_flag'})
    public deleteFlag: number;

    @Column({name: 'is_featured'})
    public isFeatured: number;

    @Column({name: 'today_deals'})
    public todayDeals: number;

    @Column({name: 'condition'})
    public condition: number;

    @Column({name: 'rating'})
    public rating: number;

    @Column({name: 'wishlist_status'})
    public wishListStatus: number;

    @Column({name: 'product_slug'})
    public productSlug: string;

    @Column({name: 'is_active'})
    public isActive: number;

    @OneToMany(type => ProductTranslation, productTranslation => productTranslation.product)
    public productTranslation: ProductTranslation[];

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.product)
    public productToCategory: ProductToCategory[];

    @OneToMany(type => ProductImage, productImage => productImage.product)
    public productImage: ProductImage[];

    @OneToMany(type => CustomerWishlist, customerWishlist => customerWishlist.product)
    public wishlist: CustomerWishlist[];

    @OneToMany(type => ProductRelated, productRelated => productRelated.productRelated)
    public relatedproduct: ProductRelated[];

    @OneToMany(type => ProductRating, productRating => productRating.product)
    public productRating: ProductRating[];

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.productInformationDetail)
    public orderProduct: OrderProduct[];

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.product)
    public orderProductLog: OrderProductLog[];

    @OneToMany(type => CustomerCart, customerCart => customerCart.product)
    public cart: OrderProductLog[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
