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
import {Plugins} from '../models/Plugin';
import {Order} from '../../api/models/Order';
import {OrderProduct} from '../../api/models/OrderProduct';
import {OrderOption} from '../../api/models/OrderOption';
import {Product} from '../../api/models/ProductModel';
import {StripeOrder} from '../models/StripeOrder';
import {StripeOrderTransaction} from '../models/StripeOrderTransaction';
import {EmailTemplate} from '../../api/models/EmailTemplate';
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

export class StripeController {

    constructor() {
        // ---
    }

    public async index(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'stripe',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        res.render('pages/stripe/form', {
            title: 'Stripe',
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
                pluginName: 'stripe',
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
            req.flash('success', ['Stripe settings updated successfully']);
            return res.redirect('home');
        }
        req.flash('errors', ['Unable to update the stripe settings']);
        return res.redirect('home');
    }

    public async process(req: express.Request | any, res: express.Response): Promise<any> {
        const orderPrefixId = req.params.orderPrefixId;
        const orderRepository = getManager().getRepository(Order);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const orderOptionRepository = getManager().getRepository(OrderOption);
        const productRepository = getManager().getRepository(Product);
        const stripeOrderRepository = getManager().getRepository(StripeOrder);
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
                pluginName: 'stripe',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const stripeAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};

        const product = await orderProductRepository.find({where: {orderId: orderDetail.orderId}, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice']});

        const productVal = product.map(async (value: any) => {
            const productDetail = await productRepository.findOne({
                where: {productId: value.productId},
                select: ['name', 'quantity', 'minimumQuantity', 'image',
                    'imagePath', 'shipping', 'price', 'dateAvailable', 'amount', 'rating', 'discount', 'isActive']});
                const orderOption = await orderOptionRepository.find({where: {orderProductId: value.orderProductId},
                select: ['name', 'value', 'type', 'orderOptionId', 'orderProductId']});
            const tempVal: any = value;
            tempVal.productDetail = productDetail;
            tempVal.orderOptions = orderOption;
            return tempVal;
        });
        const results = await Promise.all(productVal);
        const items = [];
        results.forEach((element) => {
            const price = Math.round(element.productPrice * 100);
            items.push({
                name: element.name,
                amount: price.toString(),
                currency: orderDetail.currencyCode,
                quantity: element.quantity,
            });
        });
        const orderAmount = Math.round(orderDetail.total * 100);
        const create_payment_json = {
            payment_method_types: ['card'],
            line_items: items,
            // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            success_url: env.app.schema + '://' + env.baseUrl + stripeAdditionalInfo.successRoute + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: env.app.schema + '://' + env.baseUrl  + stripeAdditionalInfo.cancelRoute,
        };
        const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
        const session = await stripe.checkout.sessions.create(create_payment_json);
        if (session) {
            const stripeParams = new StripeOrder();
            stripeParams.orderId = orderDetail.orderId;
            stripeParams.stripeRefId = session.id;
            stripeParams.total = orderAmount.toString();
            stripeParams.status = 0;
            await stripeOrderRepository.save(stripeParams);
            res.render('pages/stripe/process', {
                title: 'stripe',
                sessionId: session.id,
                publishKey: stripeAdditionalInfo.clientId,
                layout: 'pages/layouts/auth',
            });
        }
    }

    public async cancel(req: express.Request | any, res: express.Response): Promise<any> {
        res.render('pages/razorpay/cancel', {
            title: 'Razorpay',
            layout: 'pages/layouts/auth',
            storeUrl: env.cancelUrl,
        });
    }

    public async success(req: express.Request | any, res: express.Response): Promise<any> {
        const queryParams = req.query;
        console.log(req.query);
        console.log('**********Payment authorized***********');
        console.log(queryParams.session_id);
        console.log('**********Payment authorized***********');
        const pluginRepository = getManager().getRepository(Plugins);
        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const orderOptionRepository = getManager().getRepository(OrderOption);
        const productImageRepository = getManager().getRepository(ProductImage);
        const productRepository = getManager().getRepository(Product);
        const settingRepository = getManager().getRepository(Settings);
        const currencyRepository = getManager().getRepository(Currency);
        const userRepository = getManager().getRepository(User);
        const stripeOrderRepository = getManager().getRepository(StripeOrder);
        const stripeOrderTransactionRepository = getManager().getRepository(StripeOrderTransaction);
        const paymentRepository = getManager().getRepository(Payments);
        const paymentItemsRepository = getManager().getRepository(PaymentItems);
        const vendorPaymentRepository = getManager().getRepository(VendorPayment);
        const VendorProductsRepository = getManager().getRepository(VendorProducts);
        const VendorRepository = getManager().getRepository(Vendor);
        const VendorGlobalSettingRepository = getManager().getRepository(VendorGlobalSetting);
        const VendorOrdersRepository = getManager().getRepository(VendorOrders);
        const pluginDetail = await pluginRepository.findOne({
            where : {
                pluginName: 'stripe',
            },
        });
        if (!pluginDetail) {
            req.flash('errors', ['You not install this plugin. or problem in installation']);
            return res.redirect('home');
        }
        const stripeAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
        const stripe = require('stripe')(stripeAdditionalInfo.clientSecret);
        const session = await stripe.checkout.sessions.retrieve(queryParams.session_id);
        console.log(session);
        if (session) {
            const paymentDetails = await stripe.paymentIntents.retrieve(session.payment_intent);
            console.log('paymentDetails', paymentDetails);
            const stripeDetail = await stripeOrderRepository.findOne({
                where : {
                    stripeRefId : queryParams.session_id,
                },
            });
            if (!stripeDetail) {
                req.flash('errors', ['Invalid Payment Details']);
                return res.redirect('error');
            }
            const orderRepository = getManager().getRepository(Order);
            const orderData: any = await orderRepository.findOne(stripeDetail.orderId);
            if (!orderData) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const setting = await settingRepository.findOne();
            const currencySymbol = await currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = await orderRepository.findOne({where: {orderId: stripeDetail.orderId, paymentFlag: 1}});
            if (orderStatus) {
                req.flash('errors', ['Already Paid for this Order']);
                return res.redirect('error');
            }
            const intvalue = Math.round(paymentDetails.amount_received);
            if (paymentDetails.status === 'succeeded' && intvalue === +stripeDetail.total) {
                const transactionsParams = new StripeOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.stripeOrderId = stripeDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                await stripeOrderTransactionRepository.save(transactionsParams);
                stripeDetail.status = 1;
                await stripeOrderRepository.save(stripeDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentType = 'stripe';
                orderData.paymentDetails = paymentDetails.id;
                await orderRepository.save(orderData);
                const paymentParams = new Payments();
                paymentParams.orderId = stripeDetail.orderId;
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
                const transactionsParams = new StripeOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.stripeOrderId = stripeDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                await stripeOrderTransactionRepository.save(transactionsParams);
                stripeDetail.status = 2;
                await stripeOrderRepository.save(stripeDetail);
                orderData.paymentFlag = 2;
                orderData.paymentStatus = 2;
                await orderRepository.save(orderData);
            }
            res.render('pages/stripe/success', {
                title: 'Stripe',
                storeUrl: env.storeUrl + stripeDetail.orderId,
                layout: 'pages/layouts/auth',
            });
        }
    }
}
