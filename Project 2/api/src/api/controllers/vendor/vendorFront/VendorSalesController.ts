/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Get, Authorized, QueryParam, Req, Res} from 'routing-controllers';
import {OrderProductService} from '../../../services/OrderProductService';
import {ProductImageService} from '../../../services/ProductImageService';
import {ProductService} from '../../../services/ProductService';
import {VendorProductService} from '../../../services/VendorProductService';
import {VendorOrdersService} from '../../../services/VendorOrderService';
import {OrderService} from '../../../services/OrderService';
import {VendorPaymentService} from '../../../services/VendorPaymentService';
import * as fs from 'fs';

@JsonController('/vendor-sales')
export class VendorOrderController {
    constructor(  private productImageService: ProductImageService,
                  private productService: ProductService,
                  private vendorProductService: VendorProductService,
                  private vendorOrdersService: VendorOrdersService,
                  private vendorPaymentService: VendorPaymentService,
                  private orderService: OrderService,
                  private orderProductService: OrderProductService
        ) {
    }

      // Payment List API
    /**
     * @api {get} /api/vendor-sales/payment-list  Payment list API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment list",
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
     * @apiSampleRequest /api/vendor-sales/payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/payment-list')
    @Authorized('vendor')
    public async paymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        // const select = ['customer_user_id', 'MAX(id) as id'];

        const select = [
            'VendorPayment.vendorPaymentId as vendorPaymentId',
            'VendorPayment.vendorOrderId as vendorOrderId',
            'vendorOrders.subOrderId as subOrderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'VendorPayment.createdDate as createdDate',
            'VendorPayment.amount as amount',
            'VendorPayment.commissionAmount as commissionAmount',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderStatusColorCode',
            ];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.order',
                aliasName: 'order',
            },
            {
                tableName: 'vendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPayment.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

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
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['order.shippingFirstname' , 'vendorOrders.subOrderId' ],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'VendorPayment.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const temp: any = value;
            temp.NetAmount = value.amount - value.commissionAmount;
            return temp;
        });
        const paymentListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

     // Vendor Earings List API
    /**
     * @api {get} /api/vendor-sales/vendor-earning-list Vendor Earning List API
     * @apiGroup  Vendor Sales
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
     *      "message": "Successfully get your product earnings list",
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
     * @apiSampleRequest /api/vendor-sales/vendor-earning-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-earning-list')
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
        temp.productImage = defaultValue;
        const orderProduct = await this.orderProductService.getEarnings(value.productId);
        const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(value.productId, request.user.vendorId);
        if (vendorOrder !== undefined) {
            let total = 0;
            for (const val of vendorOrder) {
                const commissionPercent = val.commission;
                const commissionAmount = val.total * (commissionPercent / 100);
                const NetAmount = val.total - commissionAmount;
                total += +NetAmount;
            }
            temp.totalRevenue = total;
        }
        if (orderProduct !== undefined) {
            temp.soldCount = orderProduct.quantityCount;
        } else {
            temp.soldCount = 0;
        }
        return temp;
    });
       const results = await Promise.all(productList);

       const successResponse: any = {
        status: 1,
        message: 'Successfully got your product Earnings list.',
        data: results,
       };
       return response.status(200).send(successResponse);
    }

    // Vendor Earning Export Download
    /**
     * @api {get} /api/vendor-sales/earning-export Vendor Earning Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor earning List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/earning-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/earning-export')
    public async earningExport(@QueryParam('vendorId') vendorId: number, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(vendorId + 'vendorId');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Earning export detail');
        const rows = [];
        const dataId = await this.vendorProductService.find({where: {vendorId}});
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'No data found',
                };
                return response.status(400).send(errorResponse);
            }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'id', size: 16, width: 15 },
            { header: 'Product Name', key: 'product_name', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'Sold', key: 'Sold' , size: 16, width: 24 },
            { header: 'Buyers', key: 'Buyers', size: 16, width: 15 },
            { header: 'Revenue', key: 'Revenue', size: 16, width: 15 },
            ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        const vendorProducts = await this.vendorProductService.find({where: {vendorId}});
        for ( const vendorProduct of vendorProducts ) {
            const productValue = await this.productService.findOne({
                select: ['productId', 'name', 'sku'],
                where: {
                    productId: vendorProduct.productId,
                },
            });
        const orderProduct = await this.orderProductService.getEarnings(vendorProduct.productId);
        const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(vendorProduct.productId, vendorId);
        let total = 0;
        if (vendorOrder !== undefined) {
            for (const val of vendorOrder) {
                const commissionPercent = val.commission;
                const commissionAmount = val.total * (commissionPercent / 100);
                const NetAmount = val.total - commissionAmount;
                total += +NetAmount;
            }
        }
        const totalRevenue = total;
        rows.push([productValue.productId, productValue.name , productValue.sku, orderProduct.quantityCount , orderProduct.buyerCount, totalRevenue ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorEarningExcel_' + Date.now() + '.xlsx';
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

    // recent sales export Download
    /**
     * @api {get} /api/vendor-sales/sales-export Sales list Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor sales List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/sales-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/sales-export')
    public async salesExport(@QueryParam('vendorId') vendorId: number, @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(vendorId + 'vendorId');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sales export detail');
        const rows = [];
        const dataId = await this.vendorOrdersService.searchOrderList(vendorId, '', startDate, endDate, '', 1);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'No data found',
                };
                return response.status(400).send(errorResponse);
            }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'paidDate', key: 'paidDate', size: 16, width: 15 },
            { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
            { header: 'CustomerAddress', key: 'CustomerAdress' , size: 16, width: 24 },
            { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
            { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
            ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        const vendorOrders: any = await this.vendorOrdersService.searchOrderList(vendorId, '', startDate, endDate, '', 1);
        for ( const vendorProduct of vendorOrders ) {
            const defCommission = vendorProduct.commission;
            const commissionAmount = vendorProduct.total * (defCommission / 100);
            rows.push([vendorProduct.subOrderId, vendorProduct.date , vendorProduct.customerFirstName, vendorProduct.shippingCity + ' , ' + vendorProduct.shippingCountry, vendorProduct.total,  commissionAmount ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './SalesExcel_' + Date.now() + '.xlsx';
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

    // payment Counts
    /**
     * @api {get} /api/vendor-sales/payment-counts payment counts
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment counts",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/payment-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/payment-counts')
    @Authorized('vendor')
    public async salesCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const salesCount = await this.vendorPaymentService.getSalesCount(request.user.vendorId);
        // without login
        const WhereConditions = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
            ];
        const buyerList = await this.vendorPaymentService.list(0, 0, [], [], WhereConditions, 0);
        let withoutLoginCount = 0;
        for (const list of buyerList) {
            const vendorOrder = await this.vendorOrdersService.findOne({where: {vendorOrderId: list.vendorOrderId}});
            const order = await this.orderService.findOrder({where: {orderId: vendorOrder.orderId}});
            if (order.customerId === 0) {
                withoutLoginCount += +1;
            }
        }
        // with login
        let value;
        const buyerCount = await this.vendorPaymentService.getBuyerCount(request.user.vendorId);
        if (buyerCount) {
             value = buyerCount.buyerCount;
        }
        const buyerCountValue = +withoutLoginCount + (+value);
        const revenue = await this.vendorPaymentService.getTotalVendorRevenue(request.user.vendorId);
        let total = 0;
        if (revenue !== undefined) {
            for (const val of revenue) {
                const NetAmount = val.amount - val.commissionAmount;
                total += +NetAmount;
            }
        }
        const totalRevenue = total;
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today order count',
            data: {
                buyersCount: buyerCountValue,
                salesCount: salesCount.salesCount,
                revenue: totalRevenue,
            },
        };
        return response.status(200).send(successResponse);

    }

    // vendor sales export Download
    /**
     * @api {get} /api/vendor-sales/vendor-sales-export Vendor sales list Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {String} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor sales List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/vendor-sales-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/vendor-sales-export')
    public async vendorSalesExport(@QueryParam('vendorOrderId') vendorOrderId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor sales export detail');
        const rows = [];
        const splitOrder = vendorOrderId.split(',');
        console.log('SPLITORDER' + splitOrder);
        for (const data of splitOrder) {
            const value = parseInt(data, 10);
            console.log('VALUE' + value);
            console.log('VALUETYPE' + typeof value);
            const dataId = await this.vendorOrdersService.searchOrderListt(value, 1);
            console.log('DATAID' + dataId.vendorOrderId);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'No data found',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'paidDate', key: 'paidDate', size: 16, width: 15 },
            { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
            { header: 'CustomerAddress', key: 'CustomerAdress' , size: 16, width: 24 },
            { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
            { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
            ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        const arr: any = [];
        for (const record of splitOrder) {
            const val = parseInt(record, 10);
            const vendorOrders: any = await this.vendorOrdersService.searchOrderListt(val, 1);
            arr.push(vendorOrders);
        }
        for ( const vendorProduct of arr ) {
            const defCommission = vendorProduct.commission;
            const commissionAmount = vendorProduct.total * (defCommission / 100);
            rows.push([vendorProduct.subOrderId, vendorProduct.date , vendorProduct.customerFirstName, vendorProduct.shippingCity + ' , ' + vendorProduct.shippingCountry, vendorProduct.total,  commissionAmount ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorSalesExcel_' + Date.now() + '.xlsx';
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

    // Vendor Product Earning Export Download
    /**
     * @api {get} /api/vendor-sales/product-earning-export Vendor Product Earning Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor product earning List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/product-earning-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/product-earning-export')
    public async productEarningExport(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product earning export detail');
        const rows = [];
        const splitProduct = productId.split(',');
        console.log('SPLITPRODUCT' + splitProduct);
        for (const record of splitProduct) {
            console.log('RECORD' + record);
            const dataId = await this.vendorProductService.find({where: {productId: record}});
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Product not found',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'id', size: 16, width: 15 },
            { header: 'Product Name', key: 'product_name', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'Sold', key: 'Sold' , size: 16, width: 24 },
            { header: 'Buyers', key: 'Buyers', size: 16, width: 15 },
            { header: 'Revenue', key: 'Revenue', size: 16, width: 15 },
            ];
        worksheet.getCell('A1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('B1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('C1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('D1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('E1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        worksheet.getCell('F1').border = { top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        const arr: any = [];
        for (const data of splitProduct) {
            const vendorProducts = await this.vendorProductService.findOne({where: {productId: data}});
            arr.push(vendorProducts);
        }
        for ( const vendorProduct of arr ) {
            const productValue = await this.productService.findOne({
                select: ['productId', 'name', 'sku'],
                where: {
                    productId: vendorProduct.productId,
                },
            });
        const orderProduct = await this.orderProductService.getEarnings(vendorProduct.productId);
        const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(vendorProduct.productId, vendorProduct.vendorId);
        let total = 0;
        if (vendorOrder !== undefined) {
            for (const val of vendorOrder) {
                const commissionPercent = val.commission;
                const commissionAmount = val.total * (commissionPercent / 100);
                const NetAmount = val.total - commissionAmount;
                total += +NetAmount;
            }
        }
        const totalRevenue = total;
        rows.push([productValue.productId, productValue.name , productValue.sku, orderProduct.orderCount , orderProduct.buyerCount, totalRevenue ]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorProductEarningExcel_' + Date.now() + '.xlsx';
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
