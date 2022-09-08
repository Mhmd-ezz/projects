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
    Req,
    Put,
    Param,
    Get,
    QueryParam,
    BodyParam,
    Delete,
} from 'routing-controllers';
import { CustomerService } from '../../services/CustomerService';
import { CountryService } from '../../services/CountryService';
import { VendorService } from '../../services/VendorService';
import { CategoryService } from '../../services/CategoryService';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { VendorCategoryService } from '../../services/VendorCategoryService';
import { Customer } from '../../models/Customer';
import { CreateVendorRequest } from './requests/CreateVendorRequest';
import { UpdateVendor } from './requests/UpdateVendorRequest';
import { Vendor } from '../../models/Vendor';
import { MAILService } from '../../../auth/mail.services';
import { env } from '../../../env';
import { S3Service } from '../../services/S3Service';
import { SettingService } from '../../services/SettingService';
import { ImageService } from '../../services/ImageService';
import { VendorProductService } from '../../services/VendorProductService';
import { VendorGlobalSettingService } from '../../services/VendorSettingService';
import { CustomerDocumentService } from '../../services/CustomerDocumentService';
import * as fs from 'fs';
import CognitoAuthService from '../../../auth/cognitoAuthServices';

@JsonController('/admin-vendor')
export class VendorController {
    constructor(
        private customerService: CustomerService,
        // private sellerAccountSettingsService: SellerAccountSettingsService,
        private vendorService: VendorService,
        private categoryService: CategoryService,
        private vendorCategoryService: VendorCategoryService,
        private emailTemplateService: EmailTemplateService,
        private s3Service: S3Service,
        private settingService: SettingService,
        private vendorGlobalSettingService: VendorGlobalSettingService,
        private vendorProductService: VendorProductService,
        private countryService: CountryService,
        private customerDocumentService: CustomerDocumentService,
        private imageService: ImageService,
        private cognitoService: CognitoAuthService
    ) {
    }

    // Create Vendor API
    /**
     * @api {post} /api/admin-vendor/add-vendor Add Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName
     * @apiParam (Request body) {String} lastName Vendor lastName
     * @apiParam (Request body) {String} email Vendor email
     * @apiParam (Request body) {Number} mobileNumber Vendor mobileNumber
     * @apiParam (Request body) {String} password Vendor password
     * @apiParam (Request body) {String} confirmPassword Vendor confirmPassword
     * @apiParam (Request body) {String} avatar Vendor avatar
     * @apiParam (Request body) {Number} sellerAccountSettingsId
     * @apiParam (Request body) {Number} commission seller commission
     * @apiParam (Request body) {Number} sellerAccountSettingsId
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} shippingCountryId shipping country id
     * @apiParam (Request body) {String} shippingAddressState shipping country state
     * @apiParam (Request body) {String} shippingAddressCity shipping address city
     * @apiParam (Request body) {String} shippingAddressLine1 shipping address line1
     * @apiParam (Request body) {String} shippingAddressLine2 shipping address line2
     * @apiParam (Request body) {String} shippingAddressStreet shipping address street
     * @apiParam (Request body) {String} shippingAddressNotes shipping address notes
     * @apiParam (Request body) {Number} billingAddressCountryId billing address country id
     * @apiParam (Request body) {String} billingAddressState billing address state
     * @apiParam (Request body) {String} billingAddressCity billing address city
     * @apiParam (Request body) {String} billingAddressLine1 billing address line1
     * @apiParam (Request body) {String} billingAddressLine2 billing address line2
     * @apiParam (Request body) {String} billingAddressStreet billing address street
     * @apiParam (Request body) {String} billingAddressNotes billing address notes
     * @apiParam (Request body) {String} iban vendor bank account
     * @apiParam (Request body) {String} currency vendor currency
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
     *      "sellerAccountSettingsId" : "",
     *      "commission" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyDescription" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "shippingCountryId" : "",
     *      "shippingAddressState" : "",
     *      "shippingAddressCity" : "",
     *      "shippingAddressLine1" : "",
     *      "shippingAddressLine2" : "",
     *      "shippingAddressStreet" : "",
     *      "shippingAddressNotes" : "",
     *      "billingAddressCountryId" : "",
     *      "billingAddressState" : "",
     *      "billingAddressCity" : "",
     *      "billingAddressLine1" : "",
     *      "billingAddressLine2" : "",
     *      "billingAddressStreet" : "",
     *      "billingAddressNotes" : "",
     *      "currency" : "",
     *      "pincode" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyGstNumber" : "",
     *      "companyPanNumber" : "",
     *      "mailStatus" : "",
     *      "paymentInformation": "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/add-vendor
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/add-vendor')
    @Authorized()
    public async addVendor(@Body({ validate: true }) customerParam: CreateVendorRequest, @Req() request: any, @Res() response: any): Promise<any> {

        if (customerParam.password !== customerParam.confirmPassword) {
            const errorResponse: any = {
                status: 0,
                message: 'Validation failed, password and confirmPassword do not match.',
            };
            return response.status(400).send(errorResponse);
        }

        const avatar = customerParam.avatar;
        const customer = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
        if (customer) {
            const vendor = await this.vendorService.findOne({ where: { customerId: customer.id } });
            if (vendor) { // all good, we have a duplicate
                const successResponse: any = {
                    status: 1,
                    message: 'A vendor with same email already exist.',
                };
                return response.status(400).send(successResponse);
            } else { // customer exists, but not a vendor, add it 

                customer.firstName = customerParam.firstName;
                customer.lastName = customerParam.lastName;
                if (avatar) {
                    const type = avatar.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'customer/';
                    const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }
                    customer.avatar = name;
                    customer.avatarPath = path;
                }

                try {
                    const changeResult = await this.cognitoService.ChangePassword(
                        customer.username,
                        customer.password,
                        customerParam.password
                    );
                    console.log(changeResult);
                } catch (error) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Failed to update user password in AWS Cognito: ' + error.message,
                    };
                    return response.status(400).send(errorResponse);
                }
                customer.email = customerParam.email;
                // username should be set in a previous customer registration
                // customer.username = customerParam.email;
                customer.mobileNumber = customerParam.mobileNumber;
                customer.mailStatus = customerParam.mailStatus;
                customer.isActive = customerParam.status;
                const customerUpdated = await this.customerService.update(customer.id, customer);
                if (customerUpdated) { // create vendor
                    await this.createVendor(customerParam, customer);
                    // if (customerParam.mailStatus === 1) {
                    //     const emailContent = await this.emailTemplateService.findOne(13);
                    //     const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                    //     MAILService.customerLoginMail(message, customerParam.email, emailContent.subject);
                    //     const successResponse: any = {
                    //         status: 1,
                    //         message: 'Successfully created new Vendor with user name and password and send an email. ',
                    //     };
                    //     return response.status(200).send(successResponse);
                    // } else {
                    const successResponse: any = {
                        status: 1,
                        message: 'Vendor Created Successfully',
                    };
                    return response.status(200).send(successResponse);
                    // }
                }
                // } else {
                //     const errorResponse: any = {
                //         status: 0,
                //         message: 'Password does not match.',
                //     };
                //     return response.status(400).send(errorResponse);
                // }
            }
        } else { // Customer doesn't exist, create it 
            const newCustomer: Customer = new Customer();
            // if (customerParam.password === customerParam.confirmPassword) {
            let username = '';
            try {
                const createResult = await this.cognitoService.Register(
                    newCustomer.username,
                    newCustomer.email,
                    newCustomer.password
                );
                // console.log(createResult);
                username = createResult.userSub;
            } catch (error) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Failed to create user in AWS Cognito: ' + error.message,
                };
                return response.status(400).send(errorResponse);
            }
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
                newCustomer.avatar = name;
                newCustomer.avatarPath = path;
            }
            // const password = await Customer.hashPassword(customerParam.password);
            // console.log(password + 'password');

            newCustomer.firstName = customerParam.firstName;
            newCustomer.lastName = customerParam.lastName;
            newCustomer.email = customerParam.email;
            newCustomer.username = username; // customerParam.email;
            newCustomer.mobileNumber = customerParam.mobileNumber;
            // newCustomer.password = password;
            newCustomer.deleteFlag = 0;
            newCustomer.mailStatus = customerParam.mailStatus;
            newCustomer.isActive = customerParam.status;
            const customerSave = await this.customerService.create(newCustomer);
            if (customerSave) {
                const vendorSave = await this.createVendor(customerParam, customerSave);
                if (vendorSave) {
                    // if (customerParam.mailStatus === 1) {
                    //     const emailContent = await this.emailTemplateService.findOne(13);
                    //     const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                    //     MAILService.customerLoginMail(message, customerParam.email, emailContent.subject);
                    //     const successResponse: any = {
                    //         status: 1,
                    //         message: 'Successfully created new Vendor with user name and password and send an email. ',
                    //     };
                    //     return response.status(200).send(successResponse);
                    // } else {
                    const successResponse: any = {
                        status: 1,
                        message: 'Vendor Created Successfully',
                    };
                    return response.status(200).send(successResponse);
                    // }
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Failed to create a vendor',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // Update Vendor API
    /**
     * @api {put} /api/admin-vendor/Update-Vendor/:id Update Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName
     * @apiParam (Request body) {String} lastName Vendor lastName
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} commission seller commission 
     * @apiParam (Request body) {Number} sellerAccountSettingsId
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} shippingCountryId company country id
     * @apiParam (Request body) {String} shippingAddressState shipping country state
     * @apiParam (Request body) {String} shippingAddressCity shipping address city
     * @apiParam (Request body) {String} shippingAddressLine1 shipping address line1
     * @apiParam (Request body) {String} shippingAddressLine2 shipping address line2
     * @apiParam (Request body) {String} shippingAddressStreet shipping address street
     * @apiParam (Request body) {String} shippingAddressNotes shipping address notes
     * @apiParam (Request body) {Number} billingAddressCountryId billing address country id
     * @apiParam (Request body) {String} billingAddressState billing address state
     * @apiParam (Request body) {String} billingAddressCity billing address city
     * @apiParam (Request body) {String} billingAddressLine1 billing address line1
     * @apiParam (Request body) {String} billingAddressLine2 billing address line2
     * @apiParam (Request body) {String} billingAddressStreet billing address street
     * @apiParam (Request body) {String} billingAddressNotes billing address notes
     * @apiParam (Request body) {String} iban vendor bank account
     * @apiParam (Request body) {String} currency vendor currency
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
     *      "sellerAccountSettingsId" : "",
     *      "commission" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyDescription" : "",
     *      "paymentInformation" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "shippingCountryId" : "",
     *      "shippingAddressState" : "",
     *      "shippingAddressCity" : "",
     *      "shippingAddressLine1" : "",
     *      "shippingAddressLine2" : "",
     *      "shippingAddressStreet" : "",
     *      "shippingAddressNotes" : "",
     *      "billingAddressCountryId" : "",
     *      "billingAddressState" : "",
     *      "billingAddressCity" : "",
     *      "billingAddressLine1" : "",
     *      "billingAddressLine2" : "",
     *      "billingAddressStreet" : "",
     *      "billingAddressNotes" : "",
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
     *      "message": "Vendor Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/Update-Vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/Update-Vendor/:id')
    @Authorized()
    public async UpdateVendor(@Param('id') id: number, @Body({ validate: true }) updateCustomerParam: UpdateVendor, @Req() request: any, @Res() response: any): Promise<any> {

        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer id',
            };
            return response.status(400).send(errorResponse);
        }
        // if (customerParam.password === customerParam.confirmPassword) {

        const avatar = updateCustomerParam.avatar;
        if (avatar) {
            const type = avatar.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'customer/';
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
        customer.mailStatus = updateCustomerParam.mailStatus;
        customer.isActive = updateCustomerParam.status;
        const customerSave = await this.customerService.update(customer.id, customer);
        const vendor = await this.vendorService.findOne({
            where: {
                customerId: id,
            },
        });
        const companyLogo = updateCustomerParam.companyLogo;
        if (companyLogo) {
            const type = companyLogo.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'logo/';
            const base64Data = new Buffer(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            vendor.companyLogo = name;
            vendor.companyLogoPath = path;
        }
        if (updateCustomerParam.commission) {
            vendor.commission = updateCustomerParam.commission;
        } else {
            const commission = await this.vendorGlobalSettingService.findOne();
            if (commission) {
                vendor.commission = commission.defaultCommission;
            }
        }
        vendor.customerId = customerSave.id;
        vendor.companyName = updateCustomerParam.companyName;
        vendor.companyDescription = updateCustomerParam.companyDescription;
        vendor.paymentInformation = updateCustomerParam.paymentInformation;
        vendor.companyAddress1 = updateCustomerParam.companyAddress1;
        vendor.companyAddress2 = updateCustomerParam.companyAddress2;
        vendor.companyCity = updateCustomerParam.companyCity;
        vendor.companyState = updateCustomerParam.companyState;
        vendor.shippingCountryId = updateCustomerParam.shippingCountryId;
        vendor.shippingAddressState = updateCustomerParam.shippingAddressState;
        vendor.shippingAddressCity = updateCustomerParam.shippingAddressCity;
        vendor.shippingAddressLine1 = updateCustomerParam.shippingAddressLine1;
        vendor.shippingAddressLine2 = updateCustomerParam.shippingAddressLine2;
        vendor.shippingAddressStreet = updateCustomerParam.shippingAddressStreet;
        vendor.shippingAddressNotes = updateCustomerParam.shippingAddressNotes;

        // @ If billing address was not defined then set the shipping address as the default value
        vendor.billingAddressCountryId = updateCustomerParam.billingAddressCountryId || updateCustomerParam.shippingCountryId;
        vendor.billingAddressState = updateCustomerParam.billingAddressState;
        vendor.billingAddressCity = updateCustomerParam.billingAddressCity;
        vendor.billingAddressLine1 = updateCustomerParam.billingAddressLine1;
        vendor.billingAddressLine2 = updateCustomerParam.billingAddressLine2;
        vendor.billingAddressStreet = updateCustomerParam.billingAddressStreet;
        vendor.billingAddressNotes = updateCustomerParam.billingAddressNotes;
        vendor.iban = updateCustomerParam.iban;
        vendor.currency = updateCustomerParam.currency;
        vendor.sellerAccountSettingsId = updateCustomerParam.sellerAccountSettingsId;

        vendor.pincode = updateCustomerParam.pincode;
        vendor.companyMobileNumber = updateCustomerParam.companyMobileNumber;
        vendor.companyEmailId = updateCustomerParam.companyEmailId;
        vendor.companyWebsite = updateCustomerParam.companyWebsite;
        vendor.companyGstNumber = updateCustomerParam.companyGstNumber;
        vendor.companyPanNumber = updateCustomerParam.companyPanNumber;
        const vendorSave = await this.vendorService.update(vendor.vendorId, vendor);
        if (vendorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Vendor Updated Successfully',
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

    // Vendor List API
    /**
     * @api {get} /api/admin-vendor/vendorlist Vendor List API
     * @apiGroup Admin vendor
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
     *      "message": "Successfully get vendor list",
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
     * @apiSampleRequest /api/admin-vendor/vendorlist
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendorlist')
    @Authorized()
    public async vendorList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('name') name: string, @QueryParam('status') status: string, @QueryParam('email') email: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['vendor.vendorId', 'vendor.vendorPrefixId', 'vendor.customerId', 'vendor.commission', 'vendor.approvalFlag', 'vendor.companyName'];

        const searchConditions = [];

        const whereConditions: any = [
            {
                name: 'vendor.customerId',
                op: 'where',
                value: 0,
            },
            {
                name: 'vendor.customerId',
                op: 'email',
                value: email,
            },
            {
                name: 'vendor.customerId',
                op: 'status',
                value: status,
            },
            {
                name: 'vendor.customerId',
                op: 'name',
                value: name,
            },
        ];
        const vendorList = await this.vendorService.vendorList(limit, offset, select, searchConditions, whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got vendor count',
                data: vendorList,
            };
            return response.status(200).send(successRes);
        }
        const vendorCustomerList = vendorList.map(async (value: any) => {
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
        const results = await Promise.all(vendorCustomerList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Vendor list.',
            data: results,
        };
        return response.status(200).send(successResponse);

    }

    // Vendor Details Excel Document Download
    /**
     * @api {get} /api/admin-vendor/vendor-excel-list Vendor Excel
     * @apiGroup Admin vendor
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Vendor Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-excel-list
     * @apiErrorExample {json} Vendor Excel List error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */

    @Get('/vendor-excel-list')
    public async excelVendorView(@QueryParam('vendorId') vendorId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor list Sheet');
        const rows = [];
        worksheet.columns = [
            { header: 'Vendor Id', key: 'id', size: 16, width: 15 },
            { header: 'Vendor Prefix Id', key: 'vendorPrefixId', size: 16, width: 15 },
            { header: 'Vendor Name', key: 'firstName', size: 16, width: 15 },
            { header: 'Email Id', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
            { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
            { header: 'commission', key: 'commission', size: 16, width: 15 },
            { header: 'companyName', key: 'createdDate', size: 16, width: 15 },
            { header: 'approvalFlag', key: 'approvalFlag', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        if (vendorId) {
            const vendorsid = vendorId.split(',');
            for (const id of vendorsid) {
                const dataId = await this.vendorService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid vendorId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of vendorsid) {
                const dataId = await this.vendorService.findOne(id);
                console.log(dataId.commission);
                const customer = await this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                if (customer) {
                    rows.push([dataId.vendorId, dataId.vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission, dataId.companyName, dataId.approvalFlag]);
                }
            }
        } else {
            const vendors = await this.vendorService.findAll();
            if (vendors === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Vendors are empty',
                };
                return response.status(400).send(errorResponse);
            }
            for (const vendor of vendors) {
                const dataId = await this.vendorService.findOne(vendor.vendorId);
                console.log(dataId.commission);
                const customer = await this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                if (customer) {
                    rows.push([dataId.vendorId, dataId.vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission, dataId.companyName, dataId.approvalFlag]);
                }
            }
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorExcel_' + Date.now() + '.xlsx';
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

    // Get vendor Detail API
    /**
     * @api {get} /api/admin-vendor/vendor-details/:id Vendor Details API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor Details",
     * "data":{
     * "vendorId" : "",
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
     * @apiSampleRequest /api/admin-vendor/vendor-details/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/vendor-details/:id')
    @Authorized()
    public async vendorDetails(@Param('id') Id: number, @Res() response: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            select: ['vendorId', 'vendorPrefixId', 'customerId', 'commission', 'companyLogo', 'companyLogoPath', 'companyName',
                'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'sellerAccountSettingsId',
                'shippingCountryId', 'shippingAddressState', 'shippingAddressCity', 'shippingAddressLine1', 'shippingAddressLine2', 'shippingAddressStreet', 'shippingAddressNotes',
                'billingAddressCountryId', 'billingAddressState', 'billingAddressCity', 'billingAddressLine1', 'billingAddressLine2', 'billingAddressStreet', 'billingAddressNotes', 'iban', 'currency',
                'pincode', 'companyPanNumber', 'companyGstNumber', 'companyEmailId', 'companyWebsite', 'companyMobileNumber', 'paymentInformation'],
            where: { vendorId: Id },
        });
        const vendorDetails: any = vendor;

        vendorDetails.customerDetail = await this.customerService.findOne({
            select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive'],
            where: { id: vendor.customerId },
        });
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: vendor.shippingCountryId },
        });
        if (country) {
            vendorDetails.countryName = country.name;
        }
        const product = await this.vendorProductService.find({
            select: ['productId'],
            where: { vendorId: Id },
        });
        vendorDetails.productCount = product.length;
        vendorDetails.vendorCategories = await this.vendorCategoryService.findAll({
            select: ['vendorCategoryId', 'categoryId', 'vendorId'],
            where: { vendorId: vendor.vendorId },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                const temp: any = value;
                if (categoryNames !== undefined) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });

        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor details. ',
            data: vendorDetails,
        };
        return response.status(200).send(successResponse);

    }

    // Approve vendors  API
    /**
     * @api {put} /api/admin-vendor/approve-vendor/:id Vendor Approval API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} approvalFlag approval flag should be 1
     * @apiParamExample {json} Input
     * {
     *      "approvalFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully approved vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/approve-vendor/:id
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/approve-vendor/:id')
    @Authorized()
    public async vendorApproval(@Param('id') id: number, @BodyParam('approvalFlag') approvalFlag: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendorId',
            };
            return response.status(400).send(errorResponse);
        }

        if (vendor.approvalFlag === 1) {
            const errorResponse: any = {
                status: 0,
                message: 'Vendor Already Approved',
            };
            return response.status(400).send(errorResponse);
        }

        vendor.approvalFlag = approvalFlag;
        vendor.approvedBy = request.user.userId;
        const today = new Date().toISOString().slice(0, 10);
        vendor.approvalDate = today;
        const vendorSave = await this.vendorService.create(vendor);
        if (env.imageserver === 's3') {
            const prefixId = vendorSave.vendorPrefixId.replace('#', '');
            await this.s3Service.createFolder(prefixId);
        } else {
            const prefixId = vendorSave.vendorPrefixId.replace('#', '');
            await this.imageService.createFolder(prefixId);
        }
        const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
        vendorCustomer.isActive = 1;
        await this.customerService.create(vendorCustomer);
        if (vendorSave) {
            const emailContent = await this.emailTemplateService.findOne(15);
            const setting = await this.settingService.findOne();
            const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{sitename}', setting.storeName);
            MAILService.customerLoginMail(message, vendorCustomer.email, emailContent.subject);
            const successResponse: any = {
                status: 1,
                message: 'Vendor Approved and email sent to vendor with login credential',
                data: vendorSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to approve vendor',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Vendor API
    /**
     * @api {delete} /api/admin-vendor/delete-vendor/:id Delete single Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/delete-vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete-vendor/:id')
    @Authorized()
    public async deleteVendor(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendorId',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
        if (product) {
            const errorResponse: any = {
                status: 0,
                message: 'Listing(s) are mapped for this crafter. So please delete them first!',
            };
            return response.status(400).send(errorResponse);
        }
        const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
        customer.deleteFlag = 1;
        const deleteCustomer = await this.customerService.update(customer.id, customer);
        if (deleteCustomer) {

            await this.cognitoService.Delete(customer.username);

            const successResponse: any = {
                status: 1,
                message: 'Vendor Deleted Successfully',
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
     * @api {post} /api/admin-vendor/delete-multiple-vendor Delete Multiple Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiParamExample {json} Input
     * {
     * "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted vendors.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/delete-multiple-vendor
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/delete-multiple-vendor')
    @Authorized()
    public async deleteMultipleCustomer(@BodyParam('vendorId') vendorId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const customer: any = vendorId.split(',');
        console.log(customer);
        const data: any = customer.map(async (id: any) => {
            const dataId = await this.vendorService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose customer for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const product = await this.vendorProductService.findOne({ where: { vendorId: dataId.vendorId } });
                if (product) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Products are mapped for one of the selected vendor.So please delete that product',
                    };
                    return response.status(400).send(errorResponse);
                }
                
                const customerDelete = await this.customerService.findOne({ where: { id: dataId.customerId } });
                customerDelete.deleteFlag = 1;
                
                await this.cognitoService.Delete(customerDelete.username);

                return await this.customerService.update(customerDelete.id, customerDelete);
            }
        });
        const deleteAllCustomers = await Promise.all(data);
        if (deleteAllCustomers) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted vendor',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Update Vendor commission  API
    /**
     * @api {put} /api/admin-vendor/update-vendor-commission/:vendorId Update Vendor Commission API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} commission commission
     * @apiParamExample {json} Input
     * {
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated vendor commission",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/update-vendor-commission/:vendorId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update-vendor-commission/:vendorId')
    @Authorized()
    public async updateVendorCommission(@Param('vendorId') vendorId: number, @BodyParam('commission') commission: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendorId',
            };
            return response.status(400).send(errorResponse);
        }

        vendor.commission = commission;
        const vendorSave = await this.vendorService.update(vendor.vendorId, vendor);
        if (vendorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Vendor Commission ',
                data: vendorSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update Vendor Commission',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Verify Customer Document API
    /**
     * @api {put} /api/admin-vendor/verify-customer-document/:customerDocumentId Verify Customer Document API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} documentStatus documentStatus
     * @apiParamExample {json} Input
     * {
     *      "documentStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully verify customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/verify-customer-document/:customerDocumentId
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/verify-customer-document/:customerDocumentId')
    @Authorized()
    public async verifyCustomerDocument(@Param('customerDocumentId') customerDocumentId: number, @BodyParam('documentStatus') documentStatus: number, @Res() response: any): Promise<any> {
        const customerDocument = await this.customerDocumentService.findOne({
            where: {
                customerDocumentId,
            },
        });
        console.log(customerDocument);
        if (!customerDocument) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customerDocumentId',
            };
            return response.status(400).send(errorResponse);
        }
        customerDocument.documentStatus = documentStatus;
        const updateCustomer = await this.customerDocumentService.create(customerDocument);
        const successResponse: any = {
            status: 1,
            message: 'successfully verified the customer document',
            data: updateCustomer,
        };
        return response.status(200).send(successResponse);
    }

    // Get Customer Document List
    /**
     * @api {get} /api/admin-vendor/customer-document-list Get Customer Document List
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {number} vendorId vendorId
     * @apiParam (Request body) {number} count count
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "search" : "",
     *      "vendorId" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/customer-document-list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/customer-document-list')
    @Authorized()
    public async customerDocumentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('vendorId') vendorId: number, @QueryParam('count') count: number, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });
        console.log(vendor);
        const search: any = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
        ];
        const select = ['customerDocumentId', 'customerId', 'title', 'name', 'path', 'documentStatus'];
        const whereConditions: any = [
            {
                name: 'customerId',
                value: vendor.customerId,
            },
        ];
        const customerDoc = await this.customerDocumentService.list(limit, offset, select, search, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'successfully list the customer document',
            data: customerDoc,
        };
        return response.status(200).send(successResponse);
    }

    // Download Customer Document API
    /**
     * @api {get} /api/admin-vendor/download-customer-document/:customerDocumentId Download Customer Document API
     * @apiGroup Admin vendor
     * @apiParamExample {json} Input
     * {
     *      "customerDocumentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully download customer document file.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/download-customer-document/:customerDocumentId
     * @apiErrorExample {json} Download error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/download-customer-document/:customerDocumentId')
    public async downloadCustomerDocument(@Param('customerDocumentId') customerDocumentId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const customerDocument = await this.customerDocumentService.findOne(customerDocumentId);
        if (customerDocument === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer document Id',
            };
            return response.status(400).send(errorResponse);
        }
        const file = customerDocument.name;
        const filePath = customerDocument.path;
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.fileDownload(filePath, file);
        } else {
            val = await this.imageService.fileDownload(filePath, file);
        }
        if (val) {
            return new Promise((resolve, reject) => {
                response.download(val, file);
            });
        } else {
            return response.status(400).send({ status: 0, message: 'Download Failed' });
        }
    }

    private async createVendor(model: CreateVendorRequest, customer: Customer): Promise<Vendor> {
        const vendor = new Vendor();
        vendor.approvalFlag = 0;
        if (model.commission) {
            vendor.commission = model.commission;
        } else {
            const commission = await this.vendorGlobalSettingService.findOne();
            if (commission) {
                vendor.commission = commission.defaultCommission;
            }
        }
        vendor.customerId = customer.id;
        vendor.ambassadorCode = ''; // customerParam.ambassadorCode;
        vendor.accountType = 0;
        vendor.companyName = model.companyName;
        vendor.companyDescription = model.companyDescription;
        vendor.paymentInformation = model.paymentInformation;
        vendor.companyAddress1 = model.companyAddress1;
        vendor.companyAddress2 = model.companyAddress2;
        vendor.companyCity = model.companyCity;
        vendor.companyState = model.companyState;
        vendor.shippingCountryId = model.shippingCountryId;
        vendor.shippingAddressState = model.shippingAddressState;
        vendor.shippingAddressCity = model.shippingAddressCity;
        vendor.shippingAddressLine1 = model.shippingAddressLine1;
        vendor.shippingAddressLine2 = model.shippingAddressLine2;
        vendor.shippingAddressStreet = model.shippingAddressStreet;
        vendor.shippingAddressNotes = model.shippingAddressNotes;
        vendor.billingAddressCountryId = model.billingAddressCountryId;
        vendor.billingAddressState = model.billingAddressState;
        vendor.billingAddressCity = model.billingAddressCity;
        vendor.billingAddressLine1 = model.billingAddressLine1;
        vendor.billingAddressLine2 = model.billingAddressLine2;
        vendor.billingAddressStreet = model.billingAddressStreet;
        vendor.billingAddressNotes = model.billingAddressNotes;
        vendor.iban = model.iban;
        vendor.currency = model.currency;
        vendor.sellerAccountSettingsId = model.sellerAccountSettingsId;

        vendor.pincode = model.pincode;
        vendor.companyMobileNumber = model.companyMobileNumber;
        vendor.companyEmailId = model.companyEmailId;
        vendor.companyWebsite = model.companyWebsite;
        vendor.companyGstNumber = model.companyGstNumber;
        vendor.companyPanNumber = model.companyPanNumber;
        vendor.approvedBy = 0;
        vendor.approvalDate = undefined;
        vendor.sellerAccountSettingsId = model.sellerAccountSettingsId;

        const vendors = await this.vendorService.create(vendor);

        vendor.vendorPrefixId = '#Ven-0'.concat(vendors.vendorId.toString());
        const val = await this.vendorService.update(vendors.vendorId, vendor);
        if (env.imageserver === 's3') {
            await this.s3Service.createFolder(val.vendorPrefixId);
        } else {
            await this.imageService.createFolder(val.vendorPrefixId);
        }
        if (model.companyLogo) {
            const type = model.companyLogo.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'logo/';
            const base64Data = new Buffer(model.companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            vendor.companyLogo = name;
            vendor.companyLogoPath = path;
        }
        return vendor;
    }
}
