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
import {VendorService} from '../../services/VendorService';
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

@JsonController('/admin-vendor-order')
export class VendorOrderController {
    constructor( private vendorOrdersService: VendorOrdersService,
                 private orderService: OrderService,
                 private orderProductService: OrderProductService,
                 private vendorService: VendorService,
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
                 private imageService: ImageService
        ) {
    }

   // order List API
    /**
     * @api {get} /api/admin-vendor-order/order-list Order List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
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
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/order-list')
    @Authorized()
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                           @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'orderDetail.customerId as customerId',
            'orderDetail.createdDate as createdDate',
            'orderDetail.orderId as orderId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.orderStatusId as orderStatusId',
            'orderDetail.shippingFirstname as shippingFirstName',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.shippingCountry as shippingCountry'];

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
                name: ['shipping_firstname'  ],
                value: customerName.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'orderDetail.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
            const vendorOrders = await this.vendorOrdersService.findAll({
                where: { orderId: value.orderId },
            });
            const vendorCount = await this.vendorOrdersService.findVendorCount(value.orderId);
            const temp: any = value;
            temp.orderStatus = status;
            temp.productCount = vendorOrders.length;
            temp.vendorCount = vendorCount.vendorCount;
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
     * @api {get} /api/admin-vendor-order/order-detail  Order Detail API
     * @apiGroup Admin Vendor Order
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
     * @apiSampleRequest /api/admin-vendor-order/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized()
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'email', 'telephone', 'invoiceNo', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight',  'paymentStatus', 'paymentFlag'],
        });
        orderData.productList = await this.vendorOrdersService.findAll({ where: { orderId: orderid }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total'] }).then((val) => {
            console.log(val);
            const productVal = val.map(async (value: any) => {
                const vendor = await this.vendorService.findOne({
                    where: { vendorId: value.vendorId },
                    select: ['customerId', 'companyName', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'shippingCountryId'],
                });
                const vendorOrderProduct = await this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total'], where: { orderProductId: value.orderProductId} });
                const list: any = [];
                for (const product of vendorOrderProduct) {
                    const productImage = await this.productImageService.findOne({
                        where: { productId: product.productId, defaultImage: 1 },
                        select: [ 'image', 'containerName'],
                    });
                    const productDetail = await this.productService.findOne({
                        where: { productId: product.productId },
                        select: ['sku'],
                    });
                    const obj: any = {};
                    obj.productId = product.productId;
                    obj.name = product.name;
                    obj.quantity = product.quantity;
                    obj.total = product.total;
                    obj.image = productImage.image;
                    obj.containerName = productImage.containerName;
                    obj.sku = productDetail.sku;
                    list.push(obj);

                }
                const tempVal: any = value;
                tempVal.companyName = vendor.companyName;
                tempVal.companyAddress1 = vendor.companyAddress1;
                tempVal.companyAddress2 = vendor.companyAddress2;
                tempVal.companyCity = vendor.companyCity;
                tempVal.companyState = vendor.companyState;
                let total = 0 ;
                for (const id of vendorOrderProduct) {
                    const OrderProductTotal = await this.orderProductService.findOne({select: ['total'], where: { orderProductId: id.orderProductId}});
                    total += +OrderProductTotal.total;
                }
                const subOrderStatus = await this.vendorOrderStatusService.findOne({
                    where: { vendorOrderStatusId: value.subOrderStatusId },
                    select: [ 'name', 'colorCode'],
                });
                if (subOrderStatus) {
                tempVal.subOrderStatusName = subOrderStatus.name;
                tempVal.subOrderStatusColorCode = subOrderStatus.colorCode;
                }
                tempVal.vendorOrderTotal = total;
                tempVal.vendorProductList = list;
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
        const productData = orderData.productList;
        // for getting total vendor product amount per order
        let ttl = 0 ;
        for (const id of productData) {
        const OrderProductTotal = await this.orderProductService.findOne({select: ['total'], where: { orderProductId: id.orderProductId}});
        ttl += +OrderProductTotal.total;
        }
        orderData.total = ttl ;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: orderData,
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
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ' ;
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
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
}
