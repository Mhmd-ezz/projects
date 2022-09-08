/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import * as express from 'express';
import {getManager} from 'typeorm';
import {Order} from '../../api/models/Order';
import {Plugins} from '../models/Plugin';
import {RazorpayOrder} from '../models/RazorpayOrder';
import {RazorpayOrderTransaction} from '../models/RazorpayOrderTransaction';
import {OrderProduct} from '../../api/models/OrderProduct';
import {EmailTemplate} from '../../api/models/EmailTemplate';
import {OrderOption} from '../../api/models/OrderOption';
import {Product} from '../../api/models/ProductModel';
import {ProductImage} from '../../api/models/ProductImage';
import {Settings} from '../../api/models/Setting';
import {Currency} from '../../api/models/Currency';
import {User} from '../../api/models/User';
import {MAILService} from '../../auth/mail.services';
import {env} from '../../env';
import {Payment as Payments} from '../../api/models/Payment';
import {PaymentItems} from '../../api/models/PaymentItems';
import {VendorPayment} from '../../api/models/VendorPayment';
import {VendorProducts} from '../../api/models/VendorProducts';
import {Vendor} from '../../api/models/Vendor';
import {VendorGlobalSetting} from '../../api/models/VendorGlobalSettings';
import {VendorOrders} from '../../api/models/VendorOrders';
import moment = require('moment');

export class RazorPayController {

    public static async razorPaySuccess(instance: any, paymentId: any): Promise<any> {
        return new Promise((resolve, reject) => {
            instance.payments.fetch(paymentId).then((response) => {
                console.log('**********Payment instance***********');
                console.log('response', response);
                console.log('**********Payment instance***********');
                return resolve(response);
            }).catch((error) => {
                console.log(error);
                return reject(error);
            });
        });
    }

    constructor() {
        // ---
    }

    public async index(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'razorpay',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        res.render('pages/razorpay/form', {
            title: 'Razorpay',
            clientId: paypalAdditionalInfo.clientId ? paypalAdditionalInfo.clientId : '',
            clientSecret: paypalAdditionalInfo.clientSecret ? paypalAdditionalInfo.clientSecret : '',
            isTest: paypalAdditionalInfo.isTest,
        });
    }

    public async updateSettings(req: express.Request | any, res: express.Response): Promise<any> {
        req.assert('clientId', 'Client Id cannot be blank').notEmpty();
        req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();

        const errors = req.validationErrors();

        console.log(errors);

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('paypal');
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'razorpay',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        paypalAdditionalInfo.clientId = req.body.clientId;
        paypalAdditionalInfo.clientSecret = req.body.clientSecret;
        paypalAdditionalInfo.isTest = req.body.isTest;
        pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
        const saveResponse = await pluginRepository.save(pluginDetail);
        if (saveResponse) {
            req.flash('success', ['Razorpay settings updated successfully']);
            return res.redirect('home');
        }
        req.flash('errors', ['Unable to update the razorpay settings']);
        return res.redirect('home');
    }

    public async process(req: express.Request | any, res: express.Response): Promise<any> {
        const orderPrefixId = req.params.orderPrefixId;
        const orderRepository = getManager().getRepository(Order);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const order = await orderRepository.findOne({where: {orderPrefixId}, select: ['orderId']});
        const orderId = order.orderId;
        const orderDetail = await orderRepository.findOne(orderId);
        if (!orderDetail) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }
       const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'razorpay',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        // res.render('pages/razorpay/process', {
        //     title: 'Razorpay',
        //     orderId,
        //     layout: 'pages/layouts/auth',
        // });
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        // var amount= 2000,
        // currency='INR',
        // receipt = '1234545f4',
        // payment_capture =true,
        // notes ="something",
        console.log(orderDetail.currencyCode);
        const params: any = {
            amount: +orderDetail.total * 100,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        instance.orders.create(params).then((response: any) => {
            // ---
            const paypalParams = new RazorpayOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.razorpayRefId = response.id;
            // paypalParams.total = params.amount.toString();
            paypalParams.total = orderDetail.total.toString();
            paypalParams.status = 0;
            razorpayOrderRepository.save(paypalParams).then((val) => {
                // ---
                res.render('pages/razorpay/process', {
                    title: 'Razorpay',
                    orderRefId: response.id,
                    key: paypalAdditionalInfo.clientId,
                    amount: orderDetail.total,
                    orderId: orderDetail.orderPrefixId,
                    orderIncrementId: orderDetail.orderId,
                    description: val.id,
                    username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                    email: orderDetail.email,
                    contact: orderDetail.telephone,
                    layout: 'pages/layouts/auth',
                });
            }).catch( (err) => {
                console.error(err);
            });
        }).catch((error) => {
            // ---
            console.error(error);
        });
    }

    public async success(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const orderOptionRepository = getManager().getRepository(OrderOption);
        const productImageRepository = getManager().getRepository(ProductImage);
        const productRepository = getManager().getRepository(Product);
        const settingRepository = getManager().getRepository(Settings);
        const currencyRepository = getManager().getRepository(Currency);
        const userRepository = getManager().getRepository(User);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const razorpayOrderTransactionRepository = getManager().getRepository(RazorpayOrderTransaction);
        const paymentRepository = getManager().getRepository(Payments);
        const paymentItemsRepository = getManager().getRepository(PaymentItems);
        const vendorPaymentRepository = getManager().getRepository(VendorPayment);
        const VendorProductsRepository = getManager().getRepository(VendorProducts);
        const VendorRepository = getManager().getRepository(Vendor);
        const VendorGlobalSettingRepository = getManager().getRepository(VendorGlobalSetting);
        const VendorOrdersRepository = getManager().getRepository(VendorOrders);
        const queryParams = req.query;
        console.log(req.query);
        console.log('**********Payment authorized***********');
        console.log(queryParams.razorpay_payment_id);
        console.log('**********Payment authorized***********');
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'razorpay',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        const paymentDetails = await RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
        console.log('paymentDetails', paymentDetails);
        const razorpayDetail = await razorpayOrderRepository.findOne({
            where : {
                razorpayRefId : paymentDetails.order_id,
            },
        });
        if (!razorpayDetail) {
            req.flash('errors', ['Invalid Payment Details']);
            return res.redirect('error');
        }

        const orderRepository = getManager().getRepository(Order);
        const orderData: any = await orderRepository.findOne(razorpayDetail.orderId);
        if (!orderData) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }
        const setting = await settingRepository.findOne();
        const currencySymbol = await currencyRepository.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol.symbolRight;
        orderData.currencyLeft = currencySymbol.symbolLeft;

        const orderStatus = await orderRepository.findOne({where: {orderId: razorpayDetail.orderId, paymentFlag: 1}});
        if (orderStatus) {
            req.flash('errors', ['Already Paid for this Order']);
            return res.redirect('error');
        }

        const intvalue = Math.round(paymentDetails.amount );
        console.log(intvalue + 'intValue');
        console.log(+razorpayDetail.total + 'total');
        const intVal = intvalue / 100;
        console.log(intVal + 'intVal');
        if (paymentDetails.status === 'captured' && intVal  === +razorpayDetail.total) {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = paymentDetails.method;
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 1;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 1;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentType = 'razorpay';
            orderData.paymentDetails = paymentDetails.id;
            await orderRepository.save(orderData);
            const paymentParams = new Payments();
            paymentParams.orderId = razorpayDetail.orderId;
            const date = new Date();
            paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentNumber = paymentDetails.id;
            paymentParams.paymentAmount = orderData.total;
            paymentParams.paymentInformation = JSON.stringify(paymentDetails);
            const payments = await paymentRepository.save(paymentParams);
            const productDetailData = [];
            let i;
            const orderProduct = await orderProductRepository.find({where: {orderId: orderData.orderId}, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice']});
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                const payItem = await paymentItemsRepository.save(paymentItems);
                const vendorProduct = await VendorProductsRepository.findOne({where: {productId: orderProduct[i].productId}});
                if (vendorProduct) {
                    const vendor = await VendorRepository.findOne({where: {vendorId: vendorProduct.vendorId}});
                    const vendorOrders = await VendorOrdersRepository.findOne({where: {vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId}});
                    const vendorPayments = new VendorPayment();
                    vendorPayments.vendorId = vendorProduct.vendorId;
                    vendorPayments.paymentItemId = payItem.paymentItemId;
                    vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                    vendorPayments.amount = orderProduct[i].total;
                    if (vendorProduct.vendorProductCommission > 0) {
                        // vendorPayments.commissionAmount = vendorProduct.vendorProductCommission;
                        vendorPayments.commissionAmount = orderProduct[i].total * (vendorProduct.vendorProductCommission / 100);
                    } else if (vendor.commission  > 0) {
                        // vendorPayments.commissionAmount = vendor.commission;
                        vendorPayments.commissionAmount = orderProduct[i].total * (vendor.commission / 100);
                    } else  {
                        const defaultCommission = await VendorGlobalSettingRepository.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        // vendorPayments.commissionAmount = defCommission;
                        vendorPayments.commissionAmount = orderProduct[i].total * (defCommission / 100);
                    }
                    await vendorPaymentRepository.save(vendorPayments);
                }
                const productInformation = await orderProductRepository.findOne({where: {orderProductId: orderProduct[i].orderProductId}, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice']});
                const productImageData: any = await productRepository.findOne(productInformation.productId);
                const productImageDetail = await productImageRepository.findOne({where: {productId: productInformation.productId}});
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                const productOptionValue = await orderOptionRepository.find({
                    where: {
                        orderProductId: productInformation.orderProductId,
                        orderId: orderData.orderId,
                    }, select: ['name', 'value'],
                });
                productImageData.productOption = productOptionValue;
                productDetailData.push(productImageData);
            }
            const emailContent = await EmailTemplateRepository.findOne(5);
            const adminEmailContent = await EmailTemplateRepository.findOne(6);
            const nowDate = new Date();
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await userRepository.find({select: ['username'], where: {userGroupId : 1}});
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId );
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
        } else {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = 'FAILURE';
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 2;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 2;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 2;
            orderData.paymentStatus = 2;
            await orderRepository.save(orderData);
        }
        res.render('pages/paypal/success', {
            title: 'Paypal',
            storeUrl: env.storeUrl + razorpayDetail.orderId,
            layout: 'pages/layouts/auth',
        });
    }

    public async cancel(req: express.Request | any, res: express.Response): Promise<any> {
        res.render('pages/razorpay/cancel', {
            title: 'Razorpay',
            layout: 'pages/layouts/auth',
            storeUrl: env.cancelUrl,
        });
    }

    public async proceed(req: express.Request | any, res: express.Response): Promise<any> {
        const orderId = req.params.orderId;
        console.log(orderId);
        const orderRepository = getManager().getRepository(Order);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const orderDetail = await orderRepository.findOne(orderId);
        if (!orderDetail) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'razorpay',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const razorPay = require('razorpay');
        const instance = new razorPay({
            key_id: paypalAdditionalInfo.clientId,
            key_secret: paypalAdditionalInfo.clientSecret,
        });
        // var amount= 2000,
        // currency='INR',
        // receipt = '1234545f4',
        // payment_capture =true,
        // notes ="something",
        console.log(orderDetail.currencyCode);
        const params: any = {
            amount: +orderDetail.total,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        instance.orders.create(params).then((response: any) => {
            // ---
            const paypalParams = new RazorpayOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.razorpayRefId = response.id;
            paypalParams.total = params.amount.toString();
            paypalParams.status = 0;
            razorpayOrderRepository.save(paypalParams).then((val) => {
                // ---
                res.render('pages/razorpay/proceed', {
                    title: 'Razorpay',
                    orderRefId: response.id,
                    key: paypalAdditionalInfo.clientId,
                    amount: orderDetail.total,
                    orderId: orderDetail.orderPrefixId,
                    orderIncrementId: orderDetail.orderId,
                    description: val.id,
                    username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                    email: orderDetail.email,
                    contact: orderDetail.telephone,
                    layout: 'pages/layouts/auth',
                });
            }).catch( (err) => {
                console.error(err);
            });
        }).catch((error) => {
            // ---
            console.error(error);
        });
    }
}
