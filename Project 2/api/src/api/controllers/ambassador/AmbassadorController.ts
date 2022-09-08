/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Put,
    Param,
    Get,
    QueryParam,
    BodyParam,
    Delete,
    CurrentUser,
} from 'routing-controllers';
import { CustomerService } from '../../services/CustomerService';
import { CountryService } from '../../services/CountryService';
import { AmbassadorService } from '../../services/AmbassadorService';
import { AmbassadorSettingService } from '../../services/AmbassadorSettingService';
import { Customer } from '../../models/Customer';
import { env } from '../../../env';
import { S3Service } from '../../services/S3Service';
import { ImageService } from '../../services/ImageService';
import * as fs from 'fs';
import { CreateAmbassadorRequest } from './requests/CreateAmbassadorRequest';
import { UpdateAmbassadorRequest } from './requests/UpdateAmbassadorRequest';
import { Ambassador } from '../../models/Ambassador';
import { User } from '../../models/User';
import moment = require('moment');

@JsonController('/admin-ambassador')
export class AmbassadorController {
    constructor(
        private customerService: CustomerService,
        private ambassadorService: AmbassadorService,
        private s3Service: S3Service,
        private ambassadorGlobalSettingService: AmbassadorSettingService,
        private countryService: CountryService,
        private imageService: ImageService
    ) {
    }

    // Create Ambassador API
    /**
     * @api {post} /api/admin-ambassador/add-ambassador Add Ambassador API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Ambassador firstName
     * @apiParam (Request body) {String} lastName Ambassador lastName
     * @apiParam (Request body) {String} email Ambassador email
     * @apiParam (Request body) {Number} mobileNumber Ambassador mobileNumber
     * @apiParam (Request body) {String} password Ambassador password
     * @apiParam (Request body) {String} confirmPassword Ambassador confirmPassword
     * @apiParam (Request body) {String} avatar Ambassador avatar
     * @apiParam (Request body) {Number} commission seller commission
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyGstNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} mailStatus mailStatus
     * @apiParam (Request body) {Number} status Status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "commission" : "",
     *      "address1" : "",
     *      "address2" : "",
     *      "city" : "",
     *      "state" : "",
     *      "countryId" : "",
     *      "pincode" : "",
     *      "paymentInformation": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Ambassador Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/add-ambassador
     * @apiErrorExample {json} Ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/add-ambassador')
    @Authorized()
    public async addAmbassador(@Body({ validate: true }) customerParam: CreateAmbassadorRequest, @Res() response: any, @CurrentUser() user?: User): Promise<any> {

        const avatar = customerParam.avatar;
        const newCustomer: Customer = new Customer();
        const resultUser = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
        if (resultUser) {
            const existing = await this.ambassadorService.findOne({ where: { customerId: resultUser.id } });
            if (existing) {
                const successResponse: any = {
                    status: 1,
                    message: 'EmailId already exist.',
                };
                return response.status(400).send(successResponse);
            } else {
                if (customerParam.password === customerParam.confirmPassword) {

                    const customer = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
                    customer.firstName = customerParam.firstName;
                    customer.lastName = customerParam.lastName;
                    customer.customerGroupId = 10;
                    if (avatar) {
                        const type = avatar.split(';')[0].split('/')[1];
                        const name = 'Img_' + Date.now() + '.' + type;
                        const path = 'ambassador/';
                        const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                        if (env.imageserver === 's3') {
                            await this.s3Service.imageUpload((path + name), base64Data, type);
                        } else {
                            await this.imageService.imageUpload((path + name), base64Data);
                        }
                        customer.avatar = name;
                        customer.avatarPath = path;
                    }
                    customer.password = await Customer.hashPassword(customerParam.password);
                    customer.email = customerParam.email;
                    customer.username = customerParam.email;
                    customer.mobileNumber = customerParam.mobileNumber;
                    customer.mailStatus = 1;
                    customer.isActive = 1;
                    const customerUpdated = await this.customerService.create(customer);
                    if (customerUpdated) {
                        const newAmbassador = new Ambassador();
                        newAmbassador.customerId = customer.id;
                        if (customerParam.commission) {
                            newAmbassador.commission = customerParam.commission;
                        } else {
                            const commission = await this.ambassadorGlobalSettingService.findOne();
                            if (commission) {
                                newAmbassador.commission = commission.defaultCommission;
                            }
                        }
                        newAmbassador.paymentInformation = customerParam.paymentInformation;
                        newAmbassador.address1 = customerParam.address1;
                        newAmbassador.address2 = customerParam.address2;
                        newAmbassador.city = customerParam.city;
                        newAmbassador.state = customerParam.state;
                        newAmbassador.countryId = customerParam.countryId;
                        newAmbassador.pincode = customerParam.pincode;
                        newAmbassador.createdBy = user.userId;
                        newAmbassador.modifiedBy = user.userId;
                        newAmbassador.modifiedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

                        newAmbassador.ambassadorCode = this.Slugify(customerParam.lastName).concat(newAmbassador.customerId.toString());
                        await this.ambassadorService.create(newAmbassador);

                        // if (env.imageserver === 's3') {
                        //     await this.s3Service.createFolder(val.ambassadorCode);
                        // } else {
                        //     await this.imageService.createFolder(val.ambassadorCode);
                        // }
                        // if (customerParam.mailStatus === 1) {
                        //     const emailContent = await this.emailTemplateService.findOne(13);
                        //     const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                        //     MAILService.customerLoginMail(message, customerParam.email, emailContent.subject);
                        //     const successResponse: any = {
                        //         status: 1,
                        //         message: 'Successfully created new Ambassador with user name and password and send an email. ',
                        // };
                        //     return response.status(200).send(successResponse);
                        // } else {
                        const successResponse: any = {
                            status: 1,
                            message: 'Ambassador Created Successfully',
                        };
                        return response.status(200).send(successResponse);
                        // }
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Password does not match.',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        } else { // Customer not exist, need to create it
            if (customerParam.password === customerParam.confirmPassword) {
                if (avatar) {
                    const type = avatar.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'ambassador/';
                    const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }
                    newCustomer.avatar = name;
                    newCustomer.avatarPath = path;
                }
                const password = await Customer.hashPassword(customerParam.password);
                // console.log(password + 'password');
                newCustomer.customerGroupId = 10;
                newCustomer.firstName = customerParam.firstName;
                newCustomer.lastName = customerParam.lastName;
                newCustomer.email = customerParam.email;
                newCustomer.username = customerParam.email;
                newCustomer.mobileNumber = customerParam.mobileNumber;
                newCustomer.password = password;
                newCustomer.deleteFlag = 0;
                newCustomer.mailStatus = 1;
                newCustomer.isActive = 1;
                const customerSave = await this.customerService.create(newCustomer);
                if (customerSave) {
                    const ambassador: Ambassador = new Ambassador();
                    if (customerParam.commission) {
                        ambassador.commission = customerParam.commission;
                    } else {
                        const commission = await this.ambassadorGlobalSettingService.findOne();
                        if (commission) {
                            ambassador.commission = commission.defaultCommission;
                        }
                    }
                    ambassador.customerId = customerSave.id;
                    ambassador.ambassadorCode = this.Slugify(customerParam.lastName).concat(ambassador.customerId.toString());
                    ambassador.paymentInformation = customerParam.paymentInformation;
                    ambassador.address1 = customerParam.address1;
                    ambassador.address2 = customerParam.address2;
                    ambassador.city = customerParam.city;
                    ambassador.state = customerParam.state;
                    ambassador.countryId = customerParam.countryId;
                    ambassador.pincode = customerParam.pincode;
                    ambassador.createdBy = user.userId;

                    const newAmbassador = await this.ambassadorService.create(ambassador);

                    // if (env.imageserver === 's3') {
                    //     await this.s3Service.createFolder(value.ambassadorCode);
                    // } else {
                    //     await this.imageService.createFolder(value.ambassadorCode);
                    // }
                    if (newAmbassador) {
                        // if (customerParam.mailStatus === 1) {
                        //     const emailContent = await this.emailTemplateService.findOne(13);
                        //     const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                        //     MAILService.customerLoginMail(message, customerParam.email, emailContent.subject);
                        //     const successResponse: any = {
                        //         status: 1,
                        //         message: 'Successfully created new Ambassador with user name and password and send an email. ',
                        //     };
                        //     return response.status(200).send(successResponse);
                        // } else {
                        const successResponse: any = {
                            status: 1,
                            message: 'Ambassador Created Successfully',
                        };
                        return response.status(200).send(successResponse);
                        // }
                    }
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Password does not match.',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // Update Ambassador API
    /**
     * @api {put} /api/admin-ambassador/Update-Ambassador/:id Update Ambassador API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Ambassador firstName
     * @apiParam (Request body) {String} lastName Ambassador lastName
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} commission seller commission
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyGstNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} mailStatus mailStatus
     * @apiParam (Request body) {Number} status Status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "mobileNumber" : "",
     *      "avatar" : "",
     *      "commission" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyDescription" : "",
     *      "paymentInformation" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "companyCountryId" : "",
     *      "pincode" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyGstNumber" : "",
     *      "companyPanNumber" : "",
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Ambassador Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/Update-Ambassador/:id
     * @apiErrorExample {json} Ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/Update-Ambassador/:id')
    @Authorized()
    public async UpdateAmbassador(@Param('id') id: number, @Body({ validate: true }) updateCustomerParam: UpdateAmbassadorRequest, @Res() response: any, @CurrentUser() user?: User): Promise<any> {

        console.log(updateCustomerParam);
        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid ambassador id',
            };
            return response.status(400).send(errorResponse);
        }
        // if (customerParam.password === customerParam.confirmPassword) {

        const avatar = updateCustomerParam.avatar;
        if (avatar) {
            const type = avatar.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'ambassador/';
            const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            customer.avatar = name;
            customer.avatarPath = path;
        }
        customer.firstName = updateCustomerParam.firstName;
        customer.lastName = updateCustomerParam.lastName;
        customer.mobileNumber = updateCustomerParam.mobileNumber;
        // if (customerParam.password) {
        //     const password = await Customer.hashPassword(customerParam.password);
        //     customer.password = password;
        // }
        customer.deleteFlag = 0;
        customer.mailStatus = 1;
        customer.isActive = 1;
        const customerSave = await this.customerService.create(customer);
        const ambassador = await this.ambassadorService.findOne({
            where: {
                customerId: id,
            },
        });
        if (updateCustomerParam.commission) {
            ambassador.commission = updateCustomerParam.commission;
        } else {
            const commission = await this.ambassadorGlobalSettingService.findOne();
            if (commission) {
                ambassador.commission = commission.defaultCommission;
            }
        }
        ambassador.customerId = customerSave.id;
        ambassador.paymentInformation = updateCustomerParam.paymentInformation;
        ambassador.address1 = updateCustomerParam.address1;
        ambassador.address2 = updateCustomerParam.address2;
        ambassador.city = updateCustomerParam.city;
        ambassador.state = updateCustomerParam.state;
        ambassador.countryId = updateCustomerParam.countryId;
        ambassador.pincode = updateCustomerParam.pincode;
        ambassador.modifiedBy = user.userId;

        const ambassadorSave = await this.ambassadorService.create(ambassador);
        if (ambassadorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Ambassador Updated Successfully',
                data: customerSave,
            };
            return response.status(200).send(successResponse);

        }
        // } else {
        //     const errorResponse: any = {
        //         status: 0,
        //         message: 'Password does not match.',
        //     };
        //     return response.status(400).send(errorResponse);
        // }
    }

    // Ambassador List API
    /**
     * @api {get} /api/admin-ambassador/ambassadorlist Ambassador List API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} name search by name
     * @apiParam (Request body) {String} email search by email
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get ambassador list",
     *      "data":{
     *      "customerGroupId" : "",
     *      "username" : "",
     *      "email" : "",
     *      "mobileNUmber" : "",
     *      "password" : "",
     *      "avatar" : "",
     *      "avatarPath" : "",
     *      "status" : "",
     *      "safe" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/ambassadorlist
     * @apiErrorExample {json} ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/ambassadorlist')
    @Authorized()
    public async ambassadorList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('name') name: string, @QueryParam('status') status: string, @QueryParam('email') email: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['ambassador.ambassadorId', 'ambassador.ambassadorCode', 'ambassador.customerId', 'ambassador.commission'];

        const searchConditions = [];

        const whereConditions: any = [
            {
                name: 'ambassador.customerId',
                op: 'where',
                value: 0,
            },
            {
                name: 'ambassador.customerId',
                op: 'email',
                value: email,
            },
            {
                name: 'ambassador.customerId',
                op: 'status',
                value: status,
            },
            {
                name: 'ambassador.customerId',
                op: 'name',
                value: name,
            },
        ];
        const ambassadorList = await this.ambassadorService.ambassadorList(limit, offset, select, searchConditions, whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got ambassador count',
                data: ambassadorList,
            };
            return response.status(200).send(successRes);
        }
        const ambassadorCustomerList = ambassadorList.map(async (value: any) => {
            const customer = await this.customerService.findOne({
                where: {
                    id: value.customerId,
                },
            });
            const temp: any = value;
            temp.firstName = customer.firstName;
            temp.lastName = customer.lastName;
            temp.email = customer.email;
            temp.mobileNumber = customer.mobileNumber;
            temp.avatar = customer.avatar;
            temp.avatarPath = customer.avatarPath;
            temp.customerGroupId = customer.customerGroupId;
            temp.isActive = customer.isActive;
            return temp;
        });
        const results = await Promise.all(ambassadorCustomerList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Ambassador list.',
            data: results,
        };
        return response.status(200).send(successResponse);

    }

    // Ambassador Details Excel Document Download
    /**
     * @api {get} /api/admin-ambassador/ambassador-excel-list Ambassador Excel
     * @apiGroup Admin ambassador
     * @apiParam (Request body) {String} ambassadorId ambassadorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Ambassador Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-ambassador/ambassador-excel-list
     * @apiErrorExample {json} Ambassador Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/ambassador-excel-list')
    public async excelAmbassadorView(@QueryParam('ambassadorId') ambassadorId: string, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Ambassador list Sheet');
        const rows = [];
        worksheet.columns = [
            { header: 'Ambassador Id', key: 'id', size: 16, width: 15 },
            { header: 'Ambassador Code', key: 'ambassadorCode', size: 16, width: 15 },
            { header: 'Ambassador Name', key: 'firstName', size: 16, width: 15 },
            { header: 'Email Id', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
            { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
            { header: 'commission', key: 'commission', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        if (ambassadorId) {
            const ambassadorsid = ambassadorId.split(',');
            for (const id of ambassadorsid) {
                const dataId = await this.ambassadorService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid ambassadorId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of ambassadorsid) {
                const dataId = await this.ambassadorService.findOne(id);
                console.log(dataId.commission);
                const customer = await this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                if (customer) {
                    rows.push([dataId.ambassadorId, dataId.ambassadorCode, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission]);
                }
            }
        } else {
            const ambassadors = await this.ambassadorService.findAll();
            if (ambassadors === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Ambassadors are empty',
                };
                return response.status(400).send(errorResponse);
            }
            for (const ambassador of ambassadors) {
                const dataId = await this.ambassadorService.findOne(ambassador.ambassadorId);
                console.log(dataId.commission);
                const customer = await this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                if (customer) {
                    rows.push([dataId.ambassadorId, dataId.ambassadorCode, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission]);
                }
            }
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './AmbassadorExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Get ambassador Detail API
    /**
     * @api {get} /api/admin-ambassador/ambassador-details/:id Ambassador Details API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get ambassador Details",
     * "data":{
     * "ambassadorId" : "",
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/ambassador-details/:id
     * @apiErrorExample {json} ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/ambassador-details/:id')
    @Authorized()
    public async ambassadorDetails(@Param('id') Id: number, @Res() response: any): Promise<any> {
        const ambassador = await this.ambassadorService.findOne({
            select: ['ambassadorId', 'ambassadorCode', 'customerId', 'commission',
                'address1', 'address2', 'city', 'state', 'countryId',
                'pincode', 'paymentInformation'],
            where: { ambassadorId: Id },
        });
        if (ambassador === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Ambassador not found',
            };
            return response.status(400).send(errorResponse);
        }
        const ambassadorDetails: any = ambassador;
        ambassadorDetails.customerDetails = await this.customerService.findOne({
            select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive'],
            where: { id: ambassador.customerId },
        });
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: ambassador.countryId },
        });
        if (country) {
            ambassadorDetails.countryName = country.name;
        }
        // const product = await this.ambassadorProductService.find({
        //     select: ['productId'],
        //     where: { ambassadorId: Id },
        // });
        // ambassador.productCount = product.length;

        const successResponse: any = {
            status: 1,
            message: 'successfully got Ambassador details. ',
            data: ambassadorDetails,
        };
        return response.status(200).send(successResponse);

    }

    // Delete Ambassador API
    /**
     * @api {delete} /api/admin-ambassador/delete-ambassador/:id Delete single Ambassador API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "ambassadorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted ambassador.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/delete-ambassador/:id
     * @apiErrorExample {json} Ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-ambassador/:id')
    @Authorized()
    public async deleteAmbassador(@Param('id') id: number, @Res() response: any, @CurrentUser() user?: User): Promise<any> {

        const ambassador = await this.ambassadorService.findOne({
            where: {
                ambassadorId: id,
            },
        });
        if (!ambassador) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ambassadorId',
            };
            return response.status(400).send(errorResponse);
        }
        // const product = await this.ambassadorProductService.findOne({ where: { ambassadorId: ambassador.ambassadorId } });
        // if (product) {
        //     const errorResponse: any = {
        //         status: 0,
        //         message: 'Products are mapped for this ambassador.So please delete that product',
        //     };
        //     return response.status(400).send(errorResponse);
        // }
        const customer = await this.customerService.findOne({ where: { id: ambassador.customerId } });
        customer.deleteFlag = 1;
        customer.modifiedBy = user.userId;
        const deleteCustomer = await this.customerService.create(customer);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Ambassador Deleted Successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to change delete flag status',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Delete Multiple Customer API
    /**
     * @api {post} /api/admin-ambassador/delete-multiple-ambassador Delete Multiple Ambassador API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} ambassadorId ambassadorId
     * @apiParamExample {json} Input
     * {
     * "ambassadorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted ambassadors.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/delete-multiple-ambassador
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-multiple-ambassador')
    @Authorized()
    public async deleteMultipleCustomer(@BodyParam('ambassadorId') ambassadorId: string, @Res() response: any): Promise<any> {
        const customer: any = ambassadorId.split(',');
        console.log(customer);
        const data: any = customer.map(async (id: any) => {
            const dataId = await this.ambassadorService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose customer for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                // const product = await this.ambassadorProductService.findOne({ where: { ambassadorId: dataId.ambassadorId } });
                // if (product) {
                //     const errorResponse: any = {
                //         status: 0,
                //         message: 'Products are mapped for one of the selected ambassador.So please delete that product',
                //     };
                //     return response.status(400).send(errorResponse);
                // }
                const customerDelete = await this.customerService.findOne({ where: { id: dataId.customerId } });
                customerDelete.deleteFlag = 1;
                return await this.customerService.create(customerDelete);
            }
        });
        const deleteCustomer = await Promise.all(data);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted ambassador',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Update Ambassador commission  API
    /**
     * @api {put} /api/admin-ambassador/update-ambassador-commission/:ambassadorId Update Ambassador Commission API
     * @apiGroup Admin ambassador
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} commission commission
     * @apiParamExample {json} Input
     * {
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated ambassador commission",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-ambassador/update-ambassador-commission/:ambassadorId
     * @apiErrorExample {json} ambassador approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-ambassador-commission/:ambassadorId')
    @Authorized()
    public async updateAmbassadorCommission(@Param('ambassadorId') ambassadorId: number, @BodyParam('commission') commission: number, @Res() response: any, @CurrentUser() user?: User): Promise<any> {

        const ambassador = await this.ambassadorService.findOne({
            where: {
                ambassadorId,
            },
        });
        if (!ambassador) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ambassadorId',
            };
            return response.status(400).send(errorResponse);
        }

        ambassador.commission = commission;
        ambassador.modifiedBy = user.userId;

        const ambassadorSave = await this.ambassadorService.create(ambassador);
        if (ambassadorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Ambassador Commission ',
                data: ambassadorSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable Updated Ambassador Commission',
            };
            return response.status(400).send(errorResponse);
        }
    }

    private Slugify(str: string): string {
        const map = {
            '-': ' |_',
            // '-': '_',
            'a': 'á|à|ã|â|À|Á|Ã|Â',
            'e': 'é|è|ê|É|È|Ê',
            'i': 'í|ì|î|Í|Ì|Î',
            'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ',
        };
        str = str.toLowerCase();
        for (const pattern of Object.keys(map)) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        }

        return str;
    }
}
