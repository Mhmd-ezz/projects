/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    JsonController,
    Res,
    Req,
    Param,
    Get,
    QueryParam,
} from 'routing-controllers';
import { CountryService } from '../../services/CountryService';
import { VendorService } from '../../services/VendorService';
import { VendorProductService } from '../../services/VendorProductService';
import { ProductImageService } from '../../services/ProductImageService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import jwt from 'jsonwebtoken';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';
import { ProductService } from '../../services/ProductService';
// import { DeliveryLocationService } from '../../services/DeliveryLocationService';

@JsonController('/vendor-store')
export class VendorStoreController {
    constructor(
        private vendorService: VendorService,
        private vendorProductService: VendorProductService,
        private countryService: CountryService,
        private productSpecialService: ProductSpecialService,
        private productDiscountService: ProductDiscountService,
        private customerWishlistService: CustomerWishlistService,
        private productService: ProductService,
        // private deliveryLocationService: DeliveryLocationService,
        private productImageService: ProductImageService
    ) { }

    // Get vendor Detail API
    /**
     * @api {get} /api/vendor-store/vendor-details/:id Vendor Details API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor Details",
     * "data":{
     * "vendorId" : "",
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-details/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-details/:id')
    public async storeVendorDetails(
        @Param('id') Id: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const vendor = await this.vendorService.findOne({
            select: [
                'vendorId',
                'vendorPrefixId',
                'companyLogo',
                'companyLogoPath',
                'companyName',
                'companyDescription',
                'companyAddress1',
                'companyAddress2',
                'companyCity',
                'companyState',
                'shippingCountryId',
                'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState',
                'shippingCountryId', 'shippingAddressState', 'shippingAddressCity', 'shippingAddressLine1', 'shippingAddressLine2', 'shippingAddressStreet', 'shippingAddressNotes',
                'billingAddressCountryId', 'billingAddressState', 'billingAddressCity', 'billingAddressLine1', 'billingAddressLine2', 'billingAddressStreet', 'billingAddressNotes', 'iban', 'currency',
                'pincode',
                'companyEmailId',
                'companyWebsite',
            ],
            where: { vendorId: Id },
        });
        const vendorDetail: any = vendor;
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: vendor.shippingCountryId },
        });
        if (country) {
            vendorDetail.countryName = country.name;
        }
        const products = await this.vendorProductService.findVendorActiveProduct(
            Id,
            0,
            0
        );
        const productList = [];
        for (const product of products) {
            const obj: any = {};
            const productDetail = await this.productService.findOne({
                select: [
                    'productId',
                    'name',
                    'description',
                    'productSlug',
                    'rating',
                    'quantity',
                    'price',
                ],
                where: {
                    productId: product.productId,
                },
            });
            const productImage = await this.productImageService.findOne({
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            obj.productId = productDetail.productId;
            obj.name = productDetail.name;
            obj.price = productDetail.price;
            obj.image = productImage.image;
            obj.description = productDetail.description;
            obj.productSlug = productDetail.productSlug;
            obj.rating = productDetail.rating;
            obj.quantity = productDetail.quantity;
            obj.productImage = productImage;
            // obj.image = productDetail.image;
            // obj.imagePath = productImage.containerName;

            const nowDate = new Date();
            const todaydate =
                nowDate.getFullYear() +
                '-' +
                (nowDate.getMonth() + 1) +
                '-' +
                nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(
                product.productId,
                todaydate
            );
            const productDiscount = await this.productDiscountService.findDiscountPrice(
                product.productId,
                todaydate
            );
            if (productSpecial !== undefined) {
                obj.pricerefer = productSpecial.price;
                obj.flag = 1;
            } else if (productDiscount !== undefined) {
                obj.pricerefer = productDiscount.price;
                obj.flag = 0;
            } else {
                obj.pricerefer = '';
                obj.flag = '';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(
                    request.header('authorization').split(' ')[1],
                    '123##$$)(***&'
                );
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [key, userId[key]];
                });
                console.log(userUniqueId[0][1]);
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: product.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    obj.wishListStatus = 1;
                } else {
                    obj.wishListStatus = 0;
                }
            } else {
                obj.wishListStatus = 0;
            }
            productList.push(obj);
        }
        vendorDetail.productCount = products.length;
        vendorDetail.productlist = productList;
        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor details. ',
            data: vendorDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Get vendor Product list API
    /**
     * @api {get} /api/vendor-store/vendor-product-list/:id Vendor Product list API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiParam {Number} limit
     * @apiParam {Number} offset
     * @apiParam {Count} count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor product list",
     * "data":{
     * "productId" : "",
     * "name" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-product-list/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-product-list/:id')
    public async storeVendorProductList(
        @Param('id') Id: number,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('count') count: number | boolean,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const products = await this.vendorProductService.findVendorActiveProduct(
            Id,
            limit,
            offset
        );
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'successfully got Vendor Product List. ',
                data: products.length,
            });
        }
        const productList = [];
        for (const product of products) {
            const obj: any = {};
            const productDetail = await this.productService.findOne({
                select: ['productId', 'name', 'price', 'rating'],
                where: {
                    productId: product.productId,
                },
            });
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            obj.name = productDetail.name;
            obj.price = productDetail.price;
            obj.rating = productDetail.rating;
            obj.image = productImage.image;
            obj.imagePath = productImage.containerName;
            const nowDate = new Date();
            const todaydate =
                nowDate.getFullYear() +
                '-' +
                (nowDate.getMonth() + 1) +
                '-' +
                nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(
                product.productId,
                todaydate
            );
            const productDiscount = await this.productDiscountService.findDiscountPrice(
                product.productId,
                todaydate
            );
            if (productSpecial !== undefined) {
                obj.pricerefer = productSpecial.price;
                obj.flag = 1;
            } else if (productDiscount !== undefined) {
                obj.pricerefer = productDiscount.price;
                obj.flag = 0;
            } else {
                obj.pricerefer = '';
                obj.flag = '';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(
                    request.header('authorization').split(' ')[1],
                    '123##$$)(***&'
                );
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [key, userId[key]];
                });
                console.log(userUniqueId[0][1]);
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: product.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    obj.wishListStatus = 1;
                } else {
                    obj.wishListStatus = 0;
                }
            } else {
                obj.wishListStatus = 0;
            }
            productList.push(obj);
        }
        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor Product List. ',
            data: productList,
        };
        return response.status(200).send(successResponse);
    }

    // check pincode availability API
    /**
     * @api {get} /api/vendor-store/check-pincode-availability check pincode availability API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} pincode pincode
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully checked availability",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/check-pincode-availability
     * @apiErrorExample {json} check pincode availability error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/check-pincode-availability')
    public async checkAvailability(
        @QueryParam('productId') productId: number,
        @QueryParam('pincode') pincode: number,
        @Res() response: any
    ): Promise<any> {
        // const productData = await this.productService.findOne({ where: { productId}});
        // if (!productData) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'Invalid ProductId',
        //     });
        // }
        // const orderData = await this.vendorProductService.findOne({ where: { productId}});
        // if (!orderData) {
        // const successResponse: any = {
        //     status: 0,
        //     message: 'not Vendor Product',
        //     };
        // return response.status(200).send(successResponse);
        // }
        // const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: pincode, vendorId: orderData.vendorId}});
        // if (deliveryLocation) {
        const successResponse: any = {
            status: 1,
            message: 'Available',
        };
        return response.status(200).send(successResponse);
        // } else {
        //     const successResponse: any = {
        //         status: 0,
        //         message: 'Not Available',
        //         };
        //     return response.status(200).send(successResponse);
        // }
    }
}
