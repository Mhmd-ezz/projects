/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Get, JsonController, Res, Req, QueryParam, Body , Post} from 'routing-controllers';
import {BannerService} from '../../services/BannerService';
import {MAILService} from '../../../auth/mail.services';
import {classToPlain} from 'class-transformer';
import {CategoryService} from '../../services/CategoryService';
import {ProductService} from '../../services/ProductService';
import arrayToTree from 'array-to-tree';
import {ProductRelated} from '../../models/ProductRelated';
import {ProductRelatedService} from '../../services/ProductRelatedService';
import {ProductImageService} from '../../services/ProductImageService';
import {CustomerWishlistService} from '../../services/CustomerWishlistService';
import jwt from 'jsonwebtoken';
import {CountryService} from '../../services/CountryService';
import {ContactService} from '../../services/ContactService';
import {ContactRequest} from './requests/ContactRequest';
import {Contact} from '../../models/Contact';
import {EmailTemplateService} from '../../services/EmailTemplateService';
import {ZoneService} from '../../services/zoneService';
import {LanguageService} from '../../services/LanguageService';
import {ProductDiscountService} from '../../services/ProductDiscountService';
import {ProductSpecialService} from '../../services/ProductSpecialService';
import {ProductToCategoryService} from '../../services/ProductToCategoryService';
import {ProductOptionService} from '../../services/ProductOptionService';
import {CategoryPathService} from '../../services/CategoryPathService';
import {PluginService} from '../../services/PluginService';
import {UserService} from '../../services/UserService';
import { VendorProductService } from '../../services/VendorProductService';
import { VendorService } from '../../services/VendorService';
import { CustomerService } from '../../services/CustomerService';
import { OrderLogService } from '../../services/OrderLogService';
import { OrderStatusService } from '../../services/OrderStatusService';
import { OrderService } from '../../services/OrderService';
import { TaxService } from '../../services/TaxService';

@JsonController('/list')
export class CommonListController {
    constructor(private bannerService: BannerService,
                private taxService: TaxService, private categoryService: CategoryService, private productRelatedService: ProductRelatedService,
                private productService: ProductService, private productImageService: ProductImageService, private languageService: LanguageService,
                private customerWishlistService: CustomerWishlistService, private countryService: CountryService, private contactService: ContactService,
                private emailTemplateService: EmailTemplateService,
                private zoneService: ZoneService, private productDiscountService: ProductDiscountService, private productSpecialService: ProductSpecialService,
                private productToCategoryService: ProductToCategoryService, private productOptionService: ProductOptionService, private categoryPathService: CategoryPathService, private pluginService: PluginService, private vendorProductService: VendorProductService, private vendorService: VendorService, private customerService: CustomerService,
                private userService: UserService, private orderLogService: OrderLogService, private orderStatusService: OrderStatusService, private orderService: OrderService
                 ) {
    }

    // Banner List API
    /**
     * @api {get} /api/list/banner-list Banner List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you Banner list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/banner-list
     * @apiErrorExample {json} Banner List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Product list Function
    @Get('/banner-list')
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['bannerId', 'title', 'image', 'imagePath', 'content', 'link', 'position', 'isActive'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
        ];
        const bannerList: any = await this.bannerService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner list',
            data: bannerList,
        };
        return response.status(200).send(successResponse);
    }

    // Category List Tree API
    /**
     * @api {get} /api/list/category-list Category List Tree API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyorder": "",
     *      "sortOrder": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "category list shown successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Category List Function
    @Get('/category-list')
    public async ParentCategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'categorySlug', 'metaTagDescription', 'metaTagKeyword', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'where',
                value: 1,
            },  {
                name: 'parentInt',
                op: 'where',
                value: 0,
            },
        ];
        const WhereConditions = [];
        const categoryData = await this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get All category List',
                data: categoryData,
            };
            return response.status(200).send(successResponse);
        } else {
            const category = categoryData.map(async ( value: any) => {
                const tempVal: any = value;
                const child = await this.categoryService.find({where: { parentInt : value.categoryId, isActive : 1},
                    select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug']});
                const children = child.map(async ( val: any) => {
                    const data: any = val;
                    const subChild = await this.categoryService.find({where: { parentInt : val.categoryId, isActive : 1},
                        select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug']});
                    if (subChild.length > 0) {
                        data.children = subChild;
                        return data;
                    }
                    return data;
                });
                const childrenData = await Promise.all(children);
                tempVal.children = childrenData;
                return tempVal;
            });
            const result = await Promise.all(category);
            console.log(result);
            if (result) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully got the list of categories.',
                    data: result,
                };
                return response.status(200).send(successResponse);
            }
        }
    }

    // Related Product Adding API
    /**
     * @api {post} /api/list/add-related-product Add a Related Product
     * @apiGroup Store List
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {string} relatedProductId Related Product Id
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "relatedProductId": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product adding successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/add-related-product
     * @apiErrorExample {json} Related Product Adding error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Category List Function
    @Post('/add-related-product')
    public async addRelatedProduct(@Body({validate: true}) productParam: any, @Req() request: any, @Res() response: any): Promise<any> {
        const productId = productParam.productId;
        const relatedProductId = productParam.relatedProductId;
        const eachData: any = relatedProductId.split(',');
        let i;
        for (i = 0; i < eachData.length; i++) {
            const relatedProduct = new ProductRelated();
            relatedProduct.productId = productId;
            relatedProduct.relatedProductId = eachData[i];
            await this.productRelatedService.create(relatedProduct);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully added the related products.',
        };
        return response.status(200).send(successResponse);
    }

    // Product List API
    /**
     * @api {get} /api/list/productlist Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} manufacturerId manufacturerId
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {Number} price orderBy 0->desc 1->asc
     * @apiParam (Request body) {Number} condition  1->new 2->used
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in boolean or number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/productlist')
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                             @QueryParam('manufacturerId') manufacturerId: string, @QueryParam('categoryId') categoryId: string, @QueryParam('priceFrom') priceFrom: string,
                             @QueryParam('priceTo') priceTo: string, @QueryParam('price') price: number, @QueryParam('condition') condition: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(manufacturerId);
        console.log(categoryId);
        const select = ['product.productId', 'product.sku', 'product.name', 'product.quantity', 'product.description', 'product.price',
            'product.isActive AS isActive', 'product.manufacturerId AS manufacturerId', 'product.location AS location', 'product.minimumQuantity AS minimumQuantity',
            'product.taxType', 'product.taxValue', 'product.subtractStock', 'product.wishListStatus', 'product.stockStatusId', 'product.shipping', 'product.sortOrder', 'product.condition', 'product.productSlug',
            'product.dateAvailable', 'product.amount', 'product.metaTagTitle', 'product.metaTagDescription', 'product.metaTagKeyword', 'product.discount', 'product.rating'];

        const searchConditions = [
            {
                name: 'product.isActive',
                op: 'where',
                value: 1,
            },
            {
                name: 'product.manufacturerId',
                op: 'and',
                value: manufacturerId,
            },
            {
                name: 'product.name',
                op: 'and',
                value: keyword,
            },
            {
                name: 'product.condition',
                op: 'andWhere',
                value: condition,
            },
        ];

        const whereConditions: any = [{
            name: 'product.productId',
            op: 'inraw',
            value: categoryId,
        }];

        const productList: any = await this.productService.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got Products count',
                data: productList,
            };
            return response.status(200).send(Response);
        }
        const promises = productList.map(async (result: any) => {
            const productToCategory = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: {productId: result.productId},
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({categoryId: value.categoryId});
                    const tempValue: any = value;
                    tempValue.categoryName = categoryNames ? categoryNames.name : '';
                    return tempValue;
                });
                const results = Promise.all(category);
                return results;
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                result.taxValue = tax.taxPercentage;
            }
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = result;
            temp.Images = productImage;
            temp.Category = productToCategory;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(result.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(result.productId, todaydate);
            const productOption = await this.productOptionService.findOne({
                where: {
                    productId: result.productId,
                    required: 1,
                },
            });
            console.log('productOption:' + productOption);
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
            if (productOption) {
                temp.optionRequired = 1;
            } else {
                temp.optionRequired = 0;
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
                if (wishStatus !== undefined) {
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
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of products.',
            data: {
                maximumProductPrice: productPrice,
                productList: finalResult,
            },
        };
        return response.status(200).send(successResponse);
    }

    // Custom Product List API
    /**
     * @api {get} /api/list/custom-product-list Custom Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} manufacturerId manufacturerId
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} price ASC OR DESC
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/custom-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/custom-product-list')
    public async customProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                                   @QueryParam('categoryslug') categoryslug: string, @QueryParam('priceFrom') priceFrom: string, @QueryParam('manufacturerId') manufacturerId: number,
                                   @QueryParam('priceTo') priceTo: string, @QueryParam('price') price: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        return new Promise( async () => {
            const productList: any = await this.productService.customProductList(limit, offset, manufacturerId, categoryslug, keyword, priceFrom, priceTo, price);
            const promises = productList.map(async (result: any) => {
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
                temp.Images = productImage;
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = await this.productSpecialService.findSpecialPrice(result.productId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPrice(result.productId, todaydate);
                const vendorProduct = await this.vendorProductService.findOne(result.productId);
                if (vendorProduct) {
                    const vendor = await this.vendorService.findOne(vendorProduct.vendorId);
                    const customer = await this.customerService.findOne(vendor.customerId);
                    temp.vendorId = vendor.vendorId;
                    temp.vendorName = customer.firstName;
                    temp.vendorCompanyName = customer.lastName;
                    temp.vendorCompanyLocation = vendor.companyCity + ' ' + vendor.companyAddress1;
                }
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
            const finalResult = await
            Promise.all(promises);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of products.',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }

    // Related Product Showing API
    /**
     * @api {get} /api/list/related-product-list Related Product List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product List Showing Successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/related-product-list
     * @apiErrorExample {json} Related Product List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Category List Function
    @Get('/related-product-list')
    public async relatedProductList(@QueryParam('productId') productid: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productid,
        });
        if (!productDetail) {
            return response.status(200).send({
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: [],
            });
        }
        const whereConditions = [
            {
                productId: productDetail.productId,
            },
        ];
        const relatedData = await this.productRelatedService.list(0, 0, 0, 0, whereConditions, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: relatedData,
            };
            return response.status(200).send(Response);
        }
        const promises = relatedData.map(async (results: any) => {
            const Id = results.relatedProductId;
            const product = await this.productService.findOne({
                select: ['taxType', 'taxValue', 'productId', 'name', 'price', 'description', 'quantity', 'rating', 'productSlug'],
                where: {productId: Id},
            });
            if (product.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: product.taxValue });
                product.taxValue = tax.taxPercentage;
            }
            const Image = await this.productImageService.findOne({where: {productId: Id, defaultImage: 1}});
            const temp: any = product;
            temp.productImage = Image;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice( Id, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice( Id, todaydate);
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
           return temp;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Related product list is successfully being shown. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Country List API
    /**
     * @api {get} /api/list/country-list Country List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get country list",
     *      "data":{
     *      "countryId"
     *      "name"
     *      "isoCode2"
     *      "isoCode3"
     *      "addressFormat"
     *      "postcodeRequired"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/country-list')
    public async countryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const countryList = await this.countryService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the list of countries.',
            data: countryList,
        };
        return response.status(200).send(successResponse);

    }

    // Contact Us API
    /**
     * @api {post} /api/list/contact-us  Contact Us API
     * @apiGroup Store List
     * @apiParam (Request body) {String} name Name
     * @apiParam (Request body) {String} email Email
     * @apiParam (Request body) {String} phoneNumber Phone Number
     * @apiParam (Request body) {String} message Message
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "message" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your mail send to admin..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/contact-us
     * @apiErrorExample {json} Contact error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // ContactUs Function
    @Post('/contact-us')
    public async userContact(@Body({validate: true})contactParam: ContactRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const contactInformation = new Contact();
        contactInformation.name = contactParam.name;
        contactInformation.email = contactParam.email;
        contactInformation.phoneNumber = contactParam.phoneNumber;
        contactInformation.message = contactParam.message;
        const informationData = await this.contactService.create(contactInformation);
        const emailContent = await this.emailTemplateService.findOne(3);
        const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
        const adminId: any = [];
        const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1}});
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
        const sendMailRes = MAILService.contactMail(message, emailContent.subject, adminId);
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your request Successfully send',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Mail does not send',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Zone List API
    /**
     * @api {get} /api/list/zone-list Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":{
     *      "countryId"
     *      "code"
     *      "name"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/zone-list
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/zone-list')
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['zoneId', 'countryId', 'code', 'name', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];

        const WhereConditions = [];
        const relation = ['country'];

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone List',
                data: classToPlain(zoneList),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Language List API
    /**
     * @api {get} /api/list/language-list Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got language list",
     *      "data":{
     *      "languageId"
     *      "name"
     *      "status"
     *      "code"
     *      "sortOrder"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/language-list
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/language-list')
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const languageList = await this.languageService.list(limit, offset, select, search, WhereConditions, count);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete language list.',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to show language list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Specific parent Category List API
    /**
     * @api {get} /api/list/specific-category-list Specific Category List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParamExample {json} Input
     * {
     *      "parentInt" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Category listed successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/specific-category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Category List Function
    @Get('/specific-category-list')
    public async SpecificcategoryList( @QueryParam('categorySlug') categorySlugParam: string, @Req() request: any, @Res() response: any): Promise<any> {
        const categoryDataId = await this.categoryService.findOne({
            where : {
                categorySlug: categorySlugParam,
            },
        });
        if (categoryDataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        const categoryDetailId = await this.categoryPathService.findOne({categorySlug: categorySlugParam, level: 0 });
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'categorySlug'];
        const categoryData = await this.categoryService.list(0 , 0 , select, 0 , 0 , 0, 0);
        const categoryList = arrayToTree(categoryData, {
            parentProperty: 'parentInt',
            customID: 'categoryId',
        });
        const mainCategoryId = categoryDetailId.pathId;
        let dataList;
        const key = 'categoryId';
        for ( const data of categoryList) {
            if (data[key] === mainCategoryId) {
                dataList = data;
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully get the related category List',
            data: dataList,
        };
        return response.status(200).send(successResponse);
    }

    // get payment setting API
    /**
     * @api {get} /api/list/get-payment-setting Get payment setting API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment setting",
     *      "data":{
     *      "plugin_name"
     *      "plugin_avatar"
     *      "plugin_avatar_path"
     *      "plugin_type"
     *      "plugin_status"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/get-payment-setting
     * @apiErrorExample {json} get payment setting error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/get-payment-setting')
    // @Authorized('customer')
    public async paymentSettingList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'pluginName', 'pluginAvatar', 'pluginAvatarPath', 'pluginType', 'pluginAdditionalInfo', 'pluginStatus'];

        const search = [
            {
                name: 'pluginType',
                op: 'like',
                value: keyword,
            },
            {
                name: 'pluginStatus',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const paymentSettingList = await this.pluginService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment List.',
            data: paymentSettingList,
        };
        return response.status(200).send(successResponse);

    }

    // Active product count API
    /**
     * @api {get} /api/list/product-count  Product Count API
     * @apiGroup Store List
     * @apiParam (Request body) {String} keyword keyword for search
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Product Count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/product-count
     * @apiErrorExample {json} product count error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/product-count')
    public async productCount( @QueryParam('keyword') keyword: string, @QueryParam('categoryslug') categoryslug: string, @QueryParam('priceFrom') priceFrom: number, @QueryParam('priceTo') priceTo: number, @Res() response: any): Promise<any> {
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
        const productCount = await this.productService.productCount(keyword, categoryslug, priceFrom, priceTo);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Product Count',
            data: {productCount: productCount.productCount,
                maximumProductPrice: productPrice},
        };
        return response.status(200).send(successResponse);

    }

     // order log List API
    /**
     * @api {get} /api/list/orderLoglist Order Log List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order log list",
     *      "data":{
     *      "orderStatus" : "",
     *      "createdDate" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/orderLoglist
     * @apiErrorExample {json} order log error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/orderLoglist')
    public async listOrderLog(@QueryParam('orderPrefixId') orderPrefixId: string, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({ where: { orderPrefixId}});
        if (!orderData) {
        const errorResponse: any = {
            status: 0,
            message: 'Invalid OrderId',
            };
        return response.status(400).send(errorResponse);
        }
        const orderId = orderData.orderId;
        const select = ['orderId', 'orderPrefixId', 'orderStatusId', 'shippingFirstname', 'total', 'createdDate', 'modifiedDate'];
        const search = [
            {
                name: 'orderId',
                op: 'where',
                value: orderId,
            } ];
        const WhereConditions = [];
        const orderList = await this.orderLogService.list(0, 0, select, search, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({select: ['orderStatusId', 'name'], where: {isActive: 1}});
        console.log(orderStatuss + 'results');
        const order = orderStatuss.map(async (value: any) => {
            console.log(value.orderStatusId + 'orderStatusId');
            const user = orderList.find(item => item.orderStatusId === value.orderStatusId);
            console.log(user + 'user');
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
               temp.createdDate = user.createdDate;
            }
           return temp;
        });
        const result = await Promise.all(order);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order Log list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }
}
