/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Get, QueryParam, Authorized, Req, Put, Param, BodyParam} from 'routing-controllers';
import {VendorOrdersService} from '../../services/VendorOrderService';
import {OrderService} from '../../services/OrderService';
import {ProductService} from '../../services/ProductService';
import {ProductImageService} from '../../services/ProductImageService';
import {OrderProductService} from '../../services/OrderProductService';
import {VendorOrderStatusService} from '../../services/VendorOrderStatusService';
import {OrderStatusService} from '../../services/OrderStatusService';
import {VendorOrderLogService} from '../../services/VendorOrderLogService';
import { PdfService } from '../../services/PdfService';
import {CountryService} from '../../services/CountryService';
import {ZoneService} from '../../services/zoneService';
import {S3Service} from '../../services/S3Service';
import {ImageService} from '../../services/ImageService';
import { SettingService } from '../../services/SettingService';
import {env} from '../../../env';
import { VendorService } from '../../services/VendorService';
import { VendorPaymentService } from '../../services/VendorPaymentService';
import * as fs from 'fs';

@JsonController('/admin-vendor-payment')
export class VendorPaymentController {
    constructor( private vendorOrdersService: VendorOrdersService,
                 private orderService: OrderService,
                 private orderProductService: OrderProductService,
                 private productService: ProductService,
                 private productImageService: ProductImageService,
                 private vendorOrderStatusService: VendorOrderStatusService,
                 private vendorOrderLogService: VendorOrderLogService,
                 private orderStatusService: OrderStatusService,
                 private pdfService: PdfService,
                 private countryService: CountryService,
                 private zoneService: ZoneService,
                 private settingService: SettingService,
                 private s3Service: S3Service,
                 private imageService: ImageService,
                 private vendorPaymentService: VendorPaymentService,
                 private vendorService: VendorService
        ) {
    }

   // Payment List API
    /**
     * @api {get} /api/admin-vendor-payment/payment-list Payment List API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/admin-vendor-payment/payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/payment-list')
    @Authorized()
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                           @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
            ];
        const groupBy = [
            {
                name: 'vendorOrders.order_id',
            },
        ];

        const whereConditions = [];

        // whereConditions.push({
        //     name: 'orderDetail.payment_flag',
        //     op: 'and',
        //     value: 1,
        // });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }

        const searchConditions = [];
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const paymentList: any = await this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], false, true);

        const paymentResponse = paymentList.map(async (value: any) => {
            const payment = value;
            const subOrderSelect = [
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.quantity as quantity',
                'vendorOrders.total as total',
                'vendorOrders.subOrderId as subOrderId',
                'vendorOrders.commission as commission',
                'vendor.companyName as companyName',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
            ];

            const subOrderRelations = [
                {
                    tableName: 'VendorPayment.vendorOrders',
                    aliasName: 'vendorOrders',
                },
                {
                    tableName: 'vendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'vendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'vendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'orderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
            ];
            const subOrderWhereConditions = [
                {
                    name: 'vendorOrders.order_id',
                    op: 'where',
                    value: value.orderId,
                },
            ];
            const vendorOrderList: any = await this.vendorPaymentService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            let commission = 0;
            let total = 0;
            console.log('vendorOrderList', vendorOrderList);
            payment.subOrderDetails = vendorOrderList;
            // vendorOrderList.forEach(element => {
            //     console.log('element.commission', element.commission);
            //     console.log('element.total', element.total);
            //     total += Number(element.total);
            //     const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
            //     const commissionAmount = element.total * (commissionPercentage / 100);
            //     console.log('commissionAmount', commissionAmount);
            //     commission += Number(commissionAmount);
            //     console.log('commission', commission);
            // });
            const val = vendorOrderList.map(async (element: any) => {
                const temp = element;
                console.log('element.commission', element.commission);
                console.log('element.total', element.total);
                total += Number(element.total);
                const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                // const productCost = (element.vendorProductCost && element.vendorProductCost > 0) ? element.vendorProductCost : 0;
                const commissionAmount = element.total * (commissionPercentage / 100);
                // const commissionAmount = productCost * (commissionPercentage / 100);
                console.log('commissionAmount', commissionAmount);
                commission += Number(commissionAmount);
                console.log('commission', commission);
                temp.commissionAmount = commissionAmount;
                return temp;
            });
            const product =  await Promise.all(val);
            payment.subOrderDetails = product;
            payment.commissionAmount = commission;
            payment.total = total;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Payment List Count API
    /**
     * @api {get} /api/admin-vendor-payment/payment-list-count Payment List Count API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/admin-vendor-payment/payment-list-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/payment-list-count')
    @Authorized()
    public async paymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                  @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'orderDetail.orderId as orderId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.total as total',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails',
            'orderDetail.customerId as customerId',
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [
            {
                name: 'vendorOrders.order_id',
            },
        ];

        const whereConditions = [];

        // whereConditions.push({
        //     name: 'orderDetail.payment_flag',
        //     op: 'and',
        //     value: 1,
        // });

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
        if (customerName && customerName !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: customerName.toLowerCase(),
            });
        }

        const paymentList: any = await this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], true, true);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
    }

     //  Payment Detail API
    /**
     * @api {get} /api/admin-vendor-payment/payment-detail  Payment Detail API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Payment Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Payment Detail Function
    @Get('/payment-detail')
    @Authorized()
    public async paymentDetail(@QueryParam('orderId') orderId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'orderProduct.quantity as quantity',
            'orderProduct.name as name',
            'orderProduct.productPrice as price',
            'VendorOrders.total as total',
            'VendorOrders.commission as commission',
            'vendor.companyName as companyName',
        ];

        const relations = [
            {
                tableName: 'VendorOrders.orderProduct',
                aliasName: 'orderProduct',
            },
            {
                tableName: 'VendorOrders.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'orderProduct.productInformationDetail',
                aliasName: 'productInformationDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorOrders.order_id',
            op: 'and',
            value: orderId,
        });

        const searchConditions = [];

        const paymentList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
    }

    //  Payment Dashboard Count API
    /**
     * @api {get} /api/admin-vendor-payment/payment-dashboard-count  Payment Dashboard Count API
     * @apiGroup Admin Vendor Payment
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Payment Dashboard..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-payment/payment-dashboard-count
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Payment Detail Function
    @Get('/payment-dashboard-count')
    @Authorized()
    public async paymentDashboardCount(@Req() request: any, @Res() response: any): Promise<any> {
        let select = [
            'SUM(VendorPayment.amount) as totalAmount',
            'SUM(VendorPayment.commissionAmount) as totalCommission',
        ];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        // whereConditions.push({
        //     name: 'orderDetail.payment_flag',
        //     op: 'and',
        //     value: 1,
        // });

        const searchConditions = [];
        const params: any = {};
        params.totalAmount = 0;
        params.totalCommission = 0;
        params.totalOrders = 0;
        params.totalVendor = 0;

        const paymentTotalAmountCount: any = await this.vendorPaymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
        if (paymentTotalAmountCount && paymentTotalAmountCount.length > 0) {
            params.totalAmount = paymentTotalAmountCount[0].totalAmount;
            params.totalCommission = paymentTotalAmountCount[0].totalCommission;
        }
        select = [
            'count(vendorOrders.order_id) as totalOrders',
        ];
        const subRelations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
        ];
        groupBy.push({
            name: 'vendorOrders.order_id',
        });
        const paymentTotalCount: any = await this.vendorPaymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, subRelations, groupBy, [], false, true);
        if (paymentTotalCount && paymentTotalCount.length > 0) {
            paymentTotalCount.forEach(element => {
                params.totalOrders += Number(element.totalOrders);
            });
        }
        const vendorListCount = await this.vendorService.vendorList(0, 0, [], [], [], true);
        params.totalVendor = vendorListCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: params,
        };
        return response.status(200).send(successResponse);
    }

    // vendor order log List API
    /**
     * @api {get} /api/admin-vendor-order/vendor-order-log-list Vendor Order Log List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor order log list",
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
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-log-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-order-log-list')
    @Authorized()
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

      // Make Archive/revoke  API
    /**
     * @api {put} /api/admin-vendor-order/make-archive/:orderId Make Archive/revoke API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} archiveFlag archive flag should should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "archiveFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully .",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/make-archive/:orderId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('make-archive/:orderId')
    @Authorized()
    public async makeArchive(@Param('orderId') orderId: number, @BodyParam('archiveFlag') archiveFlag: number, @Req() request: any , @Res() response: any): Promise<any> {

        const order = await this.orderService.findOne({
            where: {
                orderId,
            },
        });
        if (!order) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid orderId',
            };
            return response.status(400).send(errorResponse);
        }
        // TODO: Jalal disabled this line due to unclear functionality
        // order.makeArchive = archiveFlag;
        const orderSave = await this.orderService.create(order);
        if (archiveFlag === 0) {
                const sucResponse: any = {
                    status: 1,
                    message: 'Successfully Revoked this order ',
                    data: orderSave,
                };
                return response.status(200).send(sucResponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Archived this product. ',
                data: orderSave,
            };
            return response.status(200).send(successResponse);
        }
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/admin-vendor-order/order-export-pdf  Order Export PDF API
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
     * @apiSampleRequest /api/admin-vendor-order/order-export-pdf
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
        orderData.productList = await this.vendorOrdersService.findAll({ where: { orderId: orderid }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total'] }).then((val) => {
            console.log(val);
            const productVal = val.map(async (value: any) => {
                const vendorOrderProduct = await this.orderProductService.findOne({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice'], where: { orderProductId: value.orderProductId} });
                // const list: any = [];
                const productImage = await this.productImageService.findOne({
                    where: { productId: vendorOrderProduct.productId, defaultImage: 1 },
                    select: [ 'image', 'containerName'],
                });
                const productDetail = await this.productService.findOne({
                    where: { productId: vendorOrderProduct.productId },
                    select: ['sku'],
                });
                const obj: any = {};
                obj.productId = vendorOrderProduct.productId;
                obj.name = vendorOrderProduct.name;
                obj.quantity = vendorOrderProduct.quantity;
                obj.total = vendorOrderProduct.total;
                obj.productPrice = vendorOrderProduct.productPrice;
                obj.image = productImage.image;
                obj.containerName = productImage.containerName;
                obj.sku = productDetail.sku;
                return obj;
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
        orderData.zoneData = zoneData;
        orderData.countryData = countryData;
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
    }

    // Vendor order payment export
    /**
     * @api {get} /api/admin-vendor-payment/vendor-order-payment-export Admin vendor order payment export
     * @apiGroup Admin Vendor Payment
     * @apiParam (Request body) {String} orderId orderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor order payment List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-payment/vendor-order-payment-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-order-payment-export')
    public async vendorOrderPaymentExport(@QueryParam('orderId') orderId: string, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor order payment export detail');
        const rows = [];
        const splitOrder = orderId.split(',');
        // Excel sheet column define
        worksheet.columns = [
            { header: 'orderId', key: 'orderId', size: 16, width: 15 },
            { header: 'customerName', key: 'customerName', size: 16, width: 15 },
            { header: 'paymentDate', key: 'paymentDate', size: 16, width: 15 },
            { header: 'paymentDetail', key: 'paymentDetail' , size: 16, width: 24 },
            { header: 'paymentMethod', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'amount', key: 'amount', size: 16, width: 15 },
            { header: 'commissionAmount', key: 'commissionAmount', size: 16, width: 15 },
            { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('G1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('H1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        for (const record of splitOrder) {
            const val = parseInt(record, 10);
            const subOrderSelect = [
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.quantity as quantity',
                'VendorOrders.total as total',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.commission as commission',
                'vendor.companyName as companyName',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
            ];

            const subOrderRelations = [
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'orderProduct.productInformationDetail',
                    aliasName: 'productInformationDetail',
                },
            ];
            const subOrderWhereConditions = [
                {
                    name: 'VendorOrders.order_id',
                    op: 'where',
                    value: val,
                },
            ];
            const vendorOrderList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            let commission = 0;
            let total = 0;
            console.log('vendorOrderList', vendorOrderList);
            vendorOrderList.forEach(element => {
                console.log('element.commission', element.commission);
                console.log('element.total', element.total);
                total += Number(element.total);
                const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                const commissionAmt = element.total * (commissionPercentage / 100);
                console.log('commissionAmt', commissionAmt);
                commission += Number(commissionAmt);
                console.log('commission', commission);
            });
            const commissionAmount = commission;
            const totalAmount = total;
            const netAmount = totalAmount - commissionAmount;
            console.log(netAmount + 'netAmountttttt');
            const orderData = await this.orderService.findOrder({
                where: { orderId: val }, select: ['orderId', 'shippingFirstname', 'orderPrefixId', 'paymentType', 'paymentDetails', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            rows.push([orderData.orderPrefixId, orderData.shippingFirstname , orderData.createdDate, orderData.paymentDetails, orderData.paymentType, totalAmount, commissionAmount, netAmount ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorOrderPaymentExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new  Promise( (resolve, reject) => {
            response.download( fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

     // Export Bulk Order Payment List API
    /**
     * @api {get} /api/admin-vendor-payment/export-bulk-order-payment-list Export Bulk Order Payment List API
     * @apiGroup Admin Vendor Payment
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully export payment list",
     *      "data": "{}",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-payment/export-bulk-order-payment-list
     * @apiErrorExample {json} Export error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/export-bulk-order-payment-list')
    public async exportBulkOrderPaymentList(@Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor Order Payment List');
        const rows = [];
        const select = [
            'orderDetail.orderId as orderId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.shippingFirstname as shippingFirstname',
            'orderDetail.createdDate as createdDate',
            'orderDetail.paymentType as paymentType',
            'orderDetail.paymentDetails as paymentDetails' ];

        const relations = [
            {
                tableName: 'VendorOrders.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [
            {
                name: 'VendorOrders.order_id',
            },
        ];

        const whereConditions = [];

        whereConditions.push({
            name: 'orderDetail.payment_flag',
            op: 'and',
            value: 1,
        });

        const searchConditions = [];
        const paymentList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, [], false, true);
        const paymentResponse = paymentList.map(async (value: any) => {
            const payment = value;
            const subOrderSelect = [
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'VendorOrders.orderId as orderId',
            ];

            const subOrderRelations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },

            ];
            const subOrderWhereConditions = [
                {
                    name: 'VendorOrders.order_id',
                    op: 'where',
                    value: value.orderId,
                },
            ];
            const vendorOrderList: any = await this.vendorOrdersService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            let commission = 0;
            let total = 0;
            // let netAmount;
            console.log('vendorOrderList', vendorOrderList);
            payment.subOrderDetails = vendorOrderList;
            vendorOrderList.forEach(element => {
                total += Number(element.total);
                const commissionPercentage = (element.commission && element.commission > 0) ? element.commission : 0;
                const commissionAmount = element.total * (commissionPercentage / 100);
                commission += Number(commissionAmount);
            });
            payment.commissionAmount = commission;
            payment.total = total;
            payment.netAmount =  total - commission;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);
        worksheet.columns = [
            { header: 'OrderId', key: 'orderId', size: 16, width: 15 },
            { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
            { header: 'PaymentDate', key: 'paymentDate', size: 16, width: 15 },
            { header: 'PaymentDetail', key: 'paymentDetail' , size: 16, width: 24 },
            { header: 'PaymentMethod', key: 'paymentMethod', size: 16, width: 15 },
            { header: 'TotalAmount', key: 'totalAmount', size: 16, width: 15 },
            { header: 'CommissionAmount', key: 'commissionAmount', size: 16, width: 15 },
            { header: 'NetAmount', key: 'netAmount', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('G1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('H1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        const arr: any = [];
        for ( const data of paymentListDetails ) {
            arr.push(data);
        }
        for ( const vendorProduct of arr ) {
            rows.push([vendorProduct.orderPrefixId, vendorProduct.shippingFirstname , vendorProduct.createdDate, vendorProduct.paymentDetails, vendorProduct.paymentMethod, vendorProduct.total, vendorProduct.commissionAmount, vendorProduct.netAmount ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorBulkOrderPaymentExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new  Promise( (resolve, reject) => {
            response.download( fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
}
