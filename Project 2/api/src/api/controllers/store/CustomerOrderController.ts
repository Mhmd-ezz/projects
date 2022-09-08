/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Req, Res, Get, QueryParam, Body, Authorized } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { CustomerCheckoutRequest } from './requests/CustomerCheckoutRequest';
import { OrderService } from '../../services/OrderService';
import { OrderProductService } from '../../services/OrderProductService';
import { OrderTotalService } from '../../services/OrderTotalService';
import { Order } from '../../models/Order';
import { OrderProduct } from '../../models/OrderProduct';
import { OrderTotal } from '../../models/OrderTotal';
import { CustomerService } from '../../services/CustomerService';
import { MAILService } from '../../../auth/mail.services';
import { ProductService } from '../../services/ProductService';
import { ProductImageService } from '../../services/ProductImageService';
import { SettingService } from '../../services/SettingService';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { ProductRatingService } from '../../services/RatingService';
import { ProductRating } from '../../models/ProductRating';
import { OrderOption } from '../../models/OrderOption';
import { OrderOptionService } from '../../services/OrderOptionService';
import { OrderLog } from '../../models/OrderLog';
import { CountryService } from '../../services/CountryService';
import { UserService } from '../../services/UserService';
import { Customer } from '../../models/Customer';
import { VendorOrders } from '../../models/VendorOrders';
// import {VendorOrderProducts} from '../../models/VendorOrderProducts';
import { VendorService } from '../../services/VendorService';
import { PluginService } from '../../services/PluginService';
import jwt from 'jsonwebtoken';
import { CurrencyService } from '../../services/CurrencyService';
import { env } from '../../../env';
import { VendorOrdersService } from '../../services/VendorOrderService';
import { VendorProductService } from '../../services/VendorProductService';
import { OrderLogService } from '../../services/OrderLogService';
import { VendorOrderLogService } from '../../services/VendorOrderLogService';
import { VendorOrderLog } from '../../models/VendorOrderLog';
import { VendorGlobalSettingService } from '../../services/VendorSettingService';
import { PdfService } from '../../services/PdfService';
import { ZoneService } from '../../services/zoneService';
import { S3Service } from '../../services/S3Service';
import { ImageService } from '../../services/ImageService';
import { OrderStatusService } from '../../services/OrderStatusService';
import { DeliveryLocationService } from '../../services/DeliveryLocationService';
import { OrderProductLogService } from '../../services/OrderProductLogService';
import { CustomerCartService } from '../../services/CustomerCartService';
import { CouponUsage } from '../../models/CouponUsage';
import { CouponUsageProduct } from '../../models/CouponUsageProduct';
import { CouponUsageService } from '../../services/CouponUsageService';
import { CouponUsageProductService } from '../../services/CouponUsageProductService';
import { VendorCouponService } from '../../services/VendorCouponService';
import moment = require('moment');

@JsonController('/orders')
export class CustomerOrderController {
    constructor(private orderService: OrderService, private orderProductService: OrderProductService, private orderTotalService: OrderTotalService, private vendorService: VendorService, private vendorSettingService: VendorGlobalSettingService,
                private customerService: CustomerService, private productService: ProductService, private productImageService: ProductImageService, private settingService: SettingService,
                private emailTemplateService: EmailTemplateService, private productRatingService: ProductRatingService, private orderOptionService: OrderOptionService, private vendorProductService: VendorProductService, private orderLogService: OrderLogService,
                private countryService: CountryService, private pluginService: PluginService, private currencyService: CurrencyService, private vendorOrderService: VendorOrdersService, private userService: UserService, private vendorOrderLogService: VendorOrderLogService,
                private pdfService: PdfService,
                private zoneService: ZoneService,
                private s3Service: S3Service,
                private orderStatusService: OrderStatusService,
                private deliveryLocationService: DeliveryLocationService,
                private orderProductLogService: OrderProductLogService,
                private customerCartService: CustomerCartService,
                private couponUsageService: CouponUsageService,
                private couponUsageProductService: CouponUsageProductService,
                private vendorCouponService: VendorCouponService,
                private imageService: ImageService) {
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountry Shipping Country
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiParam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiParam (Request body) {String} emailId Customer Email Id
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {Number} couponDiscountAmount couponDiscountAmount
     * @apiParam (Request body) {String} couponData
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "productOptions":[
     *      {
     *       "productOptionId":
     *       "productOptionValueId":
     *       "name":
     *       "value":
     *       "type":
     *      }]
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountry" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     *      "vendorId" : "",
     *      "couponCode" : "",
     *      "couponDiscountAmount" : "",
     *      "couponData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Customer Checkout Function
    @Post('/customer-checkout')
    public async customerCheckout(@Body({ validate: true }) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        // if (checkoutParam.couponCode && checkoutParam.couponData) {
        //       this.decrypt(checkoutParam.couponData);
        // }
        const error: any = [];
        error.push(await this.validateDelivery(checkoutParam));
        // const orderProducts: any = checkoutParam.productDetails;
        // for (const val of orderProducts) {
        //     const value = await this.vendorProductService.findOne({where: {productId: val.productId}});
        //     if (value) {
        //         const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId}});
        //             if (!deliveryLocation) {
        //                 error.push(1);
        //             }
        //     }
        // }

        // TODO: Jalal, re-enable delivery validation, if needed
        // if (error.length > 0) {
        //     const errResponse: any = {
        //         status: 0,
        //         message: 'Product not available for your pincode',
        //     };
        //     return response.status(400).send(errResponse);
        // }

        const newOrder: Order = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                customerId = decoded.id;
            });
            newOrder.customerId = customerId;
        } else {
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    MAILService.registerMail(message, resultDatas.email, emailContents.subject);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // return response.status(400).send('hiii');
        // newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.paymentMethod = checkoutParam.paymentMethod;
        newOrder.isActive = 1;
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting.orderStatus;
        newOrder.invoicePrefix = setting.invoicePrefix;
        const currencyVal = await this.currencyService.findOne(setting.storeCurrencyId);
        newOrder.currencyCode = currencyVal.code;
        newOrder.currencyValue = currencyVal.value;
        newOrder.currencySymbolLeft = currencyVal.symbolLeft;
        newOrder.currencySymbolRight = currencyVal.symbolRight;
        newOrder.currencyValue = currencyVal.value;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        const orderDataLog = OrderLog.map(orderData);

        await this.orderLogService.create(orderDataLog);
        const currencySymbol = await this.currencyService.findOne(setting.storeCurrencyId);
        orderData.currencySymbolRight = currencySymbol.symbolRight;
        orderData.currencySymbolLeft = currencySymbol.symbolLeft;
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            const productDetails = new OrderProduct();
            console.log(orderProduct[i].productId + 'productId');
            productDetails.productId = orderProduct[i].productId;
            productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + orderData.orderId) + j;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = orderProduct[i].price;
            productDetails.basePrice = orderProduct[i].basePrice;
            productDetails.taxType = orderProduct[i].taxType;
            productDetails.taxValue = orderProduct[i].taxValue;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            productDetails.orderStatusId = 1;
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);
            const cart = await this.customerCartService.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
            if (cart !== undefined) {
                await this.customerCartService.delete(cart.id);
            }
            ///// for saving vendor orders starts///////
            const val = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
            if (val !== undefined) {
                const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendororders = new VendorOrders();
                const nwDate = new Date();
                const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
                vendororders.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                vendororders.vendorId = val.vendorId;
                vendororders.orderId = orderData.orderId;
                vendororders.orderProductId = productInformation.orderProductId;
                vendororders.total = productDetails.total;
                vendororders.subOrderStatusId = 1;
                vendororders.commission = 0;
                const date = new Date();
                vendororders.modifiedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                if (val.vendorProductCommission > 0) {
                    vendororders.commission = val.vendorProductCommission;
                } else if (vendor.commission > 0) {
                    vendororders.commission = vendor.commission;
                } else {
                    const defaultCommission = await this.vendorSettingService.findOne();
                    const defCommission = defaultCommission.defaultCommission;
                    vendororders.commission = defCommission;
                }
                const value = await this.vendorOrderService.create(vendororders);
                const vendorOrderLog = new VendorOrderLog();
                vendorOrderLog.vendorOrderId = value.vendorOrderId;
                vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                vendorOrderLog.vendorId = val.vendorId;
                vendorOrderLog.orderId = orderData.orderId;
                vendorOrderLog.subOrderStatusId = 1;
                await this.vendorOrderLogService.create(vendorOrderLog);
                // }
                // const vendororderproduct = new VendorOrderProducts();
                // vendororderproduct.orderProductId = productInformation.orderProductId;
                // const vendorOrder = await this.vendorOrderService.findOne({where: {vendorId: val.vendorId, orderId: orderData.orderId}});
                // vendororderproduct.vendorOrderId = vendorOrder.vendorOrderId;
                // await this.vendorOrderProductsService.create(vendororderproduct);
            }
            ///// for saving vendor orders ends //////
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId } });
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            for (const productOptionsData of orderProduct[i].productOptions) {
                const productOptionModel = new OrderOption();
                productOptionModel.orderId = orderData.orderId;
                productOptionModel.orderProductId = productInformation.orderProductId;
                productOptionModel.productOptionId = productOptionsData.productOptionId;
                productOptionModel.productOptionValueId = productOptionsData.productOptionValueId;
                productOptionModel.name = productOptionsData.name;
                productOptionModel.value = productOptionsData.value;
                productOptionModel.type = productOptionsData.type;
                await this.orderOptionService.create(productOptionModel);
            }
            const productOptionValue = await this.orderOptionService.find({
                where: {
                    orderProductId: productInformation.orderProductId,
                    orderId: orderData.orderId,
                }, select: ['name', 'value'],
            });
            productImageData.productOption = productOptionValue;
            productDetailData.push(productImageData);
            j++;
        }
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            const couponUsage = new CouponUsage();
            const vendorCoupon = await this.vendorCouponService.findOne({ where: { couponCode: checkoutParam.couponCode } });
            couponUsage.couponId = vendorCoupon.vendorCouponId;
            couponUsage.customerId = orderData.customerId;
            couponUsage.orderId = orderData.orderId;
            couponUsage.discountAmount = checkoutParam.couponDiscountAmount;
            const couponUsageData = await this.couponUsageService.create(couponUsage);
            const decryptedCouponCode = this.decrypt(checkoutParam.couponData);
            console.log(decryptedCouponCode, 'decryptedCouponCode');
            const ParseData = JSON.parse(decryptedCouponCode);
            for (const product of ParseData) {
                console.log(product.productId + 'productIddddddddddd');
                const couponUsageProduct = new CouponUsageProduct();
                couponUsageProduct.couponUsageId = couponUsageData.couponUsageId;
                couponUsageProduct.customerId = orderData.customerId;
                couponUsageProduct.orderId = orderData.orderId;
                const orderProductData = await this.orderProductService.findOne({ where: { orderId: orderData.orderId, productId: product.productId } });
                console.log(orderProductData.orderProductId, 'orderProductId');
                couponUsageProduct.orderProductId = orderProductData.orderProductId;
                couponUsageProduct.quantity = product.quantity;
                couponUsageProduct.amount = product.actualAmount;
                couponUsageProduct.discountAmount = product.discountAmount;
                await this.couponUsageProductService.create(couponUsageProduct);
            }
        }
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            newOrder.total = totalAmount - (+checkoutParam.couponDiscountAmount);
        } else {
            newOrder.total = totalAmount;
        }
        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId.toString());
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            newOrderTotal.value = totalAmount - (+checkoutParam.couponDiscountAmount);
        } else {
            newOrderTotal.value = totalAmount;
        }
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const plugin = await this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
        if (plugin && plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {

            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            console.log(request.headers);

            const route = env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-list
     * @apiErrorExample {json} Order List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order List Function
    @Get('/order-list')
    @Authorized('customer')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'order.createdDate as createdDate',
            'order.orderPrefixId as orderPrefixId',
            'order.orderId as orderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'OrderProduct.orderProductId as orderProductId',
            'OrderProduct.orderStatusId as orderProductStatusId',
            'OrderProduct.productId as productId',
            'OrderProduct.name as name',
            'OrderProduct.total as total',
            'OrderProduct.orderProductPrefixId as orderProductPrefixId',
            'OrderProduct.productPrice as productPrice',
            'OrderProduct.quantity as quantity',
        ];

        const relations = [
            {
                tableName: 'OrderProduct.order',
                aliasName: 'order',
            },
            {
                tableName: 'order.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'order.customerId',
            op: 'and',
            value: request.user.id,
        });

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['OrderProduct.name', 'order.orderPrefixId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'OrderProduct.createdDate',
            order: 'DESC',
        });
        if (count) {
            const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: orderCount,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const promises = orderList.map(async (results: any) => {
            const temp = results;
            const productImage = await this.productImageService.findOne({
                where: { productId: results.productId, defaultImage: 1 },
                select: ['image', 'containerName'],
            });
            temp.image = productImage.image;
            temp.containerName = productImage.containerName;
            const passingOrderStatus = await this.orderStatusService.findOne({
                where: {
                    orderStatusId: results.orderProductStatusId,
                },
            });
            temp.orderStatusName = passingOrderStatus.name;
            temp.orderStatusColorCode = passingOrderStatus.colorCode;
            const orderOption = await this.orderOptionService.find({
                where: { orderProductId: results.orderProductId },
                select: ['productOptionId', 'orderId', 'productOptionValueId', 'name', 'value', 'type', 'orderOptionId', 'orderProductId'],
            });
            temp.orderOption = orderOption;
            const products = await this.productService.findOne({
                where: { productId: results.productId },
                select: ['productSlug'],
            });
            if (products) {
                temp.productSlug = products.productSlug;
            }
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized('customer')
    public async orderDetail(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId'],
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone'],
            where: {
                orderId: orderProduct.orderId,
            },
        });
        const product = await this.productImageService.findOne({
            select: ['productId', 'image', 'containerName'],
            where: {
                productId: orderProduct.productId,
                defaultImage: 1,
            },
        });
        const products = await this.productService.findOne({
            select: ['productSlug'],
            where: {
                productId: orderProduct.productId,
            },
        });
        const passingOrderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: orderProduct.orderStatusId,
            },
        });
        obj.orderedDate = orderProduct.createdDate;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.shippingAddress1 = order.shippingAddress1;
        obj.shippingAddress2 = order.shippingAddress2;
        obj.shippingCity = order.shippingCity;
        if (products) {
            obj.productSlug = products.productSlug;
        }
        obj.shippingPostcode = order.shippingPostcode;
        obj.shippingZone = order.shippingZone;
        obj.paymentMethod = order.paymentType;
        obj.total = orderProduct.total;
        obj.orderStatus = passingOrderStatus.name;
        if (orderProduct.modifiedDate) {
            obj.orderStatusDate = orderProduct.modifiedDate;
        } else {
            obj.orderStatusDate = orderProduct.createdDate;
        }
        obj.productImage = product.image;
        obj.containerName = product.containerName;
        obj.orderId = orderProduct.orderId;
        obj.orderProductId = orderProduct.orderProductId;
        obj.productId = orderProduct.productId;
        obj.productName = orderProduct.name;
        obj.productQuantity = orderProduct.quantity;
        obj.productPrice = orderProduct.productPrice;
        const orderOption = await this.orderOptionService.find({
            where: { orderProductId: orderProduct.orderProductId },
            select: ['productOptionId', 'orderId', 'productOptionValueId', 'name', 'value', 'type', 'orderOptionId', 'orderProductId'],
        });
        obj.orderOption = orderOption;
        const successResponse: any = {
            status: 1,
            message: 'Successfully show the order details',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }

    // Product Rating  API
    /**
     * @api {post} /api/orders/add-rating Add Rating  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiParam (Request body) {Number} rating productRatings
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your reviews and ratings!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/add-rating
     * @apiErrorExample {json} rating error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order List Function
    @Post('/add-rating')
    @Authorized('customer')
    public async Rating(@Body({ validate: true }) ratingValue: any, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(request.body.rating);

        const resultData = await this.productService.findOne({

            where: { productId: request.body.productId },
        });
        console.log(resultData);
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: request.body.orderProductId,
            },
        });
        console.log(rating);
        if (rating) {
            rating.review = request.body.reviews;
            rating.rating = request.body.rating;
            const updateRatings = await this.productRatingService.create(rating);
            if (updateRatings) {
                const updateRating: any = await this.productRatingService.consolidateRating(request.body.productId);
                console.log(updateRating.RatingCount);
                console.log(updateRating.RatingSum);
                resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your reviews and ratings',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const customer = await this.customerService.findOne({ where: { id: request.user.id } });
            const newRating: any = new ProductRating();
            newRating.review = request.body.reviews;
            newRating.rating = request.body.rating;
            newRating.orderProductId = request.body.orderProductId;
            newRating.productId = request.body.productId;
            newRating.customerId = request.user.id;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 1;
            const AddRating = await this.productRatingService.create(newRating);
            if (AddRating) {
                const updateRating: any = await this.productRatingService.consolidateRating(request.body.productId);
                console.log(updateRating.RatingCount);
                console.log(updateRating.RatingSum);
                resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created your ratings and reviews',
                };
                return response.status(200).send(successResponse);
            }
        }
    }

    // Product Reviews  API
    /**
     * @api {post} /api/orders/add-reviews Add Reviews  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId productId
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added reviews!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/add-reviews
     * @apiErrorExample {json} reviews error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order List Function
    @Post('/add-reviews')
    @Authorized('customer')
    public async Reviews(@Body({ validate: true }) Value: any, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(request.body.reviews);

        const resultData = await this.productService.findOne({

            where: { productId: request.body.productId },
        });
        console.log(resultData);
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: request.body.orderProductId,
            },
        });
        console.log(rating);
        if (rating) {
            rating.review = request.body.reviews;
            const updateRating = await this.productRatingService.create(rating);
            if (updateRating) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your reviews',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const customer = await this.customerService.findOne({ where: { id: request.user.id } });
            const newRating: any = new ProductRating();
            newRating.review = request.body.reviews;
            newRating.productId = request.body.productId;
            newRating.orderProductId = request.body.orderProductId;
            newRating.customerId = request.user.id;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 1;
            await this.productRatingService.create(newRating);

            const successResponse: any = {
                status: 1,
                message: 'Successfully created your reviews',
            };
            return response.status(200).send(successResponse);

        }
    }

    // Track Order Product API
    /**
     * @api {get} /api/orders/track-order-product Track Order
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Track Order..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/track-order-product
     * @apiErrorExample {json} Track Order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Track Order Function
    @Get('/track-order-product')
    @Authorized('customer')
    public async trackOrder(@QueryParam('orderProductId') orderProductId: number, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['orderProductId', 'trackingNo', 'trackingUrl', 'name', 'productPrice', 'orderId', 'productId', 'orderProductPrefixId', 'total', 'quantity', 'modifiedDate', 'orderStatusId', 'createdDate'],
            where: { orderProductId },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['image', 'containerName', 'productId'],
            where: { productId: orderProduct.productId, defaultImage: 1 },
        });
        console.log('IMAGE' + orderProduct.product);
        const order = await this.orderService.findOrder({
            select: ['shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'orderPrefixId'],
            where: { orderId: orderProduct.orderId },
        });
        const passingOrderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: orderProduct.orderStatusId,
            },
        });
        obj.orderProductId = orderProduct.orderProductId;
        obj.orderId = orderProduct.orderId;
        obj.productId = orderProduct.productId;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.trackingId = orderProduct.trackingNo;
        obj.trackingUrl = orderProduct.trackingUrl;
        obj.productName = orderProduct.name;
        obj.productPrice = orderProduct.productPrice;
        obj.total = orderProduct.total;
        if (orderProduct.modifiedDate) {
            obj.orderStatusDate = orderProduct.modifiedDate;
        } else {
            obj.orderStatusDate = orderProduct.createdDate;
        }
        obj.orderStatus = passingOrderStatus.name;
        obj.productQuantity = orderProduct.quantity;
        obj.shippingAddress1 = order.shippingAddress1;
        obj.shippingAddress2 = order.shippingAddress2;
        obj.shippingCity = order.shippingCity;
        obj.shippingPostcode = order.shippingPostcode;
        obj.shippingZone = order.shippingZone;
        obj.currencySymbolLeft = order.currencySymbolLeft;
        obj.currencySymbolRight = order.currencySymbolRight;
        obj.orderPrefixId = order.orderPrefixId;
        obj.productImage = product.image;
        obj.containerName = product.containerName;
        const orderOption = await this.orderOptionService.find({
            where: { orderProductId: orderProduct.orderProductId },
            select: ['productOptionId', 'orderId', 'productOptionValueId', 'name', 'value', 'type', 'orderOptionId', 'orderProductId'],
        });
        obj.orderOption = orderOption;
        const orderStatus = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name'],
            where: {
                isActive: 1,
            },
        });
        const orderProductLog = await this.orderProductLogService.find({
            select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
            where: {
                orderProductId: orderProduct.orderProductId,
            },
        });
        const orderStatusDate = orderStatus.map(async (value: any) => {
            const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (date === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = date.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderStatusDate);
        obj.deliveryStatus = result;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the Track Order.',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/orders/order-export-pdf  Order Export PDF API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-export-pdf')
    // @Authorized()
    public async orderExportPdf(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        orderData.productList = await this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'] }).then((val) => {
            console.log(val);
            const productVal = val.map(async (value: any) => {
                const orderOption = await this.orderOptionService.find({
                    where: { orderProductId: value.orderProductId },
                    select: ['name', 'value', 'type', 'orderOptionId', 'orderProductId'],
                });
                const rating = await this.productRatingService.findOne({ select: ['rating', 'review'], where: { customerId: orderData.customerId, orderProductId: value.orderProductId, productId: value.productId } });
                const tempVal: any = value;
                tempVal.orderOptions = orderOption;
                if (rating !== undefined) {
                    tempVal.rating = rating.rating;
                    tempVal.review = rating.review;
                } else {
                    tempVal.rating = 0;
                    tempVal.review = '';
                }
                return tempVal;
            });
            const results = Promise.all(productVal);
            return results;
        });
        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;

        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const settingDetails = settings[0];
        const countryData: any = await this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
        const zoneData: any = await this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
        orderData.settingDetails = settingDetails;
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
        // const currencyData: any = await this.currencyService.findOne({where: { currencyId : settingDetails.storeCurrencyId}});
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        orderData.total = orderProduct.total;
        orderData.quantity = orderProduct.quantity;
        orderData.price = orderProduct.productPrice;
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderProduct.orderStatusId },
            select: ['name', 'colorCode'],
        });
        orderData.orderStatusName = orderStatusData.name;
        orderData.statusColorCode = orderStatusData.colorCode;
        let image: any;
        if (env.imageserver === 's3') {
            image = await this.s3Service.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '50', '50');
        } else {
            image = await this.imageService.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '50', '50');
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('invoice', orderData);
        console.log('htmlData', htmlData);
        const pdfBinary = await this.pdfService.createPDFFile(htmlData, true, '');

        return response.status(200).send({
            data: pdfBinary,
            status: 1,
            message: 'pdf exported',
        });
    }

    public decrypt(text: any): any {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q';
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    private async validateDelivery(checkoutParam: CustomerCheckoutRequest): Promise<any> {
        const errors: any = [];
        const orderProducts: any = checkoutParam.productDetails;
        for (const val of orderProducts) {
            const value = await this.vendorProductService.findOne({ where: { productId: val.productId } });
            if (value) {
                const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId } });
                if (!deliveryLocation) {
                    errors.push(1);
                }
            }
        }
        return errors;
    }
}
