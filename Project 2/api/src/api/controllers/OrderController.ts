/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Authorized, QueryParam, Res, Req, Post, Body, Delete, Param, BodyParam, Put } from 'routing-controllers';
import { OrderService } from '../services/OrderService';
import { UpdateOrderChangeStatus } from './requests/UpdateOrderChangeStatus';
import { DeleteOrderRequest } from './requests/DeleteOrderRequest';
import { OrderLogService } from '../services/OrderLogService';
import { OrderProductService } from '../services/OrderProductService';
import { OrderStatusService } from '../services/OrderStatusService';
import { OrderOptionService } from '../services/OrderOptionService';
import { ProductRatingService } from '../services/RatingService';
import {SettingService} from '../services/SettingService';
import { PdfService } from '../services/PdfService';
import {CountryService} from '../services/CountryService';
import {ZoneService} from '../services/zoneService';
import {Payment} from '../models/Payment';
import {PaymentItems} from '../models/PaymentItems';
import {VendorPayment} from '../models/VendorPayment';
import {env} from '../../env';
import {S3Service} from '../services/S3Service';
import {ImageService} from '../services/ImageService';
import {PaymentService} from '../services/PaymentService';
import {PaymentItemsService} from '../services/PaymentItemsService';
import {VendorPaymentService} from '../services/VendorPaymentService';
import {VendorProductService} from '../services/VendorProductService';
import {VendorOrdersService} from '../services/VendorOrderService';
import {VendorService} from '../services/VendorService';
import {VendorGlobalSettingService} from '../services/VendorSettingService';
import * as fs from 'fs';
import moment = require('moment');
import {OrderProductLog} from '../models/OrderProductLog';
import {OrderProductLogService} from '../services/OrderProductLogService';
import {ProductImageService} from '../services/ProductImageService';

@JsonController('/order')
export class OrderController {
    constructor(private orderService: OrderService, private orderLogService: OrderLogService,
                private orderProductService: OrderProductService,
                private pdfService: PdfService,
                private countryService: CountryService,
                private zoneService: ZoneService,
                private settingService: SettingService,
                private s3Service: S3Service,
                private imageService: ImageService,
                private paymentService: PaymentService,
                private paymentItemsService: PaymentItemsService,
                private vendorPaymentService: VendorPaymentService,
                private vendorProductService: VendorProductService,
                private vendorService: VendorService,
                private vendorOrdersService: VendorOrdersService,
                private vendorGlobalSettingService: VendorGlobalSettingService,
                private orderProductLogService: OrderProductLogService,
                private productImageService: ProductImageService,
                private orderStatusService: OrderStatusService, private orderOptionService: OrderOptionService, private productRatingService: ProductRatingService
    ) {
    }

    // order List API
    /**
     * @api {get} /api/order/orderlist Order List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} orderId search by orderId
     * @apiParam (Request body) {String} orderStatusId search by orderStatusId
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {Number} totalAmount search by totalAmount
     * @apiParam (Request body) {Number} dateAdded search by dateAdded
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
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
     * @apiSampleRequest /api/order/orderlist
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/orderlist')
    @Authorized()
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('orderId') orderId: string, @QueryParam('orderStatusId') orderStatusId: string, @QueryParam('customerName') customerName: string,
                           @QueryParam('totalAmount') totalAmount: string, @QueryParam('dateAdded') dateAdded: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['orderId', 'orderStatusId', 'orderPrefixId', 'shippingFirstname', 'total', 'createdDate', 'customerId', 'isActive', 'modifiedDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'];
        const search = [
            {
                name: 'orderPrefixId',
                op: 'like',
                value: orderId,
            },
            {
                name: 'orderStatusId',
                op: 'like',
                value: orderStatusId,
            },
            {
                name: 'shippingFirstname',
                op: 'like',
                value: customerName,
            },
            {
                name: 'total',
                op: 'like',
                value: totalAmount,
            },
            {
                name: 'createdDate',
                op: 'like',
                value: dateAdded,
            },

        ];
        const WhereConditions = [];
        const orderList = await this.orderService.list(limit, offset, select, search, WhereConditions, 0, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got count.',
                data: orderList,
            };
            return response.status(200).send(Response);
        }
        const orderStatus = orderList.map(async (value: any) => {
            const status = await this.orderStatusService.findOne({
                where: { orderStatusId: value.orderStatusId },
                select: ['orderStatusId', 'name', 'colorCode'],
            });
            const temp: any = value;
            temp.orderStatus = status;
            return temp;

        });
        const results = await Promise.all(orderStatus);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Detail API
    /**
     * @api {get} /api/order/order-detail  Order Detail API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
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
     * @apiSampleRequest /api/order/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized()
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        orderData.productList = await this.orderProductService.find({ where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'trackingUrl', 'trackingNo', 'orderStatusId'] }).then((val) => {
            console.log(val);
            const productVal = val.map(async (value: any) => {
                const orderOption = await this.orderOptionService.find({
                    where: { orderProductId: value.orderProductId },
                    select: ['name', 'value', 'type', 'orderOptionId', 'orderProductId'],
                });
                const rating = await this.productRatingService.findOne({ select: ['rating', 'review'], where: { customerId: orderData.customerId, orderProductId: value.orderProductId, productId: value.productId } });
                const productImage = await this.productImageService.findOne({ select: ['image', 'containerName'], where: { productId: value.productId, defaultImage: 1 } });
                const tempVal: any = value;
                tempVal.orderOptions = orderOption;
                tempVal.image = productImage.image;
                tempVal.containerName = productImage.containerName;
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
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
            select: ['name', 'colorCode'],
        });
        orderData.orderStatusName = orderStatusData.name;
        orderData.statusColorCode = orderStatusData.colorCode;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/order/order-export-pdf  Order Export PDF API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
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
     * @apiSampleRequest /api/order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-export-pdf')
    // @Authorized()
    public async orderExportPdf(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Id',
            };
            return response.status(400).send(errorResponse);
        }
        orderData.productList = await this.orderProductService.find({ where: { orderId: orderid }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'] }).then((val) => {
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
        const countryData: any = await this.countryService.findOne({where: { countryId : settingDetails.countryId}});
        const zoneData: any = await this.zoneService.findOne({where: { zoneId : settingDetails.zoneId}});
        orderData.settingDetails = settingDetails;
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ' ;
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
        // const currencyData: any = await this.currencyService.findOne({where: { currencyId : settingDetails.storeCurrencyId}});
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderData.orderStatusId },
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

        // if (false) {

        //     return response.status(200).send({
        //         data: pdfBinary,
        //         status: 1,
        //         message: 'pdf exported',
        //     });
        // }
        // response.setHeader('Content-Type', 'application/pdf');
        // // response.contentType('application/pdf');
        // return response.send(pdfBinary);
    }

    // sales List API
    /**
     * @api {get} /api/order/saleslist Sales List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get sales count list",
     *      "data":{
     *      }
     * }
     * @apiSampleRequest /api/order/saleslist
     * @apiErrorExample {json} sales error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/saleslist')
    @Authorized()
    public async salesList(@Res() response: any): Promise<any> {

        const orderList = await this.orderService.salesList();
        console.log(orderList);
        const promises = orderList.map(async (result: any) => {
            const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ];
            const temp: any = result;
            temp.monthYear = monthNames[result.month] + '-' + result.year;
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get sales count List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);

    }

    // total order amount API
    /**
     * @api {get} /api/order/total-order-amount total Order Amount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get total order amount",
     *      "data":{
     *      "count" : "",
     *      }
     * }
     * @apiSampleRequest /api/order/total-order-amount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/total-order-amount')
    @Authorized()
    public async totalOrderAmount(@Res() response: any): Promise<any> {
        let total = 0;
        const order = await this.orderService.findAll();
        let n = 0;
        for (n; n < order.length; n++) {
            total += +order[n].total;
        }
        if (order) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get total order Amount',
                data: total,
            };

            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get total order amount',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // today order amount API
    /**
     * @api {get} /api/order/today-order-amount today Order Amount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get today order amount",
     *      "data":{
     *      }
     * }
     * @apiSampleRequest /api/order/today-order-amount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/today-order-amount')
    @Authorized()
    public async todayOrderAmount(@Res() response: any): Promise<any> {
        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        console.log(todaydate);
        let total = 0;
        const order = await this.orderService.findAlltodayOrder(todaydate);
        let n = 0;
        for (n; n < order.length; n++) {
            total += +order[n].total;
        }
        if (order) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get today order Amount',
                data: total,
            };

            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get today order amount',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Today order count API
    /**
     * @api {get} /api/order/today-order-count Today OrderCount API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/today-order-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/today-order-count')
    @Authorized()
    public async orderCount(@Res() response: any): Promise<any> {

        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();

        const orderCount = await this.orderService.findAllTodayOrderCount(todaydate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today order count',
            data: orderCount,
        };
        return response.status(200).send(successResponse);

    }

    // Change order Status API
    /**
     * @api {post} /api/order/order-change-status   Change Order Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} orderStatusId order Status Id
     * @apiParamExample {json} Input
     * {
     *   "orderDetails" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated order change status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/order-change-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/order-change-status')
    @Authorized()
    public async orderChangeStatus(@Body({ validate: true }) orderChangeStatus: UpdateOrderChangeStatus, @Res() response: any): Promise<any> {
        // return new Promise(async () => {
        const updateOrder = await this.orderService.findOrder(orderChangeStatus.orderId);
        console.log(updateOrder + 'updateOrder');
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.orderStatusId = orderChangeStatus.orderId;
        const order = await this.orderLogService.create(updateOrder);
        const orderLog = await this.orderLogService.findOne(order.orderLogId);
        console.log(orderLog + 'orderLog');
        orderLog.orderId = orderChangeStatus.orderId;
        await this.orderLogService.create(order);
        updateOrder.orderStatusId = orderChangeStatus.orderStatusId;
        const orderSave = await this.orderService.create(updateOrder);
        if (orderSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Order Status',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated OrderStatus',
            };
            return response.status(400).send(errorResponse);
        }
        // });
    }

    // Order Details Excel Document download
    /**
     * @api {get} /api/order/order-excel-list Order Excel
     * @apiGroup Order
     * @apiParam (Request body) {String} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Order Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/order/order-excel-list
     * @apiErrorExample {json} Order Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/order-excel-list')
    public async excelOrderView(@QueryParam('orderId') orderId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Order Detail Sheet');
        const rows = [];
        const orderid = orderId.split(',');
        for (const id of orderid) {
            const dataId = await this.orderService.find({ where: { orderId: id } });
            if (dataId.length === 0) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid orderId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
            { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
            { header: 'Email', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'telephone', size: 16, width: 15 },
            { header: 'Total Amount', key: 'total', size: 16, width: 15 },
            { header: 'Created Date', key: 'createdDate', size: 16, width: 15 },
            { header: 'Updated Date', key: 'modifiedDate', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of orderid) {
            const dataId = await this.orderService.findOrder(id);
            console.log('check', dataId);
            const right = dataId.currencySymbolRight;
            const left = dataId.currencySymbolLeft;
            if (left === null && right === null) {
                rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total, dataId.createdDate, dataId.modifiedDate]);
            } else {
                if (left !== undefined) {
                    rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, left + dataId.total, dataId.createdDate, dataId.modifiedDate]);
                } else {
                    rows.push([dataId.orderPrefixId, dataId.shippingFirstname + ' ' + dataId.shippingLastname, dataId.email, dataId.telephone, dataId.total + right, dataId.createdDate, dataId.modifiedDate]);
                }
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './OrderExcel_' + Date.now() + '.xlsx';
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

    // Delete Order API
    /**
     * @api {delete} /api/order/delete-order/:id Delete Single Order API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/order/delete-order/:id
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

    // Delete Multiple Order API
    /**
     * @api {post} /api/order/delete-order Delete Order API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} orderId orderId
     * @apiParamExample {json} Input
     * {
     * "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/order/delete-order
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-order')
    @Authorized()
    public async deleteMultipleOrder(@Body({ validate: true }) orderDelete: DeleteOrderRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const orderIdNo = orderDelete.orderId.toString();
        const orderid = orderIdNo.split(',');
        for (const id of orderid) {
            const orderData = await this.orderService.find({ where: { orderId: id } });
            if (orderData.length === 0) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a order for delete',
                };
                return response.status(400).send(errorResponse);
            }
        }

        for (const id of orderid) {
            const deleteOrderId = parseInt(id, 10);
            await this.orderService.delete(deleteOrderId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Order Deleted Successfully',
        };
        return response.status(200).send(successResponse);
    }

    // order log List API
    /**
     * @api {get} /api/order/orderLoglist Order Log List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
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
     * @apiSampleRequest /api/order/orderLoglist
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/orderLoglist')
    @Authorized()
    public async orderLogList(@QueryParam('orderId') orderId: number, @Res() response: any): Promise<any> {
        const select = ['orderId', 'orderPrefixId', 'orderStatusId', 'shippingFirstname', 'total', 'createdDate', 'modifiedDate'];
        const search = [
            {
                name: 'orderId',
                op: 'where',
                value: orderId,
            },
        ];
        const WhereConditions = [];
        const orderList = await this.orderLogService.list(0, 0, select, search, WhereConditions, 0);
        // const orderStatus = orderList.map(async (value: any) => {
        //     const status = await this.orderStatusService.findOne({
        //         where: { orderStatusId: value.orderStatusId },
        //         select: ['orderStatusId', 'name', 'colorCode'],
        //     });
        //     const temp: any = value;
        //     temp.orderStatusName = status.name;
        //     temp.orderStatusColorCode = status.colorCode;
        //     return temp;

        // });
        // const results = await Promise.all(orderStatus);
        // const user = results;
        // console.log(user + 'results');
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

    //  update payment status API
    /**
     * @api {post} /api/order/update-payment-status   update payment Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} paymentStatusId 1->paid 2->fail 3-> refund
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "paymentStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated payment status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-payment-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/update-payment-status')
    @Authorized()
    public async updatePaymentStatus(@BodyParam('orderId') orderId: number, @BodyParam('paymentStatusId') paymentStatusId: number, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder(orderId);
        console.log(updateOrder + 'updateOrder');
        if (!updateOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid order Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrder.paymentStatus = paymentStatusId;
        updateOrder.paymentFlag = paymentStatusId;
        updateOrder.paymentType = 'Cash On Delivery';
        const orderSave = await this.orderService.create(updateOrder);
        const paymentParams = new Payment();
        paymentParams.orderId = updateOrder.orderId;
        const date = new Date();
        paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        paymentParams.paymentAmount = updateOrder.total;
        const payments = await this.paymentService.create(paymentParams);
        let i;
        const orderProduct = await this.orderProductService.find({where: {orderId: updateOrder.orderId}, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice']});
        for (i = 0; i < orderProduct.length; i++) {
            const paymentItems = new PaymentItems();
            paymentItems.paymentId = payments.paymentId;
            paymentItems.orderProductId = orderProduct[i].orderProductId;
            paymentItems.totalAmount = orderProduct[i].total;
            paymentItems.productName = orderProduct[i].name;
            paymentItems.productQuantity = orderProduct[i].quantity;
            paymentItems.productPrice = orderProduct[i].productPrice;
            const payItem = await this.paymentItemsService.create(paymentItems);
            const vendorProduct = await this.vendorProductService.findOne({where: {productId: orderProduct[i].productId}});
            if (vendorProduct) {
                const vendor = await this.vendorService.findOne({where: {vendorId: vendorProduct.vendorId}});
                const vendorOrders = await this.vendorOrdersService.findOne({where: {vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId}});
                const vendorPayments = new VendorPayment();
                vendorPayments.vendorId = vendorProduct.vendorId;
                vendorPayments.paymentItemId = payItem.paymentItemId;
                vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                vendorPayments.amount = orderProduct[i].total;
                if (vendorProduct.vendorProductCommission > 0) {
                    vendorPayments.commissionAmount = orderProduct[i].total * (vendorProduct.vendorProductCommission / 100);
                    // vendorPayments.commissionAmount = vendorProduct.vendorProductCommission;
                } else if (vendor.commission  > 0) {
                    vendorPayments.commissionAmount = orderProduct[i].total * (vendor.commission / 100);
                    // vendorPayments.commissionAmount = vendor.commission;
                } else  {
                    const defaultCommission = await this.vendorGlobalSettingService.findOne();
                    const defCommission = defaultCommission.defaultCommission;
                    vendorPayments.commissionAmount = orderProduct[i].total * (defCommission / 100);
                    // vendorPayments.commissionAmount = defCommission;
                }
                await this.vendorPaymentService.create(vendorPayments);
            }
        }
        if (orderSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Payment Status',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Payment Status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    //  update shipping information API
    /**
     * @api {post} /api/order/update-shipping-information   update shipping information API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
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
     * @apiSampleRequest /api/order/update-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/update-shipping-information')
    @Authorized()
    public async updateShippingInformation(@BodyParam('orderId') orderId: number, @BodyParam('trackingUrl') trackingUrl: string, @BodyParam('trackingNo') trackingNo: string, @Res() response: any): Promise<any> {
        const updateOrder = await this.orderService.findOrder(orderId);
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
        const orderSave = await this.orderService.create(updateOrder);
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

    //  Update Order Product Shipping Information API
    /**
     * @api {post} /api/order/update-order-product-shipping-information   update order product shipping information API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "orderProductId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-order-product-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/update-order-product-shipping-information')
    @Authorized()
    public async updateOrderProductShippingInformation(@BodyParam('orderProductId') orderProductId: number, @BodyParam('trackingUrl') trackingUrl: string, @BodyParam('trackingNo') trackingNo: string, @Res() response: any): Promise<any> {
        const updateOrderProduct = await this.orderProductService.findOne(orderProductId);
        if (!updateOrderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid order product Id',
            };
            return response.status(400).send(errorResponse);
        }
        updateOrderProduct.trackingUrl = trackingUrl;
        updateOrderProduct.trackingNo = trackingNo;
        const orderProductSave = await this.orderProductService.createData(updateOrderProduct);
        if (orderProductSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Shipping Information',
                data: orderProductSave,
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

    // update Order Product Status API
    /**
     * @api {put} /api/order/update-order-product-status/:orderProductId Update Order Product Status API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderStatusId OrderStatus orderStatusId
     * @apiParamExample {json} Input
     * {
     *      "orderStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderProductStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/update-order-product-status/:orderProductId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-order-product-status/:orderProductId')
    @Authorized()
    public async updateOrderProductStatus(@Param('orderProductId') orderProductId: number, @BodyParam('orderStatusId') orderStatusId: number, @Res() response: any): Promise<any> {
        const orderProductStatus = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProductStatus) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid orderProductId',
            };
            return response.status(400).send(errorResponse);
        }
        orderProductStatus.orderStatusId = orderStatusId;
        const orderProductStatusUpdate = await this.orderProductService.update(orderProductStatus.orderProductId, orderProductStatus);
        const orderProductLog = new OrderProductLog();
        orderProductLog.model = orderProductStatusUpdate.model;
        orderProductLog.name = orderProductStatusUpdate.name;
        orderProductLog.orderId = orderProductStatusUpdate.orderId;
        orderProductLog.orderProductId = orderProductStatusUpdate.orderProductId;
        orderProductLog.orderStatusId = orderProductStatusUpdate.orderStatusId;
        orderProductLog.productId = orderProductStatusUpdate.productId;
        orderProductLog.productPrice = orderProductStatusUpdate.productPrice;
        orderProductLog.quantity = orderProductStatusUpdate.quantity;
        orderProductLog.total = orderProductStatusUpdate.total;
        orderProductLog.trace = orderProductStatusUpdate.trace;
        orderProductLog.tax = orderProductStatusUpdate.tax;
        orderProductLog.trackingNo = orderProductStatusUpdate.trackingNo;
        orderProductLog.trackingUrl = orderProductStatusUpdate.trackingUrl;
        orderProductLog.isActive = orderProductStatusUpdate.isActive;
        await this.orderProductLogService.create(orderProductLog);
        if (orderProductStatusUpdate !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the order status.',
                data: orderProductStatusUpdate,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to update OrderProductStatus.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // order product log List API
    /**
     * @api {get} /api/order/order-product-log-list Order Product Log List API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order product log list",
     *      "data":{
     *      "orderProductLogId" : "",
     *      "orderProductId" : "",
     *      "productId" : "",
     *      "orderId" : "",
     *      "name" : "",
     *      "model" : "",
     *      "quantity" : "",
     *      "trace" : "",
     *      "total" : "",
     *      "tax" : "",
     *      "orderStatusId" : "",
     *      "trackingUrl" : "",
     *      "trackingNo" : "",
     *      "isActive" : "",
     *      "createdDate" : "",
     *      "modifiedDate" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/order/order-product-log-list
     * @apiErrorExample {json} orderProductLog error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/order-product-log-list')
    @Authorized()
    public async orderProductLogList(@QueryParam('orderProductId') orderProductId: number, @Res() response: any): Promise<any> {
        const select = ['orderProductLogId', 'orderProductId', 'productId', 'orderId', 'name', 'model', 'quantity', 'trace', 'total', 'tax', 'orderStatusId', 'trackingUrl', 'trackingNo', 'isActive', 'createdDate', 'modifiedDate'];
        // const search = [];
        const relation = [];
        const WhereConditions = [
            {
                name: 'orderProductId',
                op: 'where',
                value: orderProductId,
            },
        ];
        const orderProductList = await this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
        console.log(orderProductList + 'orderProductList');
        // const orderStatus = orderList.map(async (value: any) => {
        //     const status = await this.orderStatusService.findOne({
        //         where: { orderStatusId: value.orderStatusId },
        //         select: ['orderStatusId', 'name', 'colorCode'],
        //     });
        //     const temp: any = value;
        //     temp.orderStatusName = status.name;
        //     temp.orderStatusColorCode = status.colorCode;
        //     return temp;

        // });
        // const results = await Promise.all(orderStatus);
        // const user = results;
        // console.log(user + 'results');
        const orderStatuss = await this.orderStatusService.findAll({select: ['orderStatusId', 'name'], where: {isActive: 1}});
        console.log(orderStatuss + 'results');
        const orderProduct = orderStatuss.map(async (value: any) => {
            console.log(value.orderStatusId + 'orderStatusId');
            const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
            console.log(user + 'user');
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
               temp.createdDate = user.createdDate;
            }
           return temp;
        });
        const result = await Promise.all(orderProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete Order Product Log list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

}
