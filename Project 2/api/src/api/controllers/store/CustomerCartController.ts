/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Post, JsonController, Res, Req, Authorized, Get, QueryParam, Body, BodyParam} from 'routing-controllers';
import {ProductService} from '../../services/ProductService';
import {CustomerCartService} from '../../services/CustomerCartService';
import {ProductImageService} from '../../services/ProductImageService';
import {ProductSpecialService} from '../../services/ProductSpecialService';
import {ProductDiscountService} from '../../services/ProductDiscountService';
import {CustomerCart} from '../../models/CustomerCart';
import {CreateCartRequest} from './requests/CreateCartRequest';
import { TaxService } from '../../services/TaxService';

@JsonController('/customer-cart')
export class CustomerController {
    constructor(private productService: ProductService, private taxService: TaxService, private productSpecialService: ProductSpecialService, private productDiscountService: ProductDiscountService,
                private customerCartService: CustomerCartService, private productImageService: ProductImageService) {
    }

     // create and update customer cart API
    /**
     * @api {post} /api/customer-cart/add-cart Add to cart API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} productPrice productPrice
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} optionName optionName
     * @apiParam (Request body) {Number} optionValueName optionValueName
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "productPrice" : "",
     *      "quantity" : "",
     *      "optionName" : "",
     *      "optionValueName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added product to cart",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/add-cart
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/add-cart')
    @Authorized('customer')
    public async addCustomerCart(@Body({validate: true}) cartParam: CreateCartRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productId: cartParam.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const customerCart = await this.customerCartService.findOne({
            where: {
                productId: cartParam.productId, customerId: request.user.id,
            },
        });
        if (customerCart) {
            if (cartParam.quantity === 0) {
                await this.customerCartService.delete(customerCart.id);
                const deleteCart: any = {
                    status: 1,
                    message: 'Successfully deleted cart.',
                };
                return response.status(200).send(deleteCart);
            }
            if (cartParam.type && cartParam.type === 'new') {
                customerCart.quantity = Number(customerCart.quantity) + cartParam.quantity;
            } else {
                customerCart.quantity = cartParam.quantity;
            }
            customerCart.productPrice = cartParam.productPrice;
            customerCart.total = +cartParam.quantity * +cartParam.productPrice;
            customerCart.optionName = cartParam.optionName;
            customerCart.optionValueName = cartParam.optionValueName;
            await this.customerCartService.createData(customerCart);
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated cart.',
                data: customerCart,
            };
            return response.status(200).send(successResponse);
        } else {
            const addCustomerCart: any = new CustomerCart();
            addCustomerCart.productId = cartParam.productId,
            addCustomerCart.name = product.name,
            addCustomerCart.customerId = request.user.id,
            addCustomerCart.quantity = cartParam.quantity,
            addCustomerCart.productPrice = cartParam.productPrice,
            addCustomerCart.total = +cartParam.quantity * +cartParam.productPrice,
            addCustomerCart.optionName = cartParam.optionName;
            addCustomerCart.optionValueName = cartParam.optionValueName;
            const val = await this.customerCartService.createData(addCustomerCart);
            const cart: any = {
                status: 1,
                message: 'Successfully added cart.',
                data: val,
            };
            return response.status(200).send(cart);

        }
    }

       // Customer Cart List API
    /**
     * @api {get} /api/customer-cart/customer-cart-list  Customer Cart List API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Customer Cart List",
     *      "data":{
     *       "productId" : "",
     *       "name" : "",
     *       "quantity" : "",
     *       "productPrice" : "",
     *       "total" : "",
     *       "image" : "",
     *       "containerName" : "",
     *       "optionName" : "",
     *       "optionValueName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/customer-cart-list
     * @apiErrorExample {json} Customer Cart error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/customer-cart-list')
    @Authorized('customer')
    public async customerCartList( @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count')count: number | boolean, @Req() request: any , @Res() response: any): Promise<any> {
        const select = ['id', 'productId', 'name', 'quantity', 'productPrice', 'total', 'optionName', 'optionValueName'];
        const search = [];
        const relation = [];
        const WhereConditions = [
            {
                name: 'customerId',
                op: 'where',
                value: request.user.id,
            },
        ];
        const cartList = await this.customerCartService.list(limit, offset, select, relation, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the cart count.',
                data: cartList,
            };
            return response.status(200).send(successResponse);
        }
        let grandTotal = 0;
        const findImage = cartList.map(async (value: any) => {
            console.log(value.productId + 'value.productId');
            const productData = await this.productService.findOne({where: {productId: value.productId}});
            if (productData.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: productData.taxValue });
                productData.taxValue = tax.taxPercentage;
            }
            const temp: any = productData;
            temp.optionName = value.optionName;
            temp.quantity = value.quantity;
            grandTotal = 0;
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
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            const product = await this.productImageService.findOne({select: ['image', 'containerName'], where: {productId: value.productId, defaultImage: 1}});
            if (product) {
                temp.image = product.image;
                temp.containerName = product.containerName;
            }
            return temp;
        });
        const finalResult = await Promise.all(findImage);
        if (cartList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the cart list.',
                data: {cartList: finalResult, grandTotal},
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list cart list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete cart items API

    /**
     * @api {post} /api/customer-cart/delete-cart-item Delete Cart items API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} cartId cartId
     * @apiParamExample {json} Input
     * {
     * "cartId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted items.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/delete-cart-item
     * @apiErrorExample {json} cartDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-cart-item')
    @Authorized('customer')
    public async deleteMultipleProduct(@BodyParam('cartId') cartId: string, @Res() response: any, @Req() request: any): Promise<CustomerCart> {

        // const productIdNo = cartId.toString();
        const productid = cartId.split(',');
        if (cartId === '') {
            const customerCart = await this.customerCartService.find({
                where: {
                     customerId: request.user.id,
                },
            });
            for (const cart of customerCart) {
                const itemId = parseInt(cart.id, 10);
                await this.customerCartService.delete(itemId);
            }
            const Response: any = {
                status: 1,
                message: 'Successfully cleared your cart',
            };
            return response.status(200).send(Response);
        }
        for (const id of productid) {
            const itemId = parseInt(id, 10);
            await this.customerCartService.delete(itemId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully removed item',
        };
        return response.status(200).send(successResponse);
    }
}
