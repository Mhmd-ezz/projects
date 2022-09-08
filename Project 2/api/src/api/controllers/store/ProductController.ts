/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Get, Body, QueryParam, Put, JsonController, Res, Req, Param} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {ProductToCategoryService} from '../../services/ProductToCategoryService';
import {ProductService} from '../../services/ProductService';
import {CategoryService} from '../../services/CategoryService';
import {UpdateFeatureProduct} from './requests/UpdateFeatureProductRequest';
import {ProductImageService} from '../../services/ProductImageService';
import {CustomerActivityService} from '../../services/CustomerActivityService';
import {ProductViewLog} from '../../models/productViewLog';
import {CustomerActivity} from '../../models/CustomerActivity';
import {ProductViewLogService} from '../../services/ProductViewLogService';
import jwt from 'jsonwebtoken';
import {CustomerService} from '../../services/CustomerService';
import {ProductOptionService} from '../../services/ProductOptionService';
import {ProductOptionValueService} from '../../services/ProductOptionValueService';
import {OptionDescriptionService} from '../../services/OptionDescriptionService';
import {OptionValueDescriptionService} from '../../services/OptionValueDescriptionService';
import {OptionService} from '../../services/OptionService';
import {ProductDiscountService} from '../../services/ProductDiscountService';
import {ProductSpecialService} from '../../services/ProductSpecialService';
import {CategoryPathService} from '../../services/CategoryPathService';
import {ProductRatingService} from '../../services/RatingService';
import {CustomerWishlistService} from '../../services/CustomerWishlistService';
import {VendorService} from '../../services/VendorService';
import {VendorProductService} from '../../services/VendorProductService';
import { TaxService } from '../../services/TaxService';

@JsonController('/product-store')
export class ProductController {
    constructor(private productService: ProductService,
                private productToCategoryService: ProductToCategoryService,
                private categoryService: CategoryService,
                private productImageService: ProductImageService,
                private customerService: CustomerService,
                private productViewLogService: ProductViewLogService,
                private customerActivityService: CustomerActivityService,
                private productOptionService: ProductOptionService,
                private productOptionValueService: ProductOptionValueService,
                private taxService: TaxService,
                private optionDescriptionService: OptionDescriptionService,
                private optionValueDescriptionService: OptionValueDescriptionService,
                private optionService: OptionService, private productDiscountService: ProductDiscountService, private productSpecialService: ProductSpecialService, private vendorService: VendorService, private vendorProductService: VendorProductService,
                private categoryPathService: CategoryPathService, private productRatingService: ProductRatingService, private customerWishlistService: CustomerWishlistService) {
    }

    // Product Details API
    /**
     * @api {get} /api/product-store/productdetail/:productslug Product Detail API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product-store/productdetail/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/productdetail/:productslug')
    public async productDetail(@Param('productslug') productslug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productslug,
        });
        const productDetails: any = classToPlain(productDetail);

        if (productDetails.taxType === 2) {
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            productDetails.taxValue = tax.taxPercentage;
        }
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
                },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: {productId: productDetail.productId},
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({categoryId: value.categoryId});
                const temp: any = value;
                if (categoryNames !== undefined ) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
       productDetails.productOption = await this.productOptionService.find({
            where: {productId: productDetail.productId},
            select: ['productOptionId', 'optionId', 'value', 'required', 'productId'],
        }).then(async (val) => {
            const productOption = val.map(async (value: any) => {
                const dataValue: any = value;
                const optionIdValue = value.optionId;
                const productOptionValueId = value.productId;
                const optionTypeData = await this.optionDescriptionService.findOne({where: {optionId: optionIdValue}});
                const optionTypeName = await this.optionService.findOne({where: {optionId: optionIdValue}});
                if (optionTypeName !== undefined) {
                    dataValue.optiontype = optionTypeName.type;
                } else {
                    dataValue.optiontype = '';
                }
                if (optionTypeName !== undefined) {
                dataValue.optionname = optionTypeData.name;
                } else {
                dataValue.optionname = '';
                }
                const optionType: any = await this.productOptionValueService.findAll({
                    select: ['productOptionId', 'optionId', 'productId', 'optionValueId', 'quantity', 'subtractStock', 'pricePrefix', 'price'],
                    where: {optionId: optionIdValue, productId: productOptionValueId},
                }).then(async (optionValue) => {
                    const optionDescriptionName = await Promise.all(optionValue.map(async (valueData): Promise<any> => {
                        const optionDataDetails: any = valueData;
                        const optionValueIdData = valueData.optionValueId;
                        const dataName = await this.optionValueDescriptionService.findOne({
                            where: {optionValueId: optionValueIdData},
                            select: ['optionValueId', 'name'],
                        });
                        if (dataName !== undefined) {
                            optionDataDetails.optionValueName = dataName.name;
                        } else {
                            optionDataDetails.optionValueName = '';
                       }
                       return optionDataDetails;
                    }));
                    return optionDescriptionName;
                });
                const option: any = [];
                for (const optiontype of optionType) {
                    if ( optiontype.optionValueName !== '') {
                        console.log(optiontype.optionValueName + 'optionValueName');
                        option.push(optiontype);
                    } else {
                        const productOptionValue = await this.productOptionValueService.findData({
                            where: {optionValueId: optiontype.optionValueId , productId: optiontype.productId},
                           });
                           await this.productOptionValueService.delete(productOptionValue.productOptionValueId);
                    }
                }
                dataValue.optionValue = option;
                return dataValue;
            });
            const optionData = Promise.all(productOption);
            return optionData;
        });
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(productDetail.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(productDetail.productId, todaydate);
            if (productSpecial !== undefined) {
                productDetails.pricerefer = productSpecial.price;
                productDetails.flag = 1;
            } else if (productDiscount !== undefined) {
                productDetails.pricerefer = productDiscount.price;
                productDetails.flag = 0;
            } else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
            }
            const vendorProduct = await this.vendorProductService.findOne({where: {productId: productDetail.productId}});
            if (vendorProduct) {
                const vendor = await this.vendorService.findOne(vendorProduct.vendorId);
                const customer = await this.customerService.findOne(vendor.customerId);
                productDetails.vendorId = vendor.vendorId;
                productDetails.vendorName = customer.firstName;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.companyLogo = vendor.companyLogo;
                productDetails.companyLogoPath = vendor.companyLogoPath;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorCompanyLocation = vendor.companyCity + ' ' + vendor.companyAddress1;
            }
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                console.log('lll', decoded.id);
                customerId = decoded.id;
            });

            const wishStatus = await this.customerWishlistService.findOne({
                where: {
                    productId: productDetail.productId,
                    customerId,
                },
            });
            if (wishStatus) {
                productDetails.wishListStatus = 1;
            } else {
                productDetails.wishListStatus = 0;
            }
            const customerDetail = await this.customerService.findOne({where: {id: customerId}});
            const customerActivity = new CustomerActivity();
            customerActivity.customerId = customerId;
            customerActivity.activityId = 2;
            customerActivity.description = 'productviewed';
            customerActivity.productId = productDetail.productId;
            await this.customerActivityService.create(customerActivity);
            const viewLog: any = new ProductViewLog();
            viewLog.productId = productDetail.productId;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.wishListStatus = 0;
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    // update Feature Product API
    /**
     * @api {put} /api/product-store/update-featureproduct/:id Update Feature Product API
     * @apiGroup Store
     * @apiParam (Request body) {number} isFeature product isFeature should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "isFeature" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated feature Product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/update-featureproduct/:id
     * @apiErrorExample {json} isFeature error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-featureproduct/:id')
    public async updateFeatureProduct(@Param('id')id: number, @Body({validate: true}) updateFeatureProductParam: UpdateFeatureProduct, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        product.isFeatured = updateFeatureProductParam.isFeature;
        const productSave = await this.productService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'product updated successfully.',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Featured Product List API
    /**
     * @api {get} /api/product-store/featureproduct-list Feature Product List
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} keyword keyword search by name
     * @apiParam (Request body) {Number} sku search by sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get feature product List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/featureproduct-list
     * @apiErrorExample {json} FeatureProduct List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/featureproduct-list')
    public async featureProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const select = ['taxType', 'taxValue', 'productId', 'name', 'rating', 'description', 'sortOrder', 'price', 'productSlug', 'isActive'];
        const whereConditions = [
            {
                name: 'deleteFlag',
                op: 'where',
                value: 0,
            },
            {
                name: 'isFeatured',
                op: 'where',
                value: 1,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];

        const search = [];
        const featureProduct = await this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully get feature product count',
                data: featureProduct,
            };
            return response.status(200).send(successresponse);
        }
        const promises = featureProduct.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                result.taxValue = tax.taxPercentage;
            }
            const temp: any = result;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(result.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(result.productId, todaydate);
            temp.Images = productImage;
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                console.log(userUniqueId[0][1]);
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: result.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get feature product List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }

    // Today Deals Product List API
    /**
     * @api {get} /api/product-store/todayDeals-list Today Deals List
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword search by name
     * @apiParam (Request body) {String} sku search by sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get today deals product List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/todayDeals-list
     * @apiErrorExample {json} TodayDeals List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/todayDeals-list')
    public async todayDealsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['taxType', 'taxValue', 'productId', 'name', 'rating', 'description', 'location',
             'metaTagTitle',  'todayDeals',
             'price', 'isActive', 'productSlug'];
        const whereConditions = [
            {
                name: 'deleteFlag',
                op: 'where',
                value: 0,
            },
            {
                name: 'todayDeals',
                op: 'where',
                value: 1,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];

        const search = [];
        const todayDeals = await this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got today deals count',
                data: todayDeals,
            };
            return response.status(200).send(successresponse);
        }
        const promises = todayDeals.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                result.taxValue = tax.taxPercentage;
            }
            const temp: any = result;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(result.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(result.productId, todaydate);
            temp.Images = productImage;
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                console.log(userUniqueId[0][1]);
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: result.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got today deals List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }

    // Get Category API
    /**
     * @api {get} /api/product-store/Get-Category Get Category API
     * @apiGroup Store
     * @apiParam (Request body) {Number} CategoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the category.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/Get-Category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/Get-Category')
    public async getCategory(@QueryParam('CategoryId') CategoryId: number, @Res() response: any): Promise<any> {
        const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
        const search = [];
        const WhereConditions = [{
            name: 'categoryId',
            value: CategoryId,
        }];
        const category: any = await this.categoryService.list(0, 0, select, search, WhereConditions, 0, 0);
        const promise = category.map(async (result: any) => {
            const temp: any = result;
            const categoryLevel: any = await this.categoryPathService.find({
                select: ['level', 'pathId'],
                where: {categoryId: result.categoryId},
                order: {level: 'ASC'},
            }).then((values) => {
                const categories = values.map(async (val: any) => {
                    const categoryNames = await this.categoryService.findOne({categoryId: val.pathId});
                    const tempVal: any = val;
                    tempVal.categoryName = categoryNames.name;
                    return tempVal;
                });
                const results = Promise.all(categories);
                return results;
            });
            temp.levels = categoryLevel;
            return temp;
        });
        const value = await Promise.all(promise);
        if (category) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the category. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Get product rating/review API
    /**
     * @api {get} /api/product-store/Get-Product-rating Get product Rating API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/Get-Product-rating')
    public async getProductRating(@QueryParam('productId') productId: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productId,
        });
        if (!productDetail) {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get product Rating.',
            };
            return response.status(400).send(errorResponse);
        }
        const select = ['review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'isActive'];
        const relation = [];
        const WhereConditions = [
            {
                name: 'productId',
                op: 'where',
                value: productDetail.productId,
            }, {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const rating: any = await this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
        const promise = rating.map(async (result: any) => {
            const temp: any = result;
            const customer: any = await this.customerService.findOne({
                select: ['firstName', 'avatar', 'avatarPath'],
                where: {id: result.customerId},
            });
            const val = Object.assign({}, temp, customer);
            return val;
        });
        const value = await Promise.all(promise);
        if (value) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the product Rating. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get product Rating.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Get product rating/review  countAPI
    /**
     * @api {get} /api/product-store/get-rating-statistics Get Rating Statistics API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review statistics.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/get-rating-statistics
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/get-rating-statistics')
    public async getRatingStatistics(@QueryParam('productId') id: number, @Res() response: any): Promise<any> {
        const ratings: any = [];
        for (let stars = 1; stars <= 5; stars++) {
        const WhereConditions = [
            {
                name: 'rating',
                op: 'where',
                value: stars,
            },  {
                name: 'productId',
                op: 'where',
                value: id,
            },
        ];
        const count = 1;
        const star = await this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
        ratings.push(star);
    }
        const totalRatingReview = await this.productRatingService.ratingStatistics(id);
        const starsCount = {oneStar : ratings[0], twoStar : ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4]};
        if (starsCount) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the product ratings & review count.',
                data: {starsCount, totalRatingReview},
            };
            return response.status(200).send(successResponse);
        }
    }

    // Product Compare API
    /**
     * @api {get} /api/product-store/product-compare Product Compare API
     * @apiGroup Store
     * @apiParam (Request body) {String} productId productId
     * @apiParam (Request body) {String} data data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Product Compared",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/product-compare
     * @apiErrorExample {json} product compare error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/Product-Compare')
    public async productCompare(@QueryParam('productId') productId: string, @QueryParam('data') data: string, @Res() response: any): Promise<any> {
        const productid = productId.split(',');
        if (productid.length === 1) {
            if (data === '0') {
                const Response: any = {
                    status: 1,
                    message: 'Product Compared Successfully ',
                };
                return response.status(200).send(Response);
            } else {
              const Detail = [];
              console.log(productid + 'productid');
              const  List = await this.productService.findOne({where: {productId: productid}});
                    const defaultValue = await this.productImageService.findOne({
                    where: {
                        productId: List.productId,
                        defaultImage: 1,
                    },
                    });
                    // const brandData = await this.manufacturerService.findOne({
                    //     select: ['name'],
                    //     where: {manufacturerId: List.manufacturerId},
                    // });
                    const temp: any = List;
                    const nowDate = new Date();
                    // if (brandData !== undefined) {
                    //     temp.manufacturerName = brandData.name;
                    // } else {
                    //     temp.manufacturerName = '';
                    // }
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPrice(List.productId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPrice(List.productId, todaydate);
                    if (productSpecial !== undefined) {
                        temp.pricerefer = productSpecial.price;
                        temp.flag = 1;
                    } else if (productDiscount !== undefined) {
                        temp.pricerefer = productDiscount.price;
                        temp.flag = 0;
                    } else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    temp.productImage = defaultValue;
                    Detail.push(temp);
                    const Response: any = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: Detail,
                    };
                    return response.status(200).send(Response);
                }
        } else {
            if (data === '0') {
                const categoryDataDetail = [];
                // product find the which category
                for ( const id of productid) {
                 const categoryId = await this.productToCategoryService.findAll({where: {productId: id }});
                 const categoryDataValue = categoryId.map( (item: any) => {
                      return item.categoryId;
                     });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                   };
                return response.status(200).send(successResponse);
            } else {
                const productDataDetail = [];
                const categoryDataDetail = [];
                // product find the which category
                for ( const id of productid) {
                const categoryId = await this.productToCategoryService.findAll({where: {productId: id }});
                const categoryDataValue = categoryId.map( (item: any) => {
                    return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                let productListData;
                // find the product to compare
                for ( const id of productid) {
                productListData = await this.productService.findOne(id);
                const defaultValue = await this.productImageService.findOne({
                    where: {
                        productId: productListData.productId,
                        defaultImage: 1,
                    },
                    });
                    // const brandData = await this.manufacturerService.findOne({
                    //     select: ['name'],
                    //     where: {manufacturerId: productListData.manufacturerId},
                    // });
                    const temp: any = productListData;
                    const nowDate = new Date();
                    // if (brandData !== undefined) {
                    //     temp.manufacturerName = brandData.name;
                    // } else {
                    //     temp.manufacturerName = '';
                    // }
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPrice(productListData.productId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPrice(productListData.productId, todaydate);
                    if (productSpecial !== undefined) {
                        temp.pricerefer = productSpecial.price;
                        temp.flag = 1;
                    } else if (productDiscount !== undefined) {
                        temp.pricerefer = productDiscount.price;
                        temp.flag = 0;
                    } else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    temp.productImage = defaultValue;
                    productDataDetail.push(temp);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: productDataDetail,
                };
                return response.status(200).send(successResponse);
            }
        }
    }
}
