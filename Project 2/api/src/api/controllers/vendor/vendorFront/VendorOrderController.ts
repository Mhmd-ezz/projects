/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Req, Get, QueryParam, Authorized, Param, Delete, Put, BodyParam, Post} from 'routing-controllers';
import {VendorOrdersService} from '../../../services/VendorOrderService';
import {OrderService} from '../../../services/OrderService';
import {OrderProductService} from '../../../services/OrderProductService';
import {VendorOrderStatusService} from '../../../services/VendorOrderStatusService';
import {ProductService} from '../../../services/ProductService';
import {ProductImageService} from '../../../services/ProductImageService';
import {PluginService} from '../../../services/PluginService';
import {VendorOrderLogService} from '../../../services/VendorOrderLogService';
import {VendorProductService} from '../../../services/VendorProductService';
import {VendorOrderLog} from '../../../models/VendorOrderLog';
import { PdfService } from '../../../services/PdfService';
import {CountryService} from '../../../services/CountryService';
import {ZoneService} from '../../../services/zoneService';
import {S3Service} from '../../../services/S3Service';
import {ImageService} from '../../../services/ImageService';
import { SettingService } from '../../../services/SettingService';
import { DeliveryAllocationService } from '../../../services/DeliveryAllocationService';
import moment = require('moment');
import {env} from '../../../../env';
import { VendorOrderArchive } from '../../../models/VendorOrderArchive';
import { VendorOrderArchiveLog } from '../../../models/VendorOrderArchiveLog';
import { VendorOrderArchiveLogService } from '../../../services/VendorOrderArchiveLogService';
import { VendorOrderArchiveService } from '../../../services/VendorOrderArchiveService';
import {VendorOrders} from '../../../models/VendorOrders';

@JsonController('/vendor-order')
export class VendorOrderController {
        constructor( private vendorOrdersService: VendorOrdersService, private orderService: OrderService, private orderProductService: OrderProductService,
                     private pluginService: PluginService, private vendorProductService: VendorProductService,
                     private vendorOrderStatusService: VendorOrderStatusService, private productImageService: ProductImageService,
                     private vendorOrderLogService: VendorOrderLogService, private productService: ProductService,
                     private pdfService: PdfService, private countryService: CountryService,
                     private zoneService: ZoneService, private s3Service: S3Service,
                     private vendorOrderArchiveLogService: VendorOrderArchiveLogService,
                     private vendorOrderArchiveService: VendorOrderArchiveService,
                     private imageService: ImageService, private settingService: SettingService, private deliveryAllocationService: DeliveryAllocationService
        ) {
    }

    // Recent order List API
    /**
     * @api {get} /api/vendor-order/recent-order-list Recent Vendor Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get recent order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/recent-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/recent-order-list')
    @Authorized('vendor')
    public async vendorRecentOrderList( @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'total', 'createdDate'];
        const WhereConditions = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
            {
                name: 'subOrderStatusId',
                op: 'where',
                value: status,
            },

        ];
        const search = [];
        const orderList = await this.vendorOrdersService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got count.',
                data: orderList,
            };
            return response.status(200).send(Response);
        }
        const ordersList = orderList.map(async (value: any) => {
            const order = await this.orderService.findOrder({
                where: { orderId: value.orderId },
                select: ['orderId', 'orderPrefixId', 'customerId', 'shippingFirstname', 'shippingCountry', 'shippingCity', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            const orderStatus = await this.vendorOrderStatusService.findOne({
                where: { vendorOrderStatusId: value.subOrderStatusId },
                select: ['name'],
            });
            const temp: any = value;
            temp.orderPrefixId = order.orderPrefixId;
            temp.productTotal = value.total;
            temp.customerFirstName = order.shippingFirstname;
            temp.city = order.shippingCity;
            temp.country = order.shippingCountry;
            temp.currencySymbolLeft = order.currencySymbolLeft;
            temp.currencySymbolRight = order.currencySymbolRight;
            temp.orderStatusName = orderStatus.name;
            return temp;

        });
        const results = await Promise.all(ordersList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }
    //  Order Detail API
    /**
     * @api {get} /api/vendor-order/order-detail/:vendorOrderId  Order Detail API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/order-detail/:vendorOrderId
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-detail/:vendorOrderId')
    @Authorized('vendor')
    public async orderDetail(@Param('vendorOrderId') vendorOrderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.vendorOrdersService.findOne({
            where: { vendorOrderId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate', 'trackingUrl', 'trackingNo'],
        });
        orderData.productList = await this.orderProductService.find({ where: { orderProductId: orderData.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId'] }).then((val) => {
            const vendorOrder = val.map(async (value: any) => {
                const ProductImage = await this.productImageService.findOne({ where: {productId: value.productId, defaultImage: 1 }});
                const temp: any = value;
                temp. image = ProductImage.image;
                temp. containerName = ProductImage.containerName;
                return temp;
            });
            const results = Promise.all(vendorOrder);
            return results;
           });
        const order = await this.orderService.findOrder({
            where: { orderId: orderData.orderId },
            select: ['shippingFirstname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry',  'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod', 'paymentStatus'],
        });
        console.log(order.paymentMethod + 'paymentMethod');
        const plugin = await this.pluginService.findOne({where: {id: order.paymentMethod}});
        console.log(plugin.pluginName + 'pluginName');

        const orderStatusData = await this.vendorOrderStatusService.findOne({
            where: { vendorOrderStatusId: orderData.subOrderStatusId },
            select: ['name', 'colorCode'],
        });
        const deliveryAllocation = await this.deliveryAllocationService.findOne({
            where: { vendorOrderId },
            select: ['deliveryPersonId'],
        });
        if (deliveryAllocation) {
            orderData.deliveryPersonId = deliveryAllocation.deliveryPersonId;
        } else {
            orderData.deliveryPersonId = 0;
        }
         orderData.customerFirstName = order.shippingFirstname;
         orderData.shippingAddress1 = order.shippingAddress1;
         orderData.shippingAddress2 = order.shippingAddress2;
         orderData.shippingCity = order.shippingCity;
         orderData.shippingPostcode = order.shippingPostcode;
         orderData.shippingCountry = order.shippingCountry;
         orderData.shippingZone = order.shippingZone;
         orderData.orderStatusName = orderStatusData.name;
         orderData.statusColorCode = orderStatusData.colorCode;
         orderData.paymentMethod = plugin.pluginName;
         orderData.currencySymbolLeft = order.currencySymbolLeft;
         orderData.currencySymbolRight = order.currencySymbolRight;
         orderData.paymentFlag = order.paymentFlag;
         orderData.paymentStatus = order.paymentStatus;
         const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }

    // Today order count API
    /**
     * @api {get} /api/vendor-order/today-vendor-order-count Today Vendor Order Count API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/today-vendor-order-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/today-vendor-order-count')
    @Authorized('vendor')
    public async orderCount(@Req() request: any, @Res() response: any): Promise<any> {

        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();

        const orderCount = await this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today order count',
            data: orderCount,
        };
        return response.status(200).send(successResponse);

    }

    // Order Counts
    /**
     * @api {get} /api/vendor-order/order-counts order counts
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/order-counts')
    @Authorized('vendor')
    public async orderCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const todayOrderCount = await this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
        const buyerAndRevenueCount = await this.vendorOrdersService.getBuyersCount(request.user.vendorId);
        const orderList: any = await this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
        console.log(orderList.length + 'orderListLength');
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today order count',
            data: {
                totalOrderCount: orderList.length,
                todayOrderCount: todayOrderCount.orderCount,
                paidCount: buyerAndRevenueCount.salesCount,
            },
        };
        return response.status(200).send(successResponse);

    }

    // Delete Order API
    /**
     * @api {delete} /api/vendor-order/delete-vendor-order/:id Delete Vendor Order API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Vendor Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/delete-order/:id
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-order/:id')
    @Authorized()
    public async deleteOrder(@Param('id') orderid: number, @Res() response: any, @Req() request: any): Promise<any> {
        const orderData = await this.orderService.find({ where: { orderId: orderid } });
        if (orderData.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid orderId',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteOrder = await this.orderService.delete(orderid);
        if (deleteOrder) {
            const successResponse: any = {
                status: 1,
                message: 'Order Deleted Successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete Order',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Order Status API
    /**
     * @api {put} /api/vendor-order/update-order-status/:vendorOrderId Update OrderStatus API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} subOrderStatusId OrderStatus subOrderStatusId
     * @apiParamExample {json} Input
     * {
     *      "subOrderStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-order-status/:vendorOrderId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-order-status/:vendorOrderId')
    @Authorized('vendor')
    public async updateOrderStatus(@Param('vendorOrderId') vendorOrderId: number, @BodyParam('subOrderStatusId') subOrderStatusId: number, @Res() response: any): Promise<any> {
        const orderStatus = await this.vendorOrdersService.findOne({
            where: {
                vendorOrderId,
            },
        });
        console.log('ordstatus' + orderStatus);
        if (!orderStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendorOrderId',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorOrderLog: any = new VendorOrderLog();
        vendorOrderLog.vendorId = orderStatus.vendorId;
        vendorOrderLog.vendorOrderId = orderStatus.vendorOrderId;
        vendorOrderLog.orderId = orderStatus.orderId;
        vendorOrderLog.subOrderId = orderStatus.subOrderId;
        vendorOrderLog.subOrderStatusId = subOrderStatusId;
        vendorOrderLog.total = orderStatus.total;
        await this.vendorOrderLogService.create(vendorOrderLog);
        orderStatus.subOrderStatusId = subOrderStatusId;
        const orderStatusUpdate = await this.vendorOrdersService.update(orderStatus.vendorOrderId, orderStatus);
        if (orderStatusUpdate !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status.',
                data: orderStatusUpdate,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to update OrderStatus.',
            };
            return response.status(400).send(errorResponse);
        }
    }

     // Vendor Order Status List API
    /**
     * @api {get} /api/vendor-order/vendor-order-status-list OrderStatus List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order status list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-order-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-order-status-list')
    @Authorized('vendor')
    public async orderStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {

        const select = ['vendorOrderStatusId', 'name', 'colorCode', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];
        const WhereConditions = [];
        const orderStatusList = await this.vendorOrderStatusService.list(limit, offset, select, search, WhereConditions, count);
        if (orderStatusList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete order status list.',
                data: orderStatusList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get OrderStatus.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor order List based on order status API
    /**
     * @api {get} /api/vendor-order/vendor-orders-based-status-list Vendor order List based on order status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-orders-based-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-orders-based-status-list')
    @Authorized('vendor')
    public async vendorOrderBasedStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const select = ['vendorOrderStatusId', 'name', 'colorCode', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];
        const WhereConditions = [];
        const orderStatusList = await this.vendorOrderStatusService.list(limit, offset, select, search, WhereConditions, count);
        const promise = orderStatusList.map(async (value: any) => {
            const temp: any = value;
            const vendorOrders: any = [];
            const vendorOrder = await this.vendorOrdersService.findAll({
                where: { vendorId: request.user.vendorId, subOrderStatusId: value. vendorOrderStatusId},
                select: ['vendorOrderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'orderId', 'vendorId', 'total'],
                order: { createdDate: 'DESC' },
            });
            for (const venOrder of vendorOrder) {
                const order = await this.orderService.findOrder({
                    where: { orderId: venOrder.orderId },
                    select: ['orderId', 'shippingFirstname', 'shippingAddress1', 'shippingCity', 'shippingCountry', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight']});
                // const vendorOrderProduct = await this.vendorOrderProductsService.findAll({
                //     where: { vendorOrderId: venOrder.vendorOrderId },
                //     select: ['orderProductId'],
                // });
                // let total = 0 ;
                // for (const id of vendorOrderProduct) {
                //     const OrderProductTotal = await this.orderProductService.findOne({select: ['total'], where: { orderProductId: id.orderProductId}});
                //     total += +OrderProductTotal.total;
                // }
                const createdDate = moment.utc(venOrder.createdDate).local().format('YYYY-MM-DD');
                // console.log(total + 'total');
                const obj: any = {};
                obj.vendorOrderId = venOrder.vendorOrderId;
                obj.subOrderId = venOrder.subOrderId;
                obj.firstName = order.shippingFirstname;
                obj.shippingAddress1 = order.shippingAddress1;
                obj.shippingCity = order.shippingCity;
                obj.shippingCountry = order.shippingCountry;
                obj.shippingZone = order.shippingZone;
                obj.currencySymbolLeft = order.currencySymbolLeft;
                obj.currencySymbolRight = order.currencySymbolRight;
                obj.createdDate = createdDate;
                obj.subOrderStatusId = venOrder.subOrderStatusId;
                obj.total = venOrder.total;
                vendorOrders.push(obj);
            }
            console.log(vendorOrders + 'vendorOrders');
            temp.vendorOrders = vendorOrders;
            temp.orderCount = vendorOrders.length;
            return temp;
        });
        const results = await Promise.all(promise);
        if (results) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete order status list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        }
    }

    // order log List API
    /**
     * @api {get} /api/vendor-order/vendorOrderLoglist Vendor Order Log List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order log list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendorOrderLoglist
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendorOrderLoglist')
    @Authorized('vendor')
    public async orderLogList(@QueryParam('vendorOrderId') vendorOrderId: number, @Res() response: any): Promise<any> {
        const select = ['vendorOrderLogId', 'vendorId', 'vendorOrderId', 'orderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'modifiedDate'];
        // const search = [];
        const WhereConditions = [
            {
                name: 'vendorOrderId',
                op: 'where',
                value: vendorOrderId,
            },
        ];
        const orderList = await this.vendorOrderLogService.list(0, 0, select, WhereConditions, 0);
        const orderStatuss = await this.vendorOrderStatusService.findAll({select: ['vendorOrderStatusId', 'name'], where: {isActive: 1}});
        console.log(orderStatuss + 'results');
        const order = orderStatuss.map(async (value: any) => {
            console.log(value.vendorOrderStatusId + 'vendorOrderStatusId');
            const user = orderList.find(item => item.subOrderStatusId === value.vendorOrderStatusId);
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
            message: 'Successfully got the complete Vendor Order Status Log list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    //  Top Selling Product List API
    /**
     * @api {get} /api/vendor-order/top-selling-productlist  Top selling ProductList API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/top-selling-productlist')
    @Authorized('vendor')
    public async topSellingProductList(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const data = await this.vendorProductService.topProductSelling(request.user.vendorId, duration, 4);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'price', 'name'],
                where: { productId: result.product },
            });
            const temp: any = result;
            temp.product = product;
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

    //  update shipping information API
    /**
     * @api {post} /api/vendor-order/update-shipping-information   update shipping information API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId VendorOrderId
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/update-shipping-information')
    @Authorized('vendor')
    public async updateShippingInformation(@BodyParam('vendorOrderId') vendorOrderId: number, @BodyParam('trackingUrl') trackingUrl: string, @BodyParam('trackingNo') trackingNo: string, @Res() response: any): Promise<any> {
        const updateOrder = await this.vendorOrdersService.findOne(vendorOrderId);
        console.log(updateOrder + 'updateOrder');
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.trackingUrl = trackingUrl;
        updateOrder.trackingNo = trackingNo;
        const orderSave = await this.vendorOrdersService.create(updateOrder);
        if (orderSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Shipping Information',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Shipping Information',
            };
            return response.status(400).send(errorResponse);
        }
    }

     //  Order Export PDF API
    /**
     * @api {get} /api/vendor-order/order-export-pdf  Order Export PDF API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-export-pdf')
    // @Authorized()
    public async orderExportPdf(@QueryParam('vendorOrderId') vendorOrderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.vendorOrdersService.findOne({
            where: { vendorOrderId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate'],
        });
        orderData.productList = await this.orderProductService.find({ where: { orderProductId: orderData.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice'] }).then((val) => {
            const vendorOrder = val.map(async (value: any) => {
                const ProductImage = await this.productImageService.findOne({ where: {productId: value.productId, defaultImage: 1 }});
                const temp: any = value;
                temp. image = ProductImage.image;
                temp. containerName = ProductImage.containerName;
                return temp;
            });
            const results = Promise.all(vendorOrder);
            return results;
        });
        const order = await this.orderService.findOrder({
            where: { orderId: orderData.orderId },
            select: ['invoicePrefix' , 'invoiceNo', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry',
             'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry',  'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod'],
        });
        console.log(order.paymentMethod + 'paymentMethod');
        const plugin = await this.pluginService.findOne({where: {id: order.paymentMethod}});
        console.log(plugin.pluginName + 'pluginName');
        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;

        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const settingDetails = settings[0];
        const countryData: any = await this.countryService.findOne({where: { countryId : settingDetails.countryId}});
        const zoneData: any = await this.zoneService.findOne({where: { zoneId : settingDetails.zoneId}});
        orderData.settingDetails = settingDetails;
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ' ;
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
         orderData.shippingFirstname = order.shippingFirstname;
         orderData.shippingLastname = order.shippingLastname;
         orderData.shippingAddress1 = order.shippingAddress1;
         orderData.shippingAddress2 = order.shippingAddress2;
         orderData.shippingCity = order.shippingCity;
         orderData.shippingPostcode = order.shippingPostcode;
         orderData.paymentFirstname = order.paymentFirstname;
         orderData.paymentLastname = order.paymentLastname;
         orderData.paymentAddress1 = order.paymentAddress1;
         orderData.paymentAddress2 = order.paymentAddress2;
         orderData.paymentCity = order.paymentCity;
         orderData.paymentPostcode  = order.paymentPostcode ;
         orderData.paymentMethod = plugin.pluginName;
         orderData.symbolLeft = order.currencySymbolLeft;
         orderData.symbolRight = order.currencySymbolRight;
         orderData.invoiceNo = order.invoiceNo;
         orderData.invoicePrefix = order.invoicePrefix;
         orderData.orderPrefixId = order.orderPrefixId;
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

    // Make Vendor Order Archive API
    /**
     * @api {post} /api/vendor-order/make-vendor-order-archive Make Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId Vendor Order Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archive",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/make-vendor-order-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/make-vendor-order-archive')
    @Authorized('vendor')
    public async makeArchive(@BodyParam('vendorOrderId') vendorOrderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorOrder = await this.vendorOrdersService.findOne({
            where : {
                vendorOrderId,
            },
        });
        if (!vendorOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid Vendor Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        const newVendorOrderArchive: any = new VendorOrderArchive();
        newVendorOrderArchive.vendorId = vendorOrder.vendorId;
        newVendorOrderArchive.orderId = vendorOrder.orderId;
        newVendorOrderArchive.subOrderId = vendorOrder.subOrderId;
        newVendorOrderArchive.subOrderStatusId = vendorOrder.subOrderStatusId;
        newVendorOrderArchive.orderProductId = vendorOrder.orderProductId;
        newVendorOrderArchive.total = vendorOrder.total;
        newVendorOrderArchive.commission = vendorOrder.commission;
        newVendorOrderArchive.trackingUrl = vendorOrder.trackingUrl;
        newVendorOrderArchive.trackingNo = vendorOrder.trackingNo;
        const archive = await this.vendorOrderArchiveService.create(newVendorOrderArchive);
        console.log(archive);
        const vendorOrderLog = await this.vendorOrderLogService.find({
            where: {
                vendorOrderId,
            },
        });
        const arr: any = [];
        for (const data of vendorOrderLog) {
            const newVendorOrderArchiveLog: any = new VendorOrderArchiveLog();
            newVendorOrderArchiveLog.vendorOrderArchiveId = archive.vendorOrderArchiveId;
            newVendorOrderArchiveLog.vendorId = data.vendorId;
            newVendorOrderArchiveLog.orderId = data.orderId;
            newVendorOrderArchiveLog.subOrderId = data.subOrderId;
            newVendorOrderArchiveLog.subOrderStatusId = data.subOrderStatusId;
            newVendorOrderArchiveLog.orderProductId = data.orderProductId;
            newVendorOrderArchiveLog.total = data.total;
            newVendorOrderArchiveLog.commission = data.commission;
            newVendorOrderArchiveLog.trackingUrl = data.trackingUrl;
            newVendorOrderArchiveLog.trackingNo = data.trackingNo;
            arr.push(newVendorOrderArchiveLog);
            console.log('ARRAY' + arr);
        }
        const archiveLog = await this.vendorOrderArchiveLogService.create(arr);
        console.log(archiveLog);
        const deleteVendorOrder = await this.vendorOrdersService.delete(vendorOrder);
        console.log(deleteVendorOrder);
        const successResponse: any = {
            status: 1,
            message: 'Successfully archived',
        };
        return response.status(200).send(successResponse);
    }

    // Revoke Vendor Order Archive API
    /**
     * @api {post} /api/vendor-order/revoke-vendor-order-archive Revoke Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderArchiveId Vendor Order Archive Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderArchiveId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Revoked Archive",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/revoke-vendor-order-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/revoke-vendor-order-archive')
    @Authorized('vendor')
    public async revokeArchive(@BodyParam('vendorOrderArchiveId') vendorOrderArchiveId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorOrderArchive = await this.vendorOrderArchiveService.findOne({
            where : {
                vendorOrderArchiveId,
            },
        });
        if (!vendorOrderArchive) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid Vendor Order Archive Id',
            };
            return response.status(400).send(errorResponse);
        }
        const newVendorOrders: any = new VendorOrders();
        newVendorOrders.vendorId = vendorOrderArchive.vendorId;
        newVendorOrders.orderId = vendorOrderArchive.orderId;
        newVendorOrders.subOrderId = vendorOrderArchive.subOrderId;
        newVendorOrders.subOrderStatusId = vendorOrderArchive.subOrderStatusId;
        newVendorOrders.orderProductId = vendorOrderArchive.orderProductId;
        newVendorOrders.total = vendorOrderArchive.total;
        newVendorOrders.commission = vendorOrderArchive.commission;
        newVendorOrders.trackingUrl = vendorOrderArchive.trackingUrl;
        newVendorOrders.trackingNo = vendorOrderArchive.trackingNo;
        const vendorOrders = await this.vendorOrdersService.create(newVendorOrders);
        console.log(vendorOrders);
        const vendorOrderArchiveLog = await this.vendorOrderArchiveLogService.find({
            where: {
                vendorOrderArchiveId,
            },
        });
        const arr: any = [];
        for (const data of vendorOrderArchiveLog) {
            const newVendorOrderLog: any = new VendorOrderLog();
            newVendorOrderLog.vendorOrderId = vendorOrders.vendorOrderId;
            newVendorOrderLog.vendorId = data.vendorId;
            newVendorOrderLog.orderId = data.orderId;
            newVendorOrderLog.subOrderId = data.subOrderId;
            newVendorOrderLog.subOrderStatusId = data.subOrderStatusId;
            newVendorOrderLog.orderProductId = data.orderProductId;
            newVendorOrderLog.total = data.total;
            newVendorOrderLog.commission = data.commission;
            newVendorOrderLog.trackingUrl = data.trackingUrl;
            newVendorOrderLog.trackingNo = data.trackingNo;
            arr.push(newVendorOrderLog);
            console.log('ARRAY' + arr);
        }
        const vendorOrderLog = await this.vendorOrderLogService.create(arr);
        console.log(vendorOrderLog);
        const deleteVendorOrderArchive = await this.vendorOrderArchiveService.delete(vendorOrderArchive);
        console.log(deleteVendorOrderArchive);
        const successResponse: any = {
            status: 1,
            message: 'Successfully archived',
        };
        return response.status(200).send(successResponse);
    }

    // Archive Order List API
    /**
     * @api {get} /api/vendor-order/archive-order-list  Archive Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/archive-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/archive-order-list')
    @Authorized('vendor')
    public async archiveOrderList(@QueryParam('keyword') keyword: string,
                                  @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
            'VendorOrderArchive.orderId as orderId',
            'VendorOrderArchive.vendorId as vendorId',
            'VendorOrderArchive.subOrderId as subOrderId',
            'VendorOrderArchive.subOrderStatusId as subOrderStatusId',
            'vendorOrderStatus.name as orderStatusName',
            'vendorOrderStatus.colorCode as orderColorCode',
            'order.orderStatusId as orderStatusId',
            'order.createdDate as createdDate',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'order.shippingFirstname as customerFirstName',
            'order.paymentStatus as paymentStatus',
            'VendorOrderArchive.total as total',
            'VendorOrderArchive.commission as commission',
            'order.isActive as isActive',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry'];

        const relations = [
            {
                tableName: 'VendorOrderArchive.order',
                aliasName: 'order',
            },
            {
                tableName: 'VendorOrderArchive.vendorOrderStatus',
                aliasName: 'vendorOrderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorOrderArchive.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (deliverylist && deliverylist !== 0) {
            whereConditions.push({
                name: 'order.paymentStatus',
                op: 'and',
                value: 1,
            });
        }

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`order`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`order`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['shipping_firstname' , 'VendorOrderArchive.subOrderId' ],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'order.createdDate',
            order: 'DESC',
        });

        const orderArchiveList: any = await this.vendorOrderArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderArchiveResponse = orderArchiveList.map(async (value: any) => {
            const temp: any = value;
            const defCommission =  (value.commission && value.commission > 0) ? value.commission : 0;
            const commission = value.total * (defCommission / 100);
            temp.CommissionAmount = commission;
            temp.NetAmount = value.total - commission;
            return temp;
        });
        const paymentListDetails = await Promise.all(orderArchiveResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order archive list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Order List API
    /**
     * @api {get} /api/vendor-order/order-list  Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} deliverylist deliverylist
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/order-list')
    @Authorized('vendor')
    public async orderListtt(@QueryParam('keyword') keyword: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'VendorOrders.vendorOrderId as vendorOrderId',
            'VendorOrders.orderId as orderId',
            'VendorOrders.vendorId as vendorId',
            'VendorOrders.subOrderId as subOrderId',
            'VendorOrders.subOrderStatusId as subOrderStatusId',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderColorCode',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.createdDate as createdDate',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as customerFirstName',
            'orderDetail.paymentStatus as paymentStatus',
            'VendorOrders.total as total',
            'VendorOrders.commission as commission',
            'orderDetail.isActive as isActive',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.shippingCountry as shippingCountry'];

        const relations = [
            {
                tableName: 'VendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
            {
                tableName: 'VendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorOrders.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (deliverylist && deliverylist !== 0) {
            whereConditions.push({
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
        }

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`orderDetail`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`orderDetail`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['shipping_firstname' , 'VendorOrders.subOrderId' ],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'orderDetail.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const temp: any = value;
            const defCommission =  (value.commission && value.commission > 0) ? value.commission : 0;
            const commission = value.total * (defCommission / 100);
            temp.CommissionAmount = commission;
            temp.NetAmount = value.total - commission;
            return temp;
        });
        const paymentListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }
}
