import { ProductTranslation } from './../../../models/ProductTranslation';
import 'reflect-metadata';

import { classToPlain } from 'class-transformer';
import fs = require('fs');
import moment = require('moment');
import path = require('path');
import {
    Authorized,
    Body,
    BodyParam,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParam,
    Req,
    Res,
    UploadedFile,
} from 'routing-controllers';
import xlsx = require('xlsx');

import { PriceUpdateFileLog } from '../../../models/PriceUpdateFileLog';
import { ProductDiscount } from '../../../models/ProductDiscount';
import { ProductImage } from '../../../models/ProductImage';
import { Product } from '../../../models/ProductModel';
import { ProductOption } from '../../../models/ProductOption';
import { ProductOptionValue } from '../../../models/ProductOptionValue';
import { ProductPriceLog } from '../../../models/ProductPriceLog';
import { ProductRelated } from '../../../models/ProductRelated';
import { ProductSpecial } from '../../../models/ProductSpecial';
import { ProductToCategory } from '../../../models/ProductToCategory';
import { VendorProducts } from '../../../models/VendorProducts';
import { CategoryService } from '../../../services/CategoryService';
import { CustomerService } from '../../../services/CustomerService';
import { CustomerWishlistService } from '../../../services/CustomerWishlistService';
import { OptionDescriptionService } from '../../../services/OptionDescriptionService';
import { OptionService } from '../../../services/OptionService';
import { OptionValueDescriptionService } from '../../../services/OptionValueDescriptionService';
import { OrderProductService } from '../../../services/OrderProductService';
import { PriceUpdateFileLogService } from '../../../services/PriceUpdateFileLogService';
import { ProductDiscountService } from '../../../services/ProductDiscountService';
import { ProductImageService } from '../../../services/ProductImageService';
import { ProductOptionService } from '../../../services/ProductOptionService';
import { ProductOptionValueService } from '../../../services/ProductOptionValueService';
import { ProductPriceLogService } from '../../../services/ProductPriceLogService';
import { ProductRelatedService } from '../../../services/ProductRelatedService';
import { ProductService } from '../../../services/ProductService';
import { ProductSpecialService } from '../../../services/ProductSpecialService';
import { ProductToCategoryService } from '../../../services/ProductToCategoryService';
import { VendorProductService } from '../../../services/VendorProductService';
import { VendorService } from '../../../services/VendorService';
import { Vendor } from './../../../models/Vendor';
import { ProductTranslationService } from './../../../services/ProductTranslationService';
import { VendorProductRequest } from './requests/VendorProductRequest';

/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

@JsonController('/vendor-product')
export class VendorProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private categoryService: CategoryService,
        private productRelatedService: ProductRelatedService,
        private productOptionService: ProductOptionService,
        private productOptionValueService: ProductOptionValueService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private customerWishlistService: CustomerWishlistService,
        private orderProductService: OrderProductService,
        private customerService: CustomerService,
        private vendorService: VendorService,
        private optionDescriptionService: OptionDescriptionService,
        private optionValueDescriptionService: OptionValueDescriptionService,
        private optionService: OptionService,
        private productPriceLogService: ProductPriceLogService,
        private priceUpdateFileLogService: PriceUpdateFileLogService,
        private vendorProductService: VendorProductService,
        private productTranslationService: ProductTranslationService
    ) {
    }

    // Create Vendor Product API
    /**
     * @api {post} /api/vendor-product/create-vendor-product Create Vendor Product API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
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
     *      "productSlug" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "others" : "",
     *      "productSlug" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
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
     *      "message": "Successfully created new Vendor product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/create-vendor-product
     * @apiErrorExample {json} Vendor Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/create-vendor-product')
    @Authorized('vendor')
    public async createProduct(@Body({ validate: true }) model: VendorProductRequest, @Req() req: any, @Res() response: any): Promise<any> {

        const vendor: Vendor = req.user;

        let productOptions = [];
        let optionValue = [];
        const newProduct: Product = new Product();
        newProduct.name = model.productName;
        newProduct.description = model.productDescription;
        newProduct.sku = model.sku;
        newProduct.upc = model.upc;
        newProduct.quantity = model.quantity ? model.quantity : 1;
        const serviceCharge: any = {};
        serviceCharge.productCost = model.price;
        serviceCharge.packingCost = model.packingCost ? model.packingCost : 0;
        serviceCharge.shippingCost = model.shippingCost ? model.shippingCost : 0;
        serviceCharge.tax = model.tax ? model.tax : 0;
        serviceCharge.others = model.others ? model.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.tax + serviceCharge.others;
        newProduct.quantity = model.quantity;
        newProduct.stockStatusId = model.outOfStockStatus ? model.outOfStockStatus : 1;
        newProduct.shipping = model.requiredShipping;
        newProduct.dateAvailable = moment(model.dateAvailable).toISOString() as any;
        newProduct.metaTagTitle = model.metaTagTitle;
        newProduct.metaTagDescription = model.metaTagDescription;
        newProduct.metaTagKeyword = model.metaTagKeyword;
        newProduct.accountType = vendor.accountType;

        newProduct.isActive = model.isActive === undefined ? 1 : model.isActive as any;
        newProduct.isFeatured = 0;
        newProduct.todayDeals = 0;
        newProduct.sortOrder = model.sortOrder;

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
        const rows: any = [];
        if (model.categoryId) {
            const category = model.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                if (categoryNames === undefined) {
                    return this.BadResponse(response, 'Invalid product category: ' + categoryId);
                }
                const name = '~' + categoryNames.name + '~';
                console.log(name + 'categoryName');
                rows.push(name);
            }
            rows.push('~' + model.productName + '~');
        }
        const value = rows.toString();
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
                const productTranslation = new ProductTranslation();
                productTranslation.languageCode = entity.languageCode;
                productTranslation.productId = saveProduct.productId;
                productTranslation.name = entity.name;
                productTranslation.description = entity.description;
                await this.productTranslationService.create(productTranslation);
            });
        }

        const vendorProducts: any = new VendorProducts();
        vendorProducts.productId = saveProduct.productId;
        vendorProducts.vendorId = req.user.vendorId;
        // Allow auto-approval of created products
        // vendorProducts.approvalFlag = 0;
        // vendorProducts.approvedBy = 0;
        // vendorProducts.approvedDate = undefined;
        vendorProducts.approvalFlag = 1;
        vendorProducts.approvedBy = req.user.userId;
        const today = new Date().toISOString().slice(0, 10);
        vendorProducts.approvalDate = today;

        await this.vendorProductService.create(vendorProducts);
        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Vendor Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create Vendor Product',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Update Vendor Product API
    /**
     * @api {put} /api/vendor-product/update-vendor-product/:id Update Vendor Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
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
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
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
     *       "relatedProductId":[ "", ""],
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
     *      "message": "Successfully updated vendor products.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/update-vendor-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-vendor-product/:id')
    @Authorized('vendor')
    public async updateProduct(@Param('id') id: number, @Body({ validate: true }) model: VendorProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(model);
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        console.log(id + 'id');
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
        updateProduct.quantity = model.quantity ? model.quantity : 1;
        const serviceCharge: any = {};
        serviceCharge.productCost = model.price;
        serviceCharge.packingCost = model.packingCost ? model.packingCost : 0;
        serviceCharge.shippingCost = model.shippingCost ? model.shippingCost : 0;
        serviceCharge.tax = model.tax ? model.tax : 0;
        serviceCharge.others = model.others ? model.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.tax + serviceCharge.others;
        updateProduct.stockStatusId = model.outOfStockStatus;
        updateProduct.shipping = model.requiredShipping;
        updateProduct.dateAvailable = moment(model.dateAvailable).toISOString();
        updateProduct.metaTagTitle = model.metaTagTitle;
        updateProduct.metaTagDescription = model.metaTagDescription;
        updateProduct.metaTagKeyword = model.metaTagKeyword;
        updateProduct.sortOrder = model.sortOrder;

        const metaTagTitle = model.productSlug;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getProductSlug = await this.productService.slugData(metaTagTitle);
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
            console.log(category + 'categoryId');
            for (const categoryId of category) {
                console.log(categoryId + 'categoryId');
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
        console.log(productoptions.length + '11111');
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

            const wishlistOption: any = await this.customerWishlistService.find({
                where: {
                    productId: saveProduct.productId,
                },
            });
            if (wishlistOption.length >= 1) {
                for (const option of wishlistOption) {
                    console.log(option.wishlistProductId + 'wishlistProductId');
                    const value: any = await this.customerWishlistService.findOne({
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
                    await this.customerWishlistService.create(value);
                }
            }
        }
        if (productoptions.length === 0) {
            const wishlistOptions: any = await this.customerWishlistService.find({
                where: {
                    productId: saveProduct.productId,
                },
            });
            if (wishlistOptions.length >= 1) {
                for (const option of wishlistOptions) {
                    console.log(option.wishlistProductId + 'wishlistProductId');
                    const value: any = await this.customerWishlistService.findOne({
                        where: {
                            wishlistProductId: option.wishlistProductId,
                        },
                    });
                    value.productOptionValueId = '';
                    await this.customerWishlistService.create(value);
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
                message: 'Successfully updated your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated your Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor Product List API
    /**
     * @api {get} /api/vendor-product/vendor-product-list Vendor Product List API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get your product list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-product-list')
    @Authorized('vendor')
    public async vendorProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('price') price: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.vendorId;
        const vendorProductList = await this.productService.customVendorProductList(limit, offset, status, vendorId, keyword, price);
        if (count) {
            const countValue = vendorProductList.length;
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got Vendor Product list.',
                data: countValue,
            };
            return response.status(200).send(sucResponse);
        }

        const productList = vendorProductList.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: value.productId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: values.categoryId });
                    const tempp: any = values;
                    if (categoryNames !== undefined) {
                        tempp.categoryName = categoryNames.name;
                    } else {
                        tempp.categoryName = '';
                    }
                    return tempp;
                });
                const result = Promise.all(category);
                return result;
            });
            temp.vendorCategory = categories;
            const productSpecial = await this.productSpecialService.findSpecialPrice(value.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(value.productId, todaydate);
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            }
            temp.productImage = defaultValue;
            const orderProduct = await this.orderProductService.getEarnings(value.productId);
            if (orderProduct) {
                temp.earnings = orderProduct.productPriceTotal;
            } else {
                temp.earnings = '';
            }
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got your product list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Product API
    /**
     * @api {delete} /api/vendor-product/delete-product/:id Delete Single Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted your product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-product/:id')
    @Authorized('vendor')
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
            await this.productService.delete(relatedproduct.id);
        }
        const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: productid } });
        for (const relatedproducts of relatedProductId) {
            await this.productService.delete(relatedproducts.id);
        }
        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete your product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Product API

    /**
     * @api {post} /api/vendor-product/delete-product Delete Multiple Products API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productId productId
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
     * @apiSampleRequest /api/vendor-product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-product')
    @Authorized('vendor')
    public async deleteMultipleProduct(@Req() request: any, @Res() response: any): Promise<Product> {
        console.log(request.body.productId + 'productId');
        const productIdNo = request.body.productId;
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
                await this.productService.delete(relatedproduct.id);
            }
            const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: deleteProductId } });
            for (const relatedproducts of relatedProductId) {
                await this.productService.delete(relatedproducts.id);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Product',
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Detail API
    /**
     * @api {get} /api/vendor-product/vendor-product-detail/:id Vendor Product Detail API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-product-detail/:id')
    @Authorized('vendor')
    public async vendorProductDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorProductDetail = await this.vendorProductService.find({ where: { productId: id, vendorId: request.user.vendorId } });
        if (vendorProductDetail.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const productDetail: any = await this.productService.findOne({
            productId: id,
        });
        const productDetails: any = classToPlain(productDetail);
        const specialCharges = productDetails.serviceCharges;
        if (specialCharges) {
            const specialCharge = JSON.parse(productDetails.serviceCharges);
            productDetails.productCost = specialCharge.productCost;
            productDetails.packingCost = specialCharge.packingCost;
            productDetails.shippingCost = specialCharge.shippingCost;
            productDetails.tax = specialCharge.tax;
            productDetails.others = specialCharge.others;
        }
        const vendorProduct = await this.vendorProductService.findOne({
            select: ['vendorId', 'productId', 'approvalFlag'],
            where: { productId: id },
        });
        const vendor = await this.vendorService.findOne({
            select: ['customerId'],
            where: { vendorId: vendorProduct.vendorId },
        });
        const customer = await this.customerService.findOne({
            select: ['firstName'],
            where: { id: vendor.customerId },
        });
        productDetails.approvalflag = vendorProduct.approvalFlag;
        productDetails.vendorId = vendorProduct.vendorId;
        productDetails.vendorName = customer.firstName;
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: id,
            },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: id },
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
        productDetails.relatedProductDetail = await this.productRelatedService.findAll({ where: { productId: id } }).then((val) => {
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
            where: { productId: id },
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
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd'],
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
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

    // Product bulk price Excel Document download
    /**
     * @api {get} /api/vendor-product/product-bulk-price-excel-list/:vendorId Product Bulk Price Excel List for export
     * @apiGroup Vendor Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Product price bulk List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-product/product-bulk-price-excel-list/:vendorId
     * @apiErrorExample {json} Product Bulk Price Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/product-bulk-price-excel-list/:vendorId')
    public async excelProductView(@Param('vendorId') vendorId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Bulk Price Excel Sheet');
        const rows = [];
        const dataId = await this.vendorProductService.find({ where: { vendorId } });
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Products are empty',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'productId', key: 'productId', size: 16, width: 15 },
            { header: 'sku', key: 'sku', size: 16, width: 15 },
            { header: 'price', key: 'price', size: 16, width: 15 },
            { header: 'discountPrice', key: 'discountPrice', size: 16, width: 15 },
            { header: 'discountStartDate', key: 'discountStartDate', size: 16, width: 15 },
            { header: 'discountEndDate', key: 'discountEndDate', size: 16, width: 15 },
            { header: 'specialPrice', key: 'dpecialPrice', size: 16, width: 15 },
            { header: 'specialStartDate', key: 'specialStartDate', size: 16, width: 15 },
            { header: 'specialEndDate', key: 'specialEndDate', size: 16, width: 15 },
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
        for (const id of dataId) {
            console.log(id.productId + 'productIddddddddd');
            const data = await this.productService.findOne({ where: { productId: id.productId } });
            const specialPrice = await this.productSpecialService.findOne({ where: { productId: data.productId }, orderBy: { priority: 'ASC', price: 'ASC' } });
            // console.log(specialPrice + 'specialPrice');
            // console.log(specialPrice.price + 'specialPricePrice');
            const productDiscount = await this.productDiscountService.findOneValue({ where: { productId: data.productId }, orderBy: { priority: 'ASC', price: 'ASC' } });
            let specialprice;
            let specialStartDate;
            let specialEndDate;
            if (specialPrice === undefined) {
                specialprice = '';
                specialStartDate = '';
                specialEndDate = '';
            } else {
                specialprice = specialPrice.price;
                specialStartDate = moment(specialPrice.dateStart).format('YYYY-MM-DD');
                specialEndDate = moment(specialPrice.dateEnd).format('YYYY-MM-DD');
            }

            let discountprice;
            let discountStartDate;
            let discountEndDate;
            if (productDiscount !== undefined) {
                discountprice = productDiscount.price;
                discountStartDate = moment(productDiscount.dateStart).format('YYYY-MM-DD');
                discountEndDate = moment(productDiscount.dateEnd).format('YYYY-MM-DD');
            } else {
                discountprice = '';
                discountStartDate = '';
                discountEndDate = '';
            }
            rows.push([data.productId, data.sku, data.price, discountprice, discountStartDate, discountEndDate, specialprice, specialStartDate, specialEndDate]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        const workBook = xlsx.readFile(fileName);
        const outputFilename = './ProductCSV_' + Date.now() + '.csv';
        xlsx.writeFile(workBook, outputFilename, { bookType: 'csv' });
        return new Promise((resolve, reject) => {
            response.download(outputFilename, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(outputFilename);
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Import Product Bulk Price excel data
    /**
     * @api {post} /api/vendor-product/import-product-bulk-price-data Import product bulk price Data
     * @apiGroup Vendor Product
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} productData File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-product/import-product-bulk-price-data
     * @apiErrorExample {json} Import Customer Data
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Post('/import-product-bulk-price-data')
    public async ImportProductBulkPrice(@UploadedFile('productData') file: any, @BodyParam('title') title: string, @BodyParam('vendorId') vendorId: number, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(file + 'file');
        console.log(title + 'title');
        const name = file.originalname;
        const type = name.split('.')[1];
        if (type !== 'csv') {
            const errorResponse: any = {
                status: 0,
                message: 'CSV file only allowed',
            };
            return response.status(400).send(errorResponse);
        }
        const directoryPath = path.join(process.cwd(), 'src/priceupdate/');
        const fileName = 'ProductBulkPrice_' + Date.now() + '.' + type;
        const filePath = directoryPath + fileName;
        console.log(filePath + 'filePath');
        fs.writeFile(filePath, file.buffer, ((err) => {
            if (err) {
                return console.log(err);
            }
            console.log('working.........');
        }));
        const csv = require('csvtojson');
        // const csvFilePath = path.join(process.cwd(), filePath);
        const subjectData = await csv().fromFile(filePath);
        // price log file storage
        const priceUpdateFileLog = new PriceUpdateFileLog();
        priceUpdateFileLog.vendorId = vendorId;
        priceUpdateFileLog.title = title;
        priceUpdateFileLog.file = fileName;
        priceUpdateFileLog.filePath = 'priceupdate/';
        const updatePrice = await this.priceUpdateFileLogService.create(priceUpdateFileLog);
        for (const data of subjectData) {
            const findProduct = await this.productService.findOne({ where: { productId: data.productId } });
            if (!findProduct) {
                return response.status(400).send({ status: 0, message: 'Invalid ProductId' });
            }
        }

        for (const data of subjectData) {
            console.log(data.discountStartDate + 'discountStartDate');
            console.log(data.discountEndDate + 'discountEndDate');
            const findProduct = await this.productService.findOne({ where: { productId: data.productId } });
            const specialPrice = await this.productSpecialService.findOne({ where: { productId: data.productId }, orderBy: { priority: 'ASC', price: 'ASC' } });
            const productDiscount = await this.productDiscountService.findOneValue({ where: { productId: data.productId }, orderBy: { priority: 'ASC', price: 'ASC' } });
            console.log(findProduct.price + 'findProduct');
            console.log(data.price + 'dataPrice');
            if (data.price === '' || data.price === undefined) {
                return response.status(400).send({ status: 0, message: 'ProductPrice should not be empty' });
            }
            if ((findProduct.price !== data.price)) {
                const productPriceLog: any = new ProductPriceLog();
                productPriceLog.productId = findProduct.productId;
                const vendor = await this.vendorProductService.findOne({ where: { productId: findProduct.productId } });
                productPriceLog.vendorId = vendor.vendorId;
                productPriceLog.sku = findProduct.sku;
                productPriceLog.price = findProduct.price;
                productPriceLog.priceUpdateFileLogId = findProduct.priceUpdateFileLogId;
                if (specialPrice && ((specialPrice.price !== data.specialPrice) || (moment(specialPrice.dateStart).format('YYYY-MM-DD') !== data.specialStartDate) || (moment(specialPrice.dateEnd).format('YYYY-MM-DD') !== data.specialEndDate))) {
                    productPriceLog.specialPrice = specialPrice.price;
                    productPriceLog.specialStartDate = moment(specialPrice.dateStart).format('YYYY-MM-DD');
                    productPriceLog.specialEndDate = moment(specialPrice.dateEnd).format('YYYY-MM-DD');
                }
                if (productDiscount && ((productDiscount.price !== data.discountPrice) || (moment(productDiscount.dateStart).format('YYYY-MM-DD') !== data.discountStartDate) || (moment(productDiscount.dateEnd).format('YYYY-MM-DD') !== data.discountEndDate))) {
                    productPriceLog.discountPrice = productDiscount.price;
                    productPriceLog.discountStartDate = moment(productDiscount.dateStart).format('YYYY-MM-DD');
                    productPriceLog.discountEndDate = moment(productDiscount.dateEnd).format('YYYY-MM-DD');
                }
                await this.productPriceLogService.create(productPriceLog);
                findProduct.price = data.price;
                findProduct.priceUpdateFileLogId = updatePrice.id;
                await this.productService.create(findProduct);
                if (data.specialPrice) {
                    specialPrice.price = data.specialPrice;
                    specialPrice.dateStart = data.specialStartDate;
                    specialPrice.dateEnd = data.specialEndDate;
                    await this.productSpecialService.create(specialPrice);
                }
                if (data.discountPrice) {
                    productDiscount.price = data.discountPrice;
                    productDiscount.dateStart = data.discountStartDate;
                    productDiscount.dateEnd = data.discountEndDate;
                    await this.productDiscountService.create(productDiscount);
                }
            }
        }

        const successResponse: any = {
            status: 1,
            message: 'Prices Updated Successfully',
        };
        return response.status(200).send(successResponse);
    }

    // vendor product price log List API
    /**
     * @api {get} /api/vendor-product/product-price-log-list product price log API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get your product price log list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/product-price-log-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/product-price-log-list')
    @Authorized('vendor')
    public async productPriceLogList(@QueryParam('productId') productId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(productId + 'productId');
        const select = ['productId', 'vendorId', 'sku', 'price', 'specialPrice', 'specialStartDate', 'specialEndDate', 'discountPrice', 'discountStartDate', 'discountEndDate'];
        const search = [
            {
                name: 'productId',
                op: 'like',
                value: productId,
            }, {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },

        ];
        const WhereConditions = [];
        const productPricelogList = await this.productPriceLogService.list(limit, offset, select, search, WhereConditions, count);
        if (productPricelogList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got your product price log List',
                data: productPricelogList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get your product price log List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // vendor price update file log List API
    /**
     * @api {get} /api/vendor-product/price-update-file-log-list  price update file log list API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get price update file log list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/price-update-file-log-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/price-update-file-log-list')
    @Authorized('vendor')
    public async PriceUpdateFileLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['id', 'title', 'file', 'filePath', 'createdDate'];
        const search = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },

        ];
        const WhereConditions = [];
        const productPricelogList = await this.priceUpdateFileLogService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count',
                data: productPricelogList,
            };
            return response.status(200).send(successRes);
        }
        if (productPricelogList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got price update file log List',
                data: productPricelogList,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Delete Price update log  API
    /**
     * @api {delete} /api/vendor-product/delete-price-update-log/:id Delete Price Update file log API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted price update log file.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/delete-price-update-log/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-price-update-log/:id')
    @Authorized('vendor')
    public async deletePriceUpdateFile(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const product = await this.priceUpdateFileLogService.findOne(id);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid price update file Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deletePriceUpdateFile = await this.priceUpdateFileLogService.delete(id);
        if (deletePriceUpdateFile) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted your price update file log',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete your price update file log',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // download Price update log  API
    /**
     * @api {get} /api/vendor-product/download-price-update-log/:id Download Price Update file log API
     * @apiGroup Vendor Product
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully download price update log file.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/download-price-update-log/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/download-price-update-log/:id')
    public async downloadPriceUpdateFile(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const product = await this.priceUpdateFileLogService.findOne(id);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid price update file Id',
            };
            return response.status(400).send(errorResponse);
        }
        const file = product.file;
        const filePath = product.filePath;
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filePath + file);
        return new Promise((resolve, reject) => {
            response.download(directoryPath, file);
        });
    }

    // Adding Status for vendors product  API
    /**
     * @api {put} /api/vendor-product/add-vendor-product-status/:id Add Vendor Product Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} status either should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/add-vendor-product-status/:id
     * @apiErrorExample {json} product approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/add-vendor-product-status/:id')
    @Authorized('vendor')
    public async addProductStatus(@Param('id') id: number, @BodyParam('status') status: number, @Req() request: any, @Res() response: any): Promise<any> {

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
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: id,
            },
        });

        if (vendorProduct.approvalFlag === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'This product is not approved, so you cannot change status.',
            };
            return response.status(400).send(errorResponse);
        }

        product.isActive = status;
        const vendorProductSave = await this.productService.create(product);
        if (vendorProductSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Status . ',
                data: vendorProductSave,
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

    // ExportProductsById
    /**
     * @api {get} /api/vendor-product/vendor-product-excel-list Vendor Product Excel sheet
     * @apiGroup Admin Vendor Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Vendor Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/vendor-product-excel-list')
    public async ExportAllProductsById(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Vendor Id', key: 'vendorId', size: 16, width: 15 },
            { header: 'Vendor Name', key: 'VendorName', size: 16, width: 15 },
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
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
        worksheet.getCell('R1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const productsid: any = productId.split(',');
        for (const id of productsid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const product of productsid) {
            const data = await this.productService.findOne(product);
            const productDescription = data.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            const related = [];
            const relatedProducts = await this.productRelatedService.findAll({ where: { productId: data.productId } });
            for (const relatedProduct of relatedProducts) {
                const productName = await this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                related.push(productName.name);
            }
            const relProduct = related.toString();
            console.log(relProduct + 'relatedProduct');
            const vendorProduct = await this.vendorProductService.findOne({ select: ['vendorId'], where: { productId: data.productId } });
            const vendors = await this.vendorService.findOne({ select: ['customerId'], where: { vendorId: vendorProduct.vendorId } });
            const customer = await this.customerService.findOne({ select: ['firstName'], where: { id: vendors.customerId } });
            rows.push([vendorProduct.vendorId, customer.firstName, data.productId, data.name, dataDescription.trim(), data.price, data.sku, data.upc, data.quantity, data.metaTagTitle, data.isFeatured, data.todaysDeals, data.condition, data.rating, relProduct, data.isActive]);
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
        const productid: any = productId.split(',');
        for (const products of productid) {
            const specialPrices = await this.productSpecialService.findAll({ where: { productId: products } });
            for (const specialPrice of specialPrices) {
                const productName = await this.productService.findOne({ where: { productId: specialPrice.productId } });
                special.push([specialPrice.productSpecialId, specialPrice.productId, productName.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
            }
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
        const disproductsid: any = productId.split(',');
        for (const products of disproductsid) {
            const discountPrices = await this.productDiscountService.findAll({ where: { productId: products } });
            for (const discountPrice of discountPrices) {
                const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
                discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
            }
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
        const imageProductId: any = productId.split(',');
        for (const products of imageProductId) {
            const images = await this.productImageService.findAll({ where: { productId: products } });
            for (const image of images) {
                const productName = await this.productService.findOne({ where: { productId: image.productId } });
                productimage.push([image.productId, productName.name, image.containerName, image.image, image.defaultImage]);
            }
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
        const optionProductsId: any = productId.split(',');
        for (const products of optionProductsId) {
            const productOptions = await this.productOptionValueService.findAll({ where: { productId: products } });
            for (const option of productOptions) {
                const productName = await this.productService.findOne({ where: { productId: option.productId } });
                const optionName = await this.optionDescriptionService.findOne({ where: { optionId: option.optionId } });
                const optionValueName = await this.optionValueDescriptionService.findOne({ where: { optionValueId: option.optionValueId } });
                productOption.push([option.productOptionId, option.productId, productName.name, option.optionId, optionName.name, option.optionValueId, optionValueName.name, option.price, option.pricePrefix]);
            }
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
        const relatedProductId: any = productId.split(',');
        for (const products of relatedProductId) {
            const categories = await this.productToCategoryService.findAll({ where: { productId: products } });
            for (const category of categories) {
                const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
                relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
            }
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

    // Product Counts
    /**
     * @api {get} /api/vendor-product/product-counts order counts
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/product-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/product-counts')
    @Authorized('vendor')
    public async productCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const inActiveVendorProductList = await this.productService.customVendorProductList(0, 0, 0, request.user.vendorId, '', '');
        const activeVendorProductList = await this.productService.customVendorProductList(0, 0, 1, request.user.vendorId, '', '');
        const select = [];
        const relation = [];
        const WhereConditions = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
        ];
        const totalProductCount = await this.vendorProductService.list(0, 0, select, relation, WhereConditions, '', 0);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today Product count',
            data: {
                inActiveVendorProductList: inActiveVendorProductList.length,
                activeProductCount: activeVendorProductList.length,
                TotalProductCount: totalProductCount.length,
            },
        };
        return response.status(200).send(successResponse);

    }
    private BadResponse(response: any, message: string): Promise<any> {
        const errorResponse: any = {
            status: 0,
            message,
        };
        return response.status(400).send(errorResponse);
    }
}
