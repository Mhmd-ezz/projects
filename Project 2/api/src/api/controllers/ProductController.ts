import { ProductTranslationService } from './../services/ProductTranslationService';
import { VendorService } from './../services/VendorService';
/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Body,
    Req,
    Post,
    Param,
    Put, Delete
} from 'routing-controllers';
import { ProductService } from '../services/ProductService';
import { ProductToCategoryService } from '../services/ProductToCategoryService';
import { ProductImageService } from '../services/ProductImageService';
import { Product } from '../models/ProductModel';
import { ProductOption } from '../models/ProductOption';
import { ProductOptionValue } from '../models/ProductOptionValue';
import { ProductDiscount } from '../models/ProductDiscount';
import { ProductSpecial } from '../models/ProductSpecial';
import { classToPlain } from 'class-transformer';
import { DeleteProductRequest } from './requests/DeleteProductRequest';
import { AddProductRequest } from './requests/CreateProductRequest';
import { UpdateProductRequest } from './requests/UpdateProductRequest';
import { ProductToCategory } from '../models/ProductToCategory';
import { ProductImage } from '../models/ProductImage';
import { CategoryService } from '../services/CategoryService';
import { OrderProductService } from '../services/OrderProductService';
import { OrderService } from '../services/OrderService';
import { ProductRelated } from '../models/ProductRelated';
import { ProductRelatedService } from '../services/ProductRelatedService';
import { UpdateTodayDealsParam } from './requests/UpdateTodayDealsParam';
import { UpdateRatingStatusRequest } from './requests/UpdateRatingStatusRequest';
import { ProductViewLogService } from '../services/ProductViewLogService';
import { ProductOptionService } from '../services/ProductOptionService';
import { ProductOptionValueService } from '../services/ProductOptionValueService';
import { OptionDescriptionService } from '../services/OptionDescriptionService';
import { OptionValueDescriptionService } from '../services/OptionValueDescriptionService';
import { OptionService } from '../services/OptionService';
import { ProductDiscountService } from '../services/ProductDiscountService';
import { ProductSpecialService } from '../services/ProductSpecialService';
import moment = require('moment');
import { CustomerService } from '../services/CustomerService';
import { ProductRatingService } from '../services/RatingService';
import { CustomerWishlistService } from '../services/CustomerWishlistService';
import { VendorProductService } from '../services/VendorProductService';
import fs = require('fs');
import { TaxService } from '../services/TaxService';
import { ProductTranslation } from '../models/ProductTranslation';

@JsonController('/product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private vendorService: VendorService,
        private categoryService: CategoryService,
        private orderProductService: OrderProductService,
        private orderService: OrderService,
        private productRelatedService: ProductRelatedService,
        private productTranslationService: ProductTranslationService,
        private productViewLogService: ProductViewLogService,
        private productOptionService: ProductOptionService,
        private productOptionValueService: ProductOptionValueService,
        private optionDescriptionService: OptionDescriptionService,
        private optionValueDescriptionService: OptionValueDescriptionService,
        private optionService: OptionService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private productRatingService: ProductRatingService,
        private customerService: CustomerService,
        private vendorProductService: VendorProductService,
        private taxService: TaxService,
        private customerwishlistService: CustomerWishlistService
    ) {
    }

    // Product List API
    /**
     * @api {get} /api/product/productlist Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/productlist')
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals', 'productSlug', 'isActive'];

        const relation = [];

        const WhereConditions = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const productLists: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(value.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(value.productId, todaydate);
            // for multi-vendor
            const vendor = await this.vendorProductService.findOne({ where: { productId: value.productId } });
            if (vendor) {
                temp.vendorproduct = 1;
            } else {
                temp.vendorproduct = 0;
            }
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            }
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Create Product API
    /**
     * @api {post} /api/product/add-product Add Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} productOptions productOptions
     * @apiParam (Request body) {Object[]} productTranslation List of Product Translation
     * 
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "productSlug" : "",
     *      "upc" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ]
     *      "productTranslation":[
     *        {
     *           "languageCode":"en"
     *           "name":""
     *           "description":""
     *        }
     *      ]
     *     "relatedProductId":[ ]
     *     "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }]
     *     "productDiscount":[
     *      {
     *         "discountQuantity":""
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }]
     *     "productOptions":[
     *      {
     *       "optionId":""
     *       "value":""
     *       "required":""
     *           "optionValue":[
     *            {
     *               "optionValueId":""
     *               "quantity":""
     *               "subtractStock":""
     *               "pricePrefix":""
     *               "price":""
     *            }]
     *      }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-product
     * @apiErrorExample {json} AddProduct error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/add-product')
    @Authorized()
    public async addProduct(@Body({ validate: true }) model: AddProductRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const userId = request.user.userId;
        // @ Get current vendor to set product accountType 
        const vendor = await this.vendorService.findOne({ where: { customerId: userId } });

        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to find user.',
            };
            return response.status(400).send(errorResponse);
        }

        let productOptions = [];
        let optionValue = [];
        const newProduct = new Product();
        newProduct.name = model.productName;
        newProduct.description = model.productDescription;
        newProduct.sku = model.sku;
        newProduct.upc = model.upc;
        newProduct.quantity = model.quantity;
        // newProduct.price = product.price;
        ///// different charges//////
        const serviceCharge: any = {};
        serviceCharge.productCost = model.price;
        serviceCharge.packingCost = model.packingCost ? model.packingCost : 0;
        serviceCharge.shippingCost = model.shippingCost ? model.shippingCost : 0;
        serviceCharge.tax = model.tax ? model.tax : 0;
        serviceCharge.others = model.others ? model.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.taxType = model.taxType ? model.taxType : 0;
        newProduct.taxValue = model.tax ? model.tax : 0;
        newProduct.stockStatusId = model.outOfStockStatus ? model.outOfStockStatus : 1;
        newProduct.shipping = model.requiredShipping;
        newProduct.dateAvailable = moment(model.dateAvailable).toISOString() as any;
        newProduct.metaTagTitle = model.metaTagTitle;
        newProduct.metaTagDescription = model.metaTagDescription;
        newProduct.metaTagKeyword = model.metaTagKeyword;
        newProduct.isActive = model.status;
        newProduct.isFeatured = 0;
        newProduct.todayDeals = 0;
        newProduct.sortOrder = model.sortOrder;
        newProduct.accountType = vendor.accountType;

        const metaTagTitle = model.productSlug;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.productService.slugData(metaTagTitle);
            if (getBlogSlug.length === 0) {
                newProduct.productSlug = data;
            } else if (getBlogSlug.length === 1) {
                newProduct.productSlug = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const val = slugVal.productSlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newProduct.productSlug = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = model.productName;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.productService.slugData(title);
            if (getBlogSlug.length === 0) {
                newProduct.productSlug = data;
            } else if (getBlogSlug.length === 1) {
                newProduct.productSlug = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const val = slugVal.productSlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newProduct.productSlug = data + '-' + (slugNumber + 1);
            }
        }
        // adding category name and product name in keyword field for keyword search
        const row: any = [];
        if (model.categoryId) {
            const category = model.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                row.push(name);
            }
            row.push('~' + model.productName + '~');
        }
        const value = row.toString();
        newProduct.keywords = value;

        const saveProduct = await this.productService.create(newProduct);

        // Add related product
        if (model.relatedProductId) {
            const relatedProduct: any = model.relatedProductId;
            for (const relatedproduct of relatedProduct) {
                const newRelatedProduct: any = new ProductRelated();
                newRelatedProduct.productId = saveProduct.productId;
                newRelatedProduct.relatedProductId = relatedproduct;
                this.productRelatedService.create(newRelatedProduct);
            }
        }

        // save category
        if (model.categoryId) {
            const category = model.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        // Save products Image
        const productImage: any = model.image;
        for (const imageRow of productImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newProductImage = new ProductImage();
            newProductImage.productId = saveProduct.productId;
            newProductImage.image = imageResult.image;
            newProductImage.containerName = imageResult.containerName;
            newProductImage.defaultImage = imageResult.defaultImage;
            this.productImageService.create(newProductImage);
        }

        // Product Options
        if (model.productOptions) {
            productOptions = model.productOptions;
            for (const option of productOptions) {
                optionValue = option.optionValue;
                if (optionValue.length !== 0) {
                    const productOptionData = new ProductOption();
                    productOptionData.productId = saveProduct.productId;
                    productOptionData.optionId = option.optionId;
                    productOptionData.value = option.value;
                    productOptionData.required = option.required;
                    const productOptionSaveData = await this.productOptionService.create(productOptionData);
                    for (const optionvalue of optionValue) {
                        const productOptionValueData = new ProductOptionValue();
                        productOptionValueData.productOptionId = productOptionSaveData.productOptionId;
                        productOptionValueData.productId = saveProduct.productId;
                        productOptionValueData.optionId = productOptionSaveData.optionId;
                        productOptionValueData.optionValueId = optionvalue.optionValueId;
                        productOptionValueData.quantity = optionvalue.quantity;
                        productOptionValueData.subtractStock = optionvalue.subtractStock;
                        productOptionValueData.pricePrefix = optionvalue.pricePrefix;
                        productOptionValueData.price = optionvalue.price;
                        await this.productOptionValueService.create(productOptionValueData);
                    }
                }

            }
        }

        // Product Discount
        if (model.productDiscount) {
            const productDiscount: any = model.productDiscount;
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                await this.productDiscountService.create(discountData);
            }
        }

        // Product Special
        if (model.productSpecial) {
            const productSpecial: any[] = model.productSpecial;
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                specialPriceData.priority = special.specialPriority;
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                await this.productSpecialService.create(specialPriceData);
            }
        }

        // @ Product Translation
        if (model.productTranslation && model.productTranslation.length) {
            await model.productTranslation.forEach(async (entity: ProductTranslation) => {
                const prodTranslation = new ProductTranslation();
                prodTranslation.languageCode = entity.languageCode;
                prodTranslation.productId = saveProduct.productId;
                prodTranslation.name = entity.name;
                prodTranslation.description = entity.description;
                await this.productTranslationService.create(prodTranslation);
            });
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Product API
    /**
     * @api {post} /api/product/update-product/:id Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} productOptions productOptions
     * @apiParam (Request body) {Object[]} productTranslation List of Product Translation
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *      "productTranslation":[
     *        {
     *           "languageCode":"en"
     *           "name":""
     *           "description":""
     *        }
     *      ]
     *      "relatedProductId":[ "", ""],
     *      "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *       "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     *     "productOptions":[
     *      {
     *       "optionId":""
     *       "value":""
     *       "required":""
     *           "optionValue":[
     *            {
     *               "optionValueId":""
     *               "quantity":""
     *               "subtractStock":""
     *               "pricePrefix":""
     *               "price":""
     *            }]
     *      }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/update-product/:id')
    @Authorized()
    public async updateProduct(@Body({ validate: true }) model: UpdateProductRequest, @Res() response: any): Promise<any> {

        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: model.productId,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        updateProduct.name = model.productName;
        updateProduct.description = model.productDescription;
        updateProduct.sku = model.sku;
        updateProduct.upc = model.upc;
        updateProduct.quantity = model.quantity;

        //// special charges//////
        const serviceCharge: any = {};
        serviceCharge.productCost = model.price;
        serviceCharge.packingCost = model.packingCost ? model.packingCost : 0;
        serviceCharge.shippingCost = model.shippingCost ? model.shippingCost : 0;
        serviceCharge.tax = model.tax ? model.tax : 0;
        serviceCharge.others = model.others ? model.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.taxType = model.taxType ? model.taxType : 0;
        updateProduct.taxValue = model.tax ? model.tax : 0;
        updateProduct.stockStatusId = model.outOfStockStatus;
        updateProduct.shipping = model.requiredShipping;
        updateProduct.dateAvailable = moment(model.dateAvailable).toISOString();
        updateProduct.metaTagTitle = model.metaTagTitle;
        updateProduct.metaTagDescription = model.metaTagDescription;
        updateProduct.metaTagKeyword = model.metaTagKeyword;
        updateProduct.isActive = model.status;
        updateProduct.sortOrder = model.sortOrder;

        const metaTagTitle = model.productSlug;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getProductSlug = await this.productService.slugData(metaTagTitle);
            console.log(getProductSlug.length + 'length');
            // if (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle) {
            if (getProductSlug.length === 0 || getProductSlug === '' || getProductSlug === undefined) {
                updateProduct.productSlug = data;
            } else if (getProductSlug.length === 1 && (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle)) {
                updateProduct.productSlug = data + '-' + 1;
            } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                const slugVal = getProductSlug[getProductSlug.length - 1];
                console.log(slugVal + 'slugVal');
                const val = slugVal.productSlug;
                console.log(val + 'val');
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                updateProduct.productSlug = data + '-' + (slugNumber + 1);
            }
            // }
        } else {
            const title = model.productName;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getProductSlug = await this.productService.slugData(title);
            // if (title !== getProductSlug[getProductSlug.length - 1].name) {
            if (getProductSlug === '' || getProductSlug === undefined || getProductSlug.length === 0) {
                updateProduct.productSlug = data;
            } else if (getProductSlug.length === 1 && (title !== getProductSlug[getProductSlug.length - 1].name)) {
                updateProduct.productSlug = data + '-' + 1;
            } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                const slugVal = getProductSlug[getProductSlug.length - 1];
                const val = slugVal.productSlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                updateProduct.productSlug = data + '-' + (slugNumber + 1);
            }
            // }
        }
        // adding category name and product name in keyword field for keyword search
        const rows: any = [];
        if (model.categoryId) {
            const category = model.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                rows.push(name);
            }
            rows.push('~' + model.productName + '~');
        }
        const values = rows.toString();
        console.log(values + 'value');
        updateProduct.keywords = values;
        const saveProduct = await this.productService.create(updateProduct);

        // delete previous category
        this.productToCategoryService.delete({ productId: saveProduct.productId });

        // save category
        if (model.categoryId) {
            const category = model.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        const findProduct: any = await this.productRelatedService.findOne({
            where: {
                productId: saveProduct.productId,
            },
        });

        if (findProduct) {

            // delete previous related product
            this.productRelatedService.delete({ productId: saveProduct.productId });

            // update related product
            if (model.relatedProductId) {
                const relatedProduct: any = model.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    this.productRelatedService.create(newRelatedProduct);
                }
            }
        } else {

            // update related product
            if (model.relatedProductId) {
                const relatedProduct: any = model.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    this.productRelatedService.create(newRelatedProduct);
                }
            }

        }

        // Delete previous images
        this.productImageService.delete({ productId: saveProduct.productId });
        // Save products Image
        if (model.image) {
            const productImage: any = model.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                this.productImageService.create(newProductImage);
            }
        }

        let productOptions = [];
        let optionValue = [];

        // Product Options
        // Delete the product option && Option product Value
        await this.productOptionService.delete({ productId: saveProduct.productId });
        await this.productOptionValueService.delete({ productId: saveProduct.productId });
        const productoptions: [] = model.productOptions;
        if (productoptions.length > 0) {
            productOptions = model.productOptions;
            for (const option of productOptions) {
                optionValue = option.optionValue;
                if (optionValue.length !== 0) {
                    const productOptionData = new ProductOption();
                    productOptionData.productId = saveProduct.productId;
                    productOptionData.optionId = option.optionId;
                    productOptionData.value = option.value;
                    productOptionData.required = option.required;
                    const productOptionSaveData = await this.productOptionService.create(productOptionData);
                    for (const optionvalue of optionValue) {
                        const productOptionValueData = new ProductOptionValue();
                        productOptionValueData.productOptionId = productOptionSaveData.productOptionId;
                        productOptionValueData.productId = saveProduct.productId;
                        productOptionValueData.optionId = productOptionSaveData.optionId;
                        productOptionValueData.optionValueId = optionvalue.optionValueId;
                        productOptionValueData.quantity = optionvalue.quantity;
                        productOptionValueData.subtractStock = optionvalue.subtractStock;
                        productOptionValueData.pricePrefix = optionvalue.pricePrefix;
                        productOptionValueData.price = optionvalue.price;
                        await this.productOptionValueService.create(productOptionValueData);
                    }
                }
            }

            const wishlistOption: any = await this.customerwishlistService.find({
                where: {
                    productId: saveProduct.productId,
                },
            });
            if (wishlistOption.length >= 1) {
                for (const option of wishlistOption) {
                    console.log(option.wishlistProductId + 'wishlistProductId');
                    const value: any = await this.customerwishlistService.findOne({
                        where: {
                            wishlistProductId: option.wishlistProductId,
                        },
                    });
                    const optionId: any = await this.productOptionService.find({
                        where: {
                            productId: saveProduct.productId,
                            required: 1,
                        },
                    });
                    console.log(optionId.length + 'optionIdLength');
                    const row: any = [];
                    if (optionId.length >= 1) {
                        for (const productOpt of optionId) {
                            const vv: any = await this.productOptionValueService.findData({
                                where: {
                                    productOptionId: productOpt.productOptionId,
                                },
                            });
                            console.log(vv.productOptionValueId + 'productOptionValueId');
                            row.push(vv.productOptionValueId);
                        }
                    }
                    const optionvalue = row.toString();
                    value.productOptionValueId = optionvalue;
                    await this.customerwishlistService.create(value);
                }
            }
        }
        if (productoptions.length === 0) {
            const wishlistOptions: any = await this.customerwishlistService.find({
                where: {
                    productId: saveProduct.productId,
                },
            });
            if (wishlistOptions.length >= 1) {
                for (const option of wishlistOptions) {
                    console.log(option.wishlistProductId + 'wishlistProductId');
                    const value: any = await this.customerwishlistService.findOne({
                        where: {
                            wishlistProductId: option.wishlistProductId,
                        },
                    });
                    value.productOptionValueId = '';
                    await this.customerwishlistService.create(value);
                }
            }
        }

        // Product Discount
        if (model.productDiscount) {
            // Delete the product discount
            this.productDiscountService.delete({ productId: saveProduct.productId });
            const productDiscount: any = model.productDiscount;
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                await this.productDiscountService.create(discountData);
            }
        }

        // Product Special
        if (model.productSpecial) {
            this.productSpecialService.delete({ productId: saveProduct.productId });
            const productSpecial: any = model.productSpecial;
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                specialPriceData.customerGroupId = special.customerGroupId;
                specialPriceData.priority = special.specialPriority;
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                await this.productSpecialService.create(specialPriceData);
            }
        }

        // @ Product Translation
        await this.productTranslationService.delete({ productId: saveProduct.productId });
        if (model.productTranslation && model.productTranslation.length) {
            await model.productTranslation.forEach(async (entity: ProductTranslation) => {
                const productTranslation = new ProductTranslation();
                productTranslation.languageCode = entity.languageCode;
                productTranslation.name = entity.name;
                productTranslation.description = entity.description;
                productTranslation.productId = saveProduct.productId;
                await this.productTranslationService.create(productTranslation);
            });
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product Detail API
    /**
     * @api {get} /api/product/product-detail/:id Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/product-detail/:id')
    @Authorized()
    public async productDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: { productId: id },
        });
        const productDetails: any = classToPlain(productDetail);
        console.log(productDetails.productId + 'productDetailIdddddddddd');
        const serviceCharges = productDetails.serviceCharges;
        console.log(serviceCharges + 'serviceCharges');
        if (serviceCharges) {
            const specialCharge = JSON.parse(productDetails.serviceCharges);
            productDetails.productCost = specialCharge.productCost;
            productDetails.packingCost = specialCharge.packingCost;
            productDetails.shippingCost = specialCharge.shippingCost;
            productDetails.others = specialCharge.others;
        }
        if (productDetails.taxType === 2) {
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            const percentToAmount = productDetails.price * (tax.taxPercentage / 100);
            const val = +productDetails.price + percentToAmount;
            productDetails.priceWithTax = val;
        } else {
            const taxValue = (productDetails.taxValue && productDetails.taxValue > 0) ? productDetails.taxValue : 0;
            const val = +productDetails.price + taxValue;
            productDetails.priceWithTax = val;
        }
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                const temp: any = value;
                if (categoryNames !== undefined) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        productDetails.relatedProductDetail = await this.productRelatedService.findAll({ where: { productId: productDetail.productId } }).then((val) => {
            const relatedProduct = val.map(async (value: any) => {
                const productId = value.relatedProductId;
                const product = await this.productService.findOne({
                    select: ['productId', 'name'],
                    where: { productId },
                    relations: ['productImage'],
                });
                return classToPlain(product);
            });
            const resultData = Promise.all(relatedProduct);
            return resultData;
        });
        productDetails.productOption = await this.productOptionService.find({
            where: { productId: productDetail.productId },
            select: ['productOptionId', 'optionId', 'value', 'required', 'productId'],
        }).then(async (val) => {
            const productOption = val.map(async (value: any) => {
                const dataValue: any = value;
                const optionIdValue = value.optionId;
                const productOptionValueId = value.productId;
                const optionTypeData = await this.optionDescriptionService.findOne({ where: { optionId: optionIdValue } });
                const optionTypeName = await this.optionService.findOne({ where: { optionId: optionIdValue } });
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
                    where: { optionId: optionIdValue, productId: productOptionValueId },
                }).then(async (optionValue) => {
                    const optionDescriptionName = await Promise.all(optionValue.map(async (valueData): Promise<any> => {
                        const optionDataDetails: any = valueData;
                        const optionValueIdData = valueData.optionValueId;
                        const dataName = await this.optionValueDescriptionService.findOne({
                            where: { optionValueId: optionValueIdData },
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
                    if (optiontype.optionValueName !== '') {
                        console.log(optiontype.optionValueName + 'optionValueName');
                        option.push(optiontype);
                    } else {
                        const productOptionValue = await this.productOptionValueService.findData({
                            where: { optionValueId: optiontype.optionValueId, productId: optiontype.productId },
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
        productDetails.productSpecialPrice = await this.productSpecialService.findAll({
            select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd'],
            where: { productId: productDetail.productId },
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd'],
            where: { productId: productDetail.productId },
        });

        productDetails.productTranslation  = await this.productTranslationService.findAll({
            select: ['languageCode', 'name', 'description'],
            where: { productId: productDetail.productId },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    //  Top Selling Product List API
    /**
     * @api {get} /api/product/top-selling-productlist  Top selling ProductList API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/top-selling-productlist')
    @Authorized()
    public async topSellingProductList(@Req() request: any, @Res() response: any): Promise<any> {
        const data = await this.productService.recentProductSelling(4);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'image', 'imagePath', 'price', 'name', 'description', 'productSlug'],
                where: { productId: result.product },
            });
            const temp: any = result;
            const productImage = await this.productImageService.findAll({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: result.product,
                    defaultImage: 1,
                },
            });
            temp.product = product;
            temp.productImage = productImage;
            return temp;
        });

        const value = await Promise.all(promise);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get Top Selling Product..!',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Recent Selling Product List
    /**
     * @api {get} /api/product/recent-selling-product  Recent Selling Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully listed recent product selling!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/recent-selling-product
     * @apiErrorExample {json} Selling Product List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Recent selling product function
    @Get('/recent-selling-product')
    @Authorized()
    public async sellingProduct(@Req() request: any, @Res() response: any): Promise<any> {
        const limit = 3;
        const orderList = await this.orderProductService.List(limit);
        const promises = orderList.map(async (result: any) => {
            const order = await this.orderService.findOrder({
                select: ['invoiceNo', 'invoicePrefix', 'orderPrefixId', 'orderId', 'orderStatusId'],
                where: { orderId: result.orderId },
            });
            const temp: any = result;
            temp.order = order;
            const product = await this.productImageService.findAll({
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            temp.productImage = product;
            return temp;
        });
        const results = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'successfully listed recently selling products..!',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // update product to Today Deals API
    /**
     * @api {put} /api/product/update-todayDeals/:id Update Today Deals API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} todayDeals TodayDeals should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "todayDeals" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product to today Deals.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-todayDeals/:id
     * @apiErrorExample {json} todayDeals error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-todayDeals/:id')
    @Authorized()
    public async updateTodayDeals(@Param('id') id: number, @Body({ validate: true }) updateTodayDealsParam: UpdateTodayDealsParam, @Res() response: any): Promise<any> {

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

        product.todayDeals = updateTodayDealsParam.todayDeals;
        const productSave = await this.productService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'product updated successfully .',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Recent viewLog list API
    /**
     * @api {get} /api/product/viewLog-list Product View Log List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/viewLog-list
     * @apiErrorExample {json} ViewLog List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/viewLog-list')
    @Authorized()
    public async productViewLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [];
        const search = [];
        const viewLogs = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: viewLogs,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: viewLogs,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Customer product view list API
    /**
     * @api {get} /api/product/customerProductView-list/:id Customer product View List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/customerProductView-list/:id
     * @apiErrorExample {json} customerProductView List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/customerProductView-list/:id')
    @Authorized()
    public async customerProductView(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [{
            name: 'customerId',
            value: id,
        }];
        const search = [];
        const customerProductview = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: customerProductview,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: customerProductview,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Get product rating/review API
    /**
     * @api {get} /api/product/Get-Product-rating Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
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
     * @apiSampleRequest /api/product/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/Get-Product-rating')
    @Authorized()
    public async getProductRating(@QueryParam('productId') productId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['ratingId', 'review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'orderProductId', 'isActive'];
        const relation = [];
        const WhereConditions = [
            {
                name: 'productId',
                op: 'where',
                value: productId,
            },
        ];
        const rating: any = await this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
        const promise = rating.map(async (result: any) => {
            const temp: any = result;
            const customer: any = await this.customerService.findOne({
                select: ['avatar', 'avatarPath'],
                where: { id: result.customerId },
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
    // Change Status rating/review API
    /**
     * @api {put} /api/product/Product-rating-status/:id Product Rating Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated review status.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/Product-rating-status/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/Product-rating-status/:id')
    @Authorized()
    public async productRatingStatus(@Param('id') id: number, @Body({ validate: true }) updateRatingStatus: UpdateRatingStatusRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const Rating = await this.productRatingService.findOne({ where: { ratingId: id } });
        Rating.isActive = updateRatingStatus.status;
        const updateRating = await this.productRatingService.create(Rating);
        const RatingValue: any = await this.productRatingService.consolidateRating(Rating.productId);
        const ProductData = await this.productService.findOne({ where: { productId: Rating.productId } });
        if (RatingValue.RatingCount === '0') {
            ProductData.rating = 0;
        } else {
            ProductData.rating = RatingValue.RatingSum / RatingValue.RatingCount;
        }
        console.log(ProductData.rating + 'rating');
        await this.productService.create(ProductData);
        if (updateRating) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Rating Status. ',
                data: updateRating,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to update product Rating.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product Details Excel Document download
    /**
     * @api {get} /api/product/product-excel-list Product Excel
     * @apiGroup Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/product-excel-list
     * @apiErrorExample {json} product Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/product-excel-list')
    public async excelProductView(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Detail Sheet');
        const rows = [];
        const productid = productId.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
            { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
            { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
            { header: 'Meta Tag Title', key: 'metaTagTitle', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            const productDescription = dataId.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            rows.push([dataId.productId, dataId.name, dataDescription.trim(), dataId.price, dataId.sku, dataId.upc, dataId.quantity, dataId.minimumQuantity, dataId.subtractStock, dataId.manufacturerId, dataId.metaTagTitle]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // ExportAllProducts
    /**
     * @api {get} /api/product/allproduct-excel-list AllProduct Excel sheet
     * @apiGroup Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/allproduct-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/allproduct-excel-list')
    public async ExportAllProducts(@Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        const dataId = await this.productService.findAll();
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Products are empty',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
            { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
            { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
            { header: 'Meta Tag Title', key: 'metaTagTitle', size: 16, width: 15 },
            { header: 'is featured', key: 'isFeatured', size: 16, width: 15 },
            { header: 'Total deals', key: 'todayDeals', size: 16, width: 15 },
            { header: 'Condition', key: 'condition', size: 16, width: 15 },
            { header: 'Rating', key: 'Rating', size: 16, width: 15 },
            { header: 'Related Products', key: 'relatedProducts', size: 16, width: 15 },
            { header: 'IsActive', key: 'isActive', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('L1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('M1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('N1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('O1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('P1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('Q1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const product = await this.productService.findAll();
        for (const products of product) {
            const productDescription = products.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            const related = [];
            const relatedProducts = await this.productRelatedService.findAll({ where: { productId: products.productId } });
            for (const relatedProduct of relatedProducts) {
                const productName = await this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                related.push(productName.name);
            }
            const relProduct = related.toString();
            console.log(relProduct + 'relatedProduct');
            rows.push([products.productId, products.name, dataDescription.trim(), products.price, products.sku, products.upc, products.quantity, products.minimumQuantity, products.subtractStock, products.manufacturerId, products.metaTagTitle, products.isFeatured, products.todaysDeals, products.condition, products.rating, relProduct, products.isActive]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const worksheet1 = workbook.addWorksheet('special price');
        worksheet1.columns = [
            { header: 'product Special Id', key: 'productSpecialId', size: 16, width: 30 },
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product Name', key: 'productName', size: 16, width: 15 },
            { header: 'priority', key: 'priority', size: 16, width: 15 },
            { header: 'price', key: 'price', size: 16, width: 30 },
            { header: 'start date', key: 'startDate', size: 16, width: 15 },
            { header: 'end date', key: 'endDate', size: 16, width: 15 },
        ];
        worksheet1.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const special = [];
        const specialPrices = await this.productSpecialService.find();
        for (const specialPrice of specialPrices) {
            const productName = await this.productService.findOne({ where: { productId: specialPrice.productId } });
            special.push([specialPrice.productSpecialId, specialPrice.productId, productName.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
        }
        // Add all rows data in sheet
        worksheet1.addRows(special);
        const worksheet2 = workbook.addWorksheet('discount price');
        worksheet2.columns = [
            { header: 'product dicount Id', key: 'productDiscountId', size: 16, width: 30 },
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product name', key: 'productName', size: 16, width: 30 },
            { header: 'priority', key: 'priority', size: 16, width: 15 },
            { header: 'price', key: 'price', size: 16, width: 30 },
            { header: 'start date', key: 'startDate', size: 16, width: 15 },
            { header: 'end date', key: 'endDate', size: 16, width: 15 },
        ];
        worksheet2.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const discount = [];
        const discountPrices = await this.productDiscountService.find();
        for (const discountPrice of discountPrices) {
            const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
            discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
        }
        // Add all rows data in sheet
        worksheet2.addRows(discount);
        const worksheet3 = workbook.addWorksheet('Images');
        worksheet3.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product Name', key: 'productName', size: 16, width: 15 },
            { header: 'Image Path', key: 'imagePath', size: 16, width: 15 },
            { header: 'Image', key: 'image', size: 16, width: 30 },
            { header: 'Default Image', key: 'defaultImage', size: 16, width: 30 },
        ];
        worksheet3.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const productimage = [];
        const images = await this.productImageService.find();
        for (const image of images) {
            const productName = await this.productService.findOne({ where: { productId: image.productId } });
            productimage.push([image.productId, productName.name, image.containerName, image.image, image.defaultImage]);
        }
        // Add all rows data in sheet
        worksheet3.addRows(productimage);
        const worksheet4 = workbook.addWorksheet('ProductOption');
        worksheet4.columns = [
            { header: 'product Option Id', key: 'productOptionId', size: 16, width: 15 },
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'productName', size: 16, width: 15 },
            { header: 'Option Id', key: 'optionId', size: 16, width: 30 },
            { header: 'Option name', key: 'optionName', size: 16, width: 30 },
            { header: 'Option Value Id', key: 'optionValueId', size: 16, width: 30 },
            { header: 'Option Value Name', key: 'optionValueName', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 30 },
            { header: 'PricePrefix', key: 'pricePrefix', size: 16, width: 30 },
        ];
        worksheet4.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet4.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const productOption = [];
        const productOptions = await this.productOptionValueService.find();
        for (const option of productOptions) {
            const productName = await this.productService.findOne({ where: { productId: option.productId } });
            const optionName = await this.optionDescriptionService.findOne({ where: { optionId: option.optionId } });
            const optionValueName = await this.optionValueDescriptionService.findOne({ where: { optionValueId: option.optionValueId } });
            productOption.push([option.productOptionId, option.productId, productName.name, option.optionId, optionName.name, option.optionValueId, optionValueName.name, option.price, option.pricePrefix]);
        }
        // Add all rows data in sheet
        worksheet4.addRows(productOption);
        const worksheet6 = workbook.addWorksheet('Related Category');
        worksheet6.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Category Id', key: 'categoryId', size: 16, width: 15 },
            { header: 'Category Name', key: 'CategoryName', size: 16, width: 30 },
        ];
        worksheet6.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet6.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet6.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const relatedCategory = [];
        const categories = await this.productToCategoryService.find();
        for (const category of categories) {
            const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
            relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
        }
        // Add all rows data in sheet
        worksheet6.addRows(relatedCategory);

        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Delete Product API
    /**
     * @api {delete} /api/product/delete-product/:id Delete Single Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-product/:id')
    @Authorized()
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        const product = await this.productService.findOne(productid);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.findOne({ where: { productId: productid } });
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'That product is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteProduct = await this.productService.delete(productid);
        const relatedProduct = await this.productRelatedService.findAll({ where: { productId: productid } });
        for (const relatedproduct of relatedProduct) {
            await this.productRelatedService.delete(relatedproduct.id);
        }
        const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: productid } });
        for (const relatedproducts of relatedProductId) {
            await this.productRelatedService.delete(relatedproducts.id);
        }

        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Product API

    /**
     * @api {post} /api/product/delete-product Delete Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParamExample {json} Input
     * {
     * "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-product')
    @Authorized()
    public async deleteMultipleProduct(@Body({ validate: true }) productDelete: DeleteProductRequest, @Res() response: any, @Req() request: any): Promise<Product> {

        const productIdNo = productDelete.productId.toString();
        const productid = productIdNo.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a product for delete',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const orderProductId = await this.orderProductService.findOne({ where: { productId: id } });
            if (orderProductId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'That product is ordered',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const deleteProductId = parseInt(id, 10);
            await this.productService.delete(deleteProductId);
            const relatedProduct = await this.productRelatedService.findAll({ where: { productId: deleteProductId } });
            for (const relatedproduct of relatedProduct) {
                await this.productRelatedService.delete(relatedproduct.id);
            }
            const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: deleteProductId } });
            for (const relatedproducts of relatedProductId) {
                await this.productRelatedService.delete(relatedproducts.id);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Product',
        };
        return response.status(200).send(successResponse);
    }

    // Product Rating List API
    /**
     * @api {get} /api/product/product-rating-list Product Rating and review List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limits
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} productId productIds
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *       "status": "1"
     *      "message": "Successfully get product rating list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-rating-list
     * @apiErrorExample {json} productRatingList error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/product-rating-list')
    @Authorized()
    public async productRatinglist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productId') productId: number, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['ratingId', 'productId', 'orderProductId', 'customerId', 'firstName', 'lastName', 'email', 'rating', 'review', 'isActive', 'createdDate'];

        const relation = [];

        const WhereConditions = [
            {
                name: 'productId',
                op: 'like',
                value: productId,
            },
        ];
        const productLists: any = await this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);

        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const promise = productLists.map(async (result: any) => {
            const temp: any = result;
            const productData = await this.productService.findOne({
                select: ['name'],
                where: { productId: result.productId },
            });
            const imageData = await this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: { productId: result.productId, defaultImage: 1 },
            });
            temp.productName = productData.name;
            temp.image = imageData.image;
            temp.imagePath = imageData.containerName;
            return temp;
        });
        const value: any = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product rating and review.',
            data: classToPlain(value),
        };
        return response.status(200).send(successResponse);

    }

    // Update Product Slug API
    /**
     * @api {put} /api/product/update-product-slug Update Product Slug API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Product Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product-slug
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-product-slug')
    public async updateSlug(@Res() response: any): Promise<Product> {
        const arr: any = [];
        const product = await this.productService.findAll();
        for (const val of product) {
            const metaTagTitle = val.metaTagTitle;
            if (metaTagTitle) {
                const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                console.log('DATA' + data);
                const getProductSlug = await this.productService.slug(metaTagTitle);
                console.log(getProductSlug + 'getProductSlug');
                if (getProductSlug.length === 0 || getProductSlug === '' || getProductSlug === undefined) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
                console.log('PRODUCTSLUGMETA' + val.productSlug);
            } else {
                const title = val.name;
                const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                console.log('DATA' + data);
                const getProductSlug = await this.productService.slug(title);
                console.log(getProductSlug.length);
                console.log(getProductSlug + 'getCategorySlug');
                if (getProductSlug === '' || getProductSlug === undefined || getProductSlug.length === 0) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (title !== getProductSlug[getProductSlug.length - 1].title)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
                console.log('PRODUCTSLUGTITLE' + val.productSlug);
            }
            arr.push(val);
        }
        const update = await this.productService.create(arr);
        console.log(update);
        const successResponse: any = {
            status: 1,
            message: 'successfully update the product slug.',
        };
        return response.status(200).send(successResponse);
    }
}
