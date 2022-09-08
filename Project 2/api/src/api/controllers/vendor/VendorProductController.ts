import { ProductTranslation } from './../../models/ProductTranslation';
import { ProductTranslationService } from './../../services/ProductTranslationService';
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
    Authorized,
    Res,
    Body,
    Post,
    Req,
    Put,
    Param,
    Get,
    QueryParam,
    BodyParam,
} from 'routing-controllers';
import { ProductService } from '../../services/ProductService';
import { ProductToCategoryService } from '../../services/ProductToCategoryService';
import { ProductImageService } from '../../services/ProductImageService';
import { Product } from '../../models/ProductModel';
import { ProductOption } from '../../models/ProductOption';
import { ProductOptionValue } from '../../models/ProductOptionValue';
import { ProductDiscount } from '../../models/ProductDiscount';
import { ProductSpecial } from '../../models/ProductSpecial';
import { VendorProducts } from '../../models/VendorProducts';
import { CreateVendorProductRequest } from './requests/CreateVendorProductRequest';
import { ProductToCategory } from '../../models/ProductToCategory';
import { ProductImage } from '../../models/ProductImage';
import { CategoryService } from '../../services/CategoryService';
import { ProductRelated } from '../../models/ProductRelated';
import { VendorProductService } from '../../services/VendorProductService';
import { ProductRelatedService } from '../../services/ProductRelatedService';
import { ProductOptionService } from '../../services/ProductOptionService';
import { ProductOptionValueService } from '../../services/ProductOptionValueService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';
import { OptionDescriptionService } from '../../services/OptionDescriptionService';
import { OptionValueDescriptionService } from '../../services/OptionValueDescriptionService';
import { OptionService } from '../../services/OptionService';
import { VendorService } from '../../services/VendorService';
import { CustomerService } from '../../services/CustomerService';
import moment = require('moment');
import { classToPlain } from 'class-transformer';
import fs = require('fs');
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { SettingService } from '../../services/SettingService';
import { MAILService } from '../../../auth/mail.services';
import { TaxService } from '../../services/TaxService';

@JsonController('/admin-vendor-product')
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
        private vendorProductService: VendorProductService,
        private optionDescriptionService: OptionDescriptionService,
        private optionValueDescriptionService: OptionValueDescriptionService,
        private optionService: OptionService,
        private vendorService: VendorService,
        private customerwishlistService: CustomerWishlistService,
        private emailTemplateService: EmailTemplateService,
        private settingService: SettingService,
        private productTranslationService: ProductTranslationService,
        private taxService: TaxService,
        private customerService: CustomerService
    ) {
    }

    // Create Product API
    /**
     * @api {post} /api/admin-vendor-product/create-vendor-product Create Vendor Product API
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
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
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} productOptions productOptions
     * @apiParam (Request body) {Number} vendorProductCommission vendorProductCommission
     * @apiParam (Request body) {Object[]} productTranslation List of Product Translation
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
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
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "vendorProductCommission" : "",
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
     * @apiSampleRequest /api/admin-vendor-product/create-vendor-product
     * @apiErrorExample {json} Vendor Product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/create-vendor-product')
    @Authorized()
    public async createProduct(@Body({ validate: true }) model: CreateVendorProductRequest, @Req() req: any, @Res() response: any): Promise<any> {

        // @ Get current vendor to set product accountType 
        const vendor = await this.vendorService.findOne({ where: { vendorId: model.vendorId } });

        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to find user.',
            };
            return response.status(400).send(errorResponse);
        }

        let productOptions = [];
        let optionValue = [];
        const newProduct: any = new Product();
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
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.taxType = model.taxType ? model.taxType : 0;
        newProduct.taxValue = model.tax ? model.tax : 0;
        newProduct.stockStatusId = model.outOfStockStatus ? model.outOfStockStatus : 1;
        newProduct.shipping = model.requiredShipping;
        newProduct.dateAvailable = model.dateAvailable === '' ? moment().format('YYYY-MM-DD HH:mm:ss') : moment(model.dateAvailable).toISOString();
        newProduct.metaTagTitle = model.metaTagTitle;
        newProduct.metaTagDescription = model.metaTagDescription;
        newProduct.metaTagKeyword = model.metaTagKeyword;
        newProduct.accountType = vendor.accountType;

        newProduct.isActive = 0;
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
                const prodTranslation = new ProductTranslation();
                prodTranslation.languageCode = entity.languageCode;
                prodTranslation.productId = model.vendorId;
                prodTranslation.name = entity.name;
                prodTranslation.description = entity.description;
                await this.productTranslationService.create(prodTranslation);
            });
        }

        const vendorProducts: any = new VendorProducts();
        vendorProducts.productId = saveProduct.productId;
        vendorProducts.vendorId = model.vendorId;
        vendorProducts.approvalFlag = 0;
        vendorProducts.vendorProductCommission = model.vendorProductCommission ? model.vendorProductCommission : 0;
        await this.vendorProductService.create(vendorProducts);
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
     * @api {put} /api/admin-vendor-product/update-vendor-product/:id Update Vendor Product API
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorId vendorId
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
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} productOptions productOptions
     * @apiParam (Request body) {Number} vendorProductCommission vendorProductCommission
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
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "vendorProductCommission" : "",
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
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-product/update-vendor-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-vendor-product/:id')
    @Authorized()
    public async updateProduct(@Param('id') id: number, @Body({ validate: true }) model: CreateVendorProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
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
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.taxType = model.taxType ? model.taxType : 0;
        updateProduct.taxValue = model.tax ? model.tax : 0;
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

        const vendorProduct: any = await this.vendorProductService.findOne({
            where: {
                ProductId: id,
            },
        });
        vendorProduct.vendorId = model.vendorId;
        vendorProduct.vendorProductCommission = model.vendorProductCommission ? model.vendorProductCommission : 0;
        await this.vendorProductService.create(vendorProduct);

        // @ Product Translation
        await this.productTranslationService.delete({ productId: saveProduct.productId });
        if (model.productTranslation && model.productTranslation.length) {
            await model.productTranslation.forEach(async (entity: ProductTranslation) => {
                const prodTranslation = new ProductTranslation();
                prodTranslation.languageCode = entity.languageCode;
                prodTranslation.name = entity.name;
                prodTranslation.description = entity.description;
                prodTranslation.productId = saveProduct.productId;
                await this.productTranslationService.create(prodTranslation);
            });
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Vendor Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated Vendor Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product List API
    /**
     * @api {get} /api/admin-vendor-product/vendor-product-list Vendor Product List API
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor product list",
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
     * @apiSampleRequest /api/admin-vendor-product/vendor-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-product-list')
    @Authorized()
    public async vendorProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('vendorId') vendorId: number, @QueryParam('keyword') keyword: string, @QueryParam('price') price: string, @QueryParam('count') count: number, @Res() response: any): Promise<any> {
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
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got Vendor Product list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Detail API
    /**
     * @api {get} /api/admin-vendor-product/vendor-product-detail/:id Vendor Product Detail API
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/admin-vendor-product/vendor-product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-product-detail/:id')
    @Authorized()
    public async vendorProductDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
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
            // productDetails.tax = specialCharge.tax;
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
        const vendorProduct = await this.vendorProductService.findOne({
            select: ['vendorId', 'productId', 'approvalFlag', 'vendorProductCommission'],
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
        productDetails.vendorProductCommission = vendorProduct.vendorProductCommission;
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
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd'],
            where: { productId: id },
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

    // BulkExportVendorProducts
    /**
     * @api {get} /api/admin-vendor-product/bulk-vendor-product-excel-list Bulk Vendor Product Excel sheet
     * @apiGroup Admin Vendor Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Vendor Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-product/bulk-vendor-product-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/bulk-vendor-product-excel-list')
    public async ExportAllProducts(@Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        const dataId = await this.vendorProductService.findAll();
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Products are empty',
            };
            return response.status(400).send(errorResponse);
        }
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
        worksheet.getCell('R1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('S1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const product = await this.vendorProductService.findAll();
        for (const products of product) {
            const productDetail = await this.productService.findOne({ where: { productId: products.productId } });
            const productDescription = productDetail.description ? productDetail.description : '';
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            const related = [];
            const relatedProducts = await this.productRelatedService.findAll({ where: { productId: productDetail.productId } });
            for (const relatedProduct of relatedProducts) {
                const productName = await this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                related.push(productName.name);
            }
            const relProduct = related.toString();
            console.log(relProduct + 'relatedProduct');
            const vendorProduct = await this.vendorProductService.findOne({ select: ['vendorId'], where: { productId: products.productId } });
            const vendor = await this.vendorService.findOne({ select: ['customerId'], where: { vendorId: vendorProduct.vendorId } });
            const customer = await this.customerService.findOne({ select: ['firstName'], where: { id: vendor.customerId } });
            rows.push([vendorProduct.vendorId,
            customer.firstName,
            productDetail.productId,
            productDetail.name,
            dataDescription.trim(),
            productDetail.price,
            productDetail.sku,
            productDetail.upc,
            productDetail.quantity,
            productDetail.manufacturerId,
            productDetail.metaTagTitle,
            productDetail.isFeatured,
            productDetail.todaysDeals,
            productDetail.condition,
            productDetail.rating,
                relProduct,
            productDetail.isActive]);
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
        const vendorSpecialPrice = await this.vendorProductService.findAll();
        for (const vendorSpecial of vendorSpecialPrice) {
            const specialPrices = await this.productSpecialService.findAll({ where: { productId: vendorSpecial.productId } });
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
        const vendorDiscountPrice = await this.vendorProductService.findAll();
        for (const vendorDiscount of vendorDiscountPrice) {
            const discountPrices = await this.productDiscountService.findAll({ where: { productId: vendorDiscount.productId } });
            for (const discountPrice of discountPrices) {
                const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
                discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
            }
        }
        // }
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
        const vendorImage = await this.vendorProductService.findAll();
        for (const venImage of vendorImage) {
            const images = await this.productImageService.findAll({ where: { productId: venImage.productId } });
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
        const vendorProductOption = await this.vendorProductService.findAll();
        for (const vendorProducts of vendorProductOption) {
            const productOptions = await this.productOptionValueService.findAll({ where: { productId: vendorProducts.productId } });
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
        const vendorCategory = await this.vendorProductService.findAll();
        for (const venCategory of vendorCategory) {
            const categories = await this.productToCategoryService.findAll({ where: { productId: venCategory.productId } });
            for (const category of categories) {
                const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
                relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
            }
        }
        // }
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
    // ExportProductsById
    /**
     * @api {get} /api/admin-vendor-product/vendor-product-excel-list Vendor Product Excel sheet
     * @apiGroup Admin Vendor Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Vendor Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-product/vendor-product-excel-list
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
        worksheet.getCell('R1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('S1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
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
            const productDescription = data.description ? data.description : '';
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
            rows.push([vendorProduct.vendorId, customer.firstName, data.productId, data.name, dataDescription.trim(), data.price, data.sku, data.upc, data.quantity, data.manufacturerId, data.metaTagTitle, data.isFeatured, data.todaysDeals, data.condition, data.rating, relProduct, data.isActive]);
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
    // Approve vendors product  API
    /**
     * @api {put} /api/admin-vendor-product/approve-product/:id Product Approval API
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} approvalFlag approval flag should be 1
     * @apiParamExample {json} Input
     * {
     *      "approvalFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully approved product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-product/approve-product/:id
     * @apiErrorExample {json} product approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/approve-product/:id')
    @Authorized()
    public async productApproval(@Param('id') id: number, @BodyParam('approvalFlag') approvalFlag: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: id,
            },
        });
        if (!vendorProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }

        if (vendorProduct.approvalFlag === 1) {
            const errorResponse: any = {
                status: 0,
                message: 'Product Already Approved',
            };
            return response.status(400).send(errorResponse);
        }

        vendorProduct.approvalFlag = approvalFlag;
        vendorProduct.approvedBy = request.user.userId;
        const today = new Date().toISOString().slice(0, 10);
        vendorProduct.approvalDate = today;
        const vendorProductSave = await this.vendorProductService.create(vendorProduct);
        const vendor = await this.vendorService.findOne({ select: ['customerId'], where: { vendorId: vendorProductSave.vendorId } });
        const vendorCustomer = await this.customerService.findOne({ select: ['firstName', 'email'], where: { id: vendor.customerId } });
        if (vendorProductSave) {
            const emailContent = await this.emailTemplateService.findOne(16);
            const setting = await this.settingService.findOne();
            const product = await this.productService.findOne({ select: ['name'], where: { productId: id } });
            const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{sitename}', setting.storeName).replace('{productname}', product.name);
            MAILService.customerLoginMail(message, vendorCustomer.email, emailContent.subject);
            const successResponse: any = {
                status: 1,
                message: 'Successfully Approved this Product and sent an Approval mail send to vendor . ',
                data: vendorProductSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to approve product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Adding Status for vendors product  API
    /**
     * @api {put} /api/admin-vendor-product/add-product-status/:id Add Vendor Product Status API
     * @apiGroup Admin Vendor Product
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
     * @apiSampleRequest /api/admin-vendor-product/add-product-status/:id
     * @apiErrorExample {json} product approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/add-product-status/:id')
    @Authorized()
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
                message: 'Kindly approve this product, after that only you can change status.',
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

    // Update Vendor Product Commission
    /**
     * @api {put} /api/admin-vendor-product/update-vendor-product-commission Update Vendor Product Commission
     * @apiGroup Admin Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} productId Product Id
     * @apiParam (Request body) {number} commission Commission
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully update product commission.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-product/update-vendor-product-commission
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-vendor-product-commission')
    @Authorized()
    public async updateCommission(@BodyParam('productId') productId: string, @BodyParam('commission') commission: number, @Req() request: any, @Res() response: any): Promise<any> {
        const product = productId;
        const splitProduct = product.split(',');
        for (const record of splitProduct) {
            const findProduct = await this.vendorProductService.findOne({
                where: {
                    productId: record,
                },
            });
            if (!findProduct) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            findProduct.vendorProductCommission = commission;
            await this.vendorProductService.create(findProduct);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully Updated Commission',
        };
        return response.status(200).send(successResponse);
    }
}
