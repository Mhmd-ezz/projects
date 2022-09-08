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
  Res,
  Req,
  Authorized,
  Get,
  QueryParam,
  Put,
  BodyParam,
  Param,
} from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { MAILService } from '../../../../auth/mail.services';
import { VendorRegisterRequest } from './requests/VendorRegistrationRequest';
import { VendorForgotPasswordRequest } from './requests/VendorForgotPasswordRequest';
import { Customer } from '../../../models/Customer';
import { Vendor } from '../../../models/Vendor';
import { LoginLog } from '../../../models/LoginLog';
import { CustomerService } from '../../../services/CustomerService';
import { VendorService } from '../../../services/VendorService';
import { UserService } from '../../../services/UserService';
import { VendorCategoryService } from '../../../services/VendorCategoryService';
import { LoginLogService } from '../../../services/LoginLogService';
import { EmailTemplateService } from '../../../services/EmailTemplateService';
import { CategoryService } from '../../../services/CategoryService';
import { CountryService } from '../../../services/CountryService';
import { VendorLogin } from './requests/VendorLoginRequest';
// import jwt from 'jsonwebtoken';
import { Validator } from 'class-validator';
import { S3Service } from '../../../services/S3Service';
import { ImageService } from '../../../services/ImageService';
import { env } from '../../../../env';
import { UpdateVendorRequest } from './requests/UpdateVendorRequest ';
const validator: any = new Validator();
import { VendorOrdersService } from '../../../services/VendorOrderService';
import { ProductService } from '../../../services/ProductService';
import { VendorProductService } from '../../../services/VendorProductService';
import { VendorOrderStatusService } from '../../../services/VendorOrderStatusService';
import { SettingService } from '../../../services/SettingService';
import { CurrencyService } from '../../../services/CurrencyService';
import { CustomerDocument } from '../../../models/CustomerDocument';
import { CustomerDocumentService } from '../../../services/CustomerDocumentService';
import { AmbassadorService } from '../../../services/AmbassadorService';
import CognitoAuthService from '../../../../auth/cognitoAuthServices';
import { VendorConfirmPasswordRequest } from './requests/VendorConfirmPasswordRequest';

@JsonController('/vendor')
export class VendorController {
  constructor(
    private customerService: CustomerService,
    private vendorService: VendorService,
    private ambassadorService: AmbassadorService,
    private emailTemplateService: EmailTemplateService,
    private userService: UserService,
    private vendorCategoryService: VendorCategoryService,
    private categoryService: CategoryService,
    private s3Service: S3Service,
    private imageService: ImageService,
    private countryService: CountryService,
    private loginLogService: LoginLogService,
    private vendorOrdersService: VendorOrdersService,
    private productService: ProductService,
    private vendorProductService: VendorProductService,
    private settingService: SettingService,
    private currencyService: CurrencyService,
    private vendorOrderStatusService: VendorOrderStatusService,
    private customerDocumentService: CustomerDocumentService,
    private cognitoService: CognitoAuthService
  ) { }

  // Customer Register API
  /**
   * @api {post} /api/vendor/register register API
   * @apiGroup Vendor
   * @apiParam (Request body) {String} firstName first Name
   * @apiParam (Request body) {String} lastName last Name
   * @apiParam (Request body) {String} contactPersonName contactPersonName
   * @apiParam (Request body) {String} password Vendor Password
   * @apiParam (Request body) {String} confirmPassword Confirm Password
   * @apiParam (Request body) {String} emailId Vendor Email Id
   * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
   * @apiParamExample {json} Input
   * {
   *      'firstName' : '',
   *      'lastName' : '',
   *      'contactPersonName' : '',
   *      'password' : '',
   *      'confirmPassword' : '',
   *      'emailId' : '',
   *      'phoneNumber' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Thank you for registering with us for selling your product and please check your email',
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/register
   * @apiErrorExample {json} Vendor Register error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  // Vendor Register Function
  @Post('/register')
  public async register(
    @Body({ validate: true }) registerParam: VendorRegisterRequest,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {

    // ----> Start validation
    if (registerParam.password !== registerParam.confirmPassword) {
      return response.status(422).send({
        message: 'Your password and confirmPassword are not the same',
        status: 0,
      });
    }
    if (registerParam.phoneNumber) {
      if (
        !validator.maxLength(registerParam.phoneNumber, 15)
        // ||
        // !validator.isNumberString(registerParam.phoneNumber)
      ) {
        return response.status(422).send({
          message: 'Please provide valid mobile number',
          status: 0,
        });
      }
    }
    if (registerParam.ambassadorCode) {
      const ambassador = await this.ambassadorService.findOne({
        where: { ambassadorCode: registerParam.ambassadorCode },
      });
      if (ambassador === undefined) {
        return response.status(422).send({
          message: 'Please provide a valid ambassador code',
          status: 0,
        });
      }
    }
    if (registerParam.accountType) {
      if (!validator.isIn(registerParam.accountType, [0, 1, 2])) {
        return response.status(422).send({
          message: 'Please provide valid account type',
          status: 0,
        });
      }
    }
    // ----> Done validation
    const customer = await this.customerService.findOne({
      where: { email: registerParam.emailId, deleteFlag: 0 },
    });
    if (customer) {
      const existingVendor = await this.vendorService.findOne({
        where: { customerId: customer.id },
      });
      if (existingVendor) {
        console.log(existingVendor.customerId + 'customerId');
        const successResponse: any = {
          status: 1,
          message: 'You already registered please login or confirm your email.',
        };
        return response.status(400).send(successResponse);
      } else {
        // if (registerParam.password === registerParam.confirmPassword) {
        // const customer = await this.customerService.findOne({
        //   where: { email: registerParam.emailId, deleteFlag: 0 },
        // });

        customer.firstName = registerParam.firstName;
        customer.lastName = registerParam.lastName;
        // customer.password = await Customer.hashPassword(
        //   registerParam.password
        // );
        customer.mobileNumber = registerParam.phoneNumber;
        customer.isActive = 1;
        customer.deleteFlag = 0;
        const customerUpdated = await this.customerService.create(customer);
        if (customerUpdated) {
          const newVendor = new Vendor();
          newVendor.contactPersonName = registerParam.contactPersonName;
          newVendor.ambassadorCode = registerParam.ambassadorCode || '';
          newVendor.accountType = registerParam.accountType || 0;
          newVendor.customerId = customer.id;
          newVendor.approvalFlag = 1;
          newVendor.shippingCountryId = registerParam.shippingCountryId;
          let createdVendor: Vendor;
          try {
            createdVendor = await this.vendorService.create(newVendor);
          } catch (error) {
            const errorResponse: any = {
              status: 0,
              message: 'Failed to register new vendor due to errors ' + error.message,              
            };
            return response.status(400).send(errorResponse);
          }

          const venExtension = createdVendor.vendorId
            .toString()
            .padStart(createdVendor.vendorId.toString().length + 1, '0');
          newVendor.vendorPrefixId = '#Ven-'.concat(venExtension);
          await this.vendorService.update(createdVendor.vendorId, newVendor);
        }
        // const emailContentVendor = await this.emailTemplateService.findOne(
        //   11
        // );
        const emailContentAdmin = await this.emailTemplateService.findOne(12);
        // const message = emailContentVendor.content.replace(
        //   '{name}',
        //   customer.firstName + ' ' + customer.lastName
        // );
        const adminMessage = emailContentAdmin.content.replace(
          '{vendorName}',
          customer.firstName + ' ' + customer.lastName
        );
        const adminId: any = [];
        const adminUser = await this.userService.findAll({
          select: ['email'],
          where: { userGroupId: 1, deleteFlag: 0 },
        });
        for (const user of adminUser) {
          const val = user.email;
          adminId.push(val);
        }
        const sendMailRes = MAILService.registerMail(
          adminMessage,
          adminId,
          emailContentAdmin.subject
        );
        // const sendMailRes = MAILService.registerMail(
        //   message,
        //   customer.email,
        //   emailContentVendor.subject
        // );
        if (sendMailRes) {
          const successResponse: any = {
            status: 1,
            message:
              'Thank you for expressing your interest and registering with OCrafter for selling your products.', // Kindly wait for admin approval',
            data: classToPlain(customer),
          };
          return response.status(200).send(successResponse);
        } else {
          const errorResponse: any = {
            status: 0,
            message: 'Registration successful, but unable to send email. ',
          };
          return response.status(400).send(errorResponse);
        }
        // }
        // const errorPasswordResponse: any = {
        //   status: 0,
        //   message: 'A mismatch between password and confirm password. ',
        // };
        // return response.status(400).send(errorPasswordResponse);
      }
    } else {
      // if (registerParam.password === registerParam.confirmPassword) {
      const newUser = new Customer();
      newUser.firstName = registerParam.firstName;
      newUser.lastName = registerParam.lastName;
      // newUser.password = await Customer.hashPassword(registerParam.password);
      let username = '';
      try {
        const createResult = await this.cognitoService.Register(
          registerParam.emailId,
          registerParam.emailId,
          registerParam.password
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
      newUser.username = username; // registerParam.emailId;
      newUser.email = registerParam.emailId;
      newUser.mobileNumber = registerParam.phoneNumber;
      newUser.isActive = 1;
      newUser.deleteFlag = 0;
      newUser.ip = (
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress
      ).split(',')[0];
      const resultData = await this.customerService.create(newUser);
      const vendor = new Vendor();
      vendor.ambassadorCode = registerParam.ambassadorCode || '';
      vendor.accountType = registerParam.accountType || 0;
      vendor.contactPersonName = registerParam.contactPersonName;
      vendor.customerId = resultData.id;
      vendor.approvalFlag = 1;
      vendor.shippingCountryId = registerParam.shippingCountryId;
      let createdVendor: Vendor;
      try {
        createdVendor = await this.vendorService.create(vendor);
      } catch (error) {
        const errorResponse: any = {
          status: 0,
          message: 'Failed to register new vendor due to errors ' + error.message,
          error,
        };
        return response.status(400).send(errorResponse);
      }
      const venExtension = createdVendor.vendorId
        .toString()
        .padStart(createdVendor.vendorId.toString().length + 1, '0');
      vendor.vendorPrefixId = '#Ven-'.concat(venExtension);
      await this.vendorService.update(createdVendor.vendorId, vendor);
      // const emailContentVendor = await this.emailTemplateService.findOne(11);
      const emailContentAdmin = await this.emailTemplateService.findOne(12);
      // const message = emailContentVendor.content.replace(
      //   '{name}',
      //   resultData.firstName + ' ' + resultData.lastName
      // );
      const adminMessage = emailContentAdmin.content.replace(
        '{vendorName}',
        resultData.firstName + ' ' + resultData.lastName
      );
      const adminId: any = [];
      const adminUser = await this.userService.findAll({
        select: ['email'],
        where: { userGroupId: 1, deleteFlag: 0 },
      });
      for (const user of adminUser) {
        const val = user.email;
        adminId.push(val);
      }
      const sendMailRes = MAILService.registerMail(
        adminMessage,
        adminId,
        emailContentAdmin.subject
      );
      // const sendMailRes = MAILService.registerMail(
      //   message,
      //   resultData.email,
      //   emailContentVendor.subject
      // );
      if (sendMailRes) {
        const successResponse: any = {
          status: 1,
          message:
            'Thank you for expressing your interest and registering with OCrafter for selling your products.', // Kindly wait for admin approval',
          data: classToPlain(resultData),
        };
        return response.status(200).send(successResponse);
      } else {
        const errorResponse: any = {
          status: 0,
          message: 'Registration successful, but unable to send email. ',
        };
        return response.status(400).send(errorResponse);
      }
      // } else {
      //   const errorPasswordResponse: any = {
      //     status: 0,
      //     message: 'A mismatch between password and confirm password. ',
      //   };
      //   return response.status(400).send(errorPasswordResponse);
      // }
    }
  }

  // Login API
  /**
   * @api {post} /api/vendor/login login API
   * @apiGroup Vendor
   * @apiParam (Request body) {String} emailId User Email Id
   * @apiParam (Request body) {String} password User Password
   * @apiParamExample {json} Input
   * {
   *      'emailId' : '',
   *      'password' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'data': '{
   *         'token':''
   *      }',
   *      'message': 'Successfully loggedIn',
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/login
   * @apiErrorExample {json} Login error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  // Login Function
  @Post('/login')
  public async login(
    @Body({ validate: true }) loginParam: VendorLogin,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {

    const customer = await this.customerService.findOne({
      where: { email: loginParam.emailId, deleteFlag: 0 },
    });

    if (customer === undefined) {
      const notFountResponse: any = {
        status: 0,
        message: 'Invalid EmailId',
      };
      return response.status(400).send(notFountResponse);
    }
    const findVendor = await this.vendorService.findOne({
      where: { customerId: customer.id, approvalFlag: 1 },
    });
    if (findVendor === undefined) {
      const errorUserNameResponse: any = {
        status: 0,
        message: 'Invalid EmailId or Not Approved',
      };
      return response.status(400).send(errorUserNameResponse);
    }
    const resultData: any = customer;
    resultData.vendorId = findVendor.vendorId;
    resultData.vendorPrefixId = findVendor.vendorPrefixId.replace('#', '');
    const setting = await this.settingService.findOne();
    if (setting) {
      const currencyVal = await this.currencyService.findOne(
        setting.storeCurrencyId
      );
      if (currencyVal) {
        resultData.currencyCode = currencyVal.code;
        resultData.currencySymbolLeft = currencyVal.symbolLeft;
        resultData.currencySymbolRight = currencyVal.symbolRight;
      }
    }

    if (resultData.isActive === 0) {
      const errorUserInActiveResponse: any = {
        status: 0,
        message: 'InActive Vendor.',
      };
      return response.status(400).send(errorUserInActiveResponse);
    }
    const loginResult = await this.cognitoService.Login(
      loginParam.emailId,
      loginParam.password
    );
    const token = loginResult;
    // if (await Customer.comparePassword(resultData, loginParam.password)) {
    // create a token
    // const token = jwt.sign({ id: findVendor.vendorId }, '123##$$)(***&');
    const loginLog = new LoginLog();
    loginLog.customerId = resultData.id;
    loginLog.emailId = resultData.email;
    loginLog.firstName = resultData.firstName;
    loginLog.ipAddress = (
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress
    ).split(',')[0];
    const savedloginLog = await this.loginLogService.create(loginLog);

    customer.lastLogin = savedloginLog.createdDate;
    await this.customerService.update(customer.id, customer);
    const successResponse: any = {
      status: 1,
      message: 'Loggedin successfully',
      data: {
        token,
        user: classToPlain(resultData),
      },
    };
    return response.status(200).send(successResponse);
    // }
    // const errorResponse: any = {
    //   status: 0,
    //   message: 'Invalid password',
    // };
    // return response.status(400).send(errorResponse);
  }

  // Get vendor profile API
  /**
   * @api {get} /api/vendor/vendor-profile Vendor Get Profile  API
   * @apiGroup  Vendor
   * @apiHeader {String} Authorization
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   * 'message': 'Successfully got vendor Details',
   * 'data':{
   * 'vendorId' : '',
   * 'firstName' : '',
   * 'lastName' : '',
   * 'email' : '',
   * 'mobileNumber' : '',
   * 'avatar' : '',
   * 'avatarPath' : '',
   * 'commission' : '',
   * 'status' : '',
   * }
   * 'status': '1'
   * }
   * @apiSampleRequest /api/vendor/vendor-profile
   * @apiErrorExample {json} vendor error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Get('/vendor-profile')
  @Authorized('vendor')
  public async vendorDetails(
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    // @ TODO: add shipping and billing details to select...

    const vendor = await this.vendorService.findOne({
      select: [
        'vendorId',
        'customerId',
        'companyName',
        'companyLogo',
        'companyLogoPath',
        'companyMobileNumber',
        'companyEmailId',
        'companyWebsite',
        'companyAddress1',
        'companyAddress2',
        'companyCity',
        'companyState',
        'shippingCountryId',
        'shippingAddressState',
        'shippingAddressCity',
        'shippingAddressLine1',
        'shippingAddressLine2',
        'shippingAddressStreet',
        'shippingAddressNotes',
        'billingAddressCountryId',
        'billingAddressState',
        'billingAddressCity',
        'billingAddressLine1',
        'billingAddressLine2',
        'billingAddressStreet',
        'billingAddressNotes',
        'iban',
        'currency',
        'pincode',
        'companyGstNumber',
        'companyPanNumber',
        'paymentInformation',
        'commission',
      ],
      where: { vendorId: request.user.vendorId },
    });
    const vendorDetail: any = vendor;
    vendorDetail.customerDetail = await this.customerService.findOne({
      select: [
        'firstName',
        'lastName',
        'avatar',
        'avatarPath',
        'email',
        'mobileNumber',
        'isActive',
      ],
      where: { id: vendor.customerId },
    });
    const country = await this.countryService.findOne({
      select: ['name'],
      where: { countryId: vendor.shippingCountryId },
    });
    if (country) {
      vendorDetail.countryName = country.name;
    }
    vendorDetail.vendorCategories = await this.vendorCategoryService
      .findAll({
        select: ['vendorCategoryId', 'categoryId', 'vendorId'],
        where: { vendorId: vendor.vendorId },
      })
      .then((val) => {
        const category = val.map(async (value: any) => {
          const categoryNames = await this.categoryService.findOne({
            categoryId: value.categoryId,
          });
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
      message: 'successfully got Vendor profile. ',
      data: vendorDetail,
    };
    return response.status(200).send(successResponse);
  }

  // Vendor Category List API
  /**
   * @api {get} /api/vendor/vendor-category-list Vendor Category List API
   * @apiGroup  Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {Number} limit limit
   * @apiParam (Request body) {Number} offset offset
   * @apiParam (Request body) {String} keyword keyword
   * @apiParam (Request body) {Number} count count should be number or boolean
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Successfully get vendor category list',
   *      'data':{
   *       'vendorId' : '',
   *       'vendorCategoryId' : '',
   *       'categoryId' : '',
   *       'commission' : '',
   *      }
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/vendor-category-list
   * @apiErrorExample {json} Vendor category error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Get('/vendor-category-list')
  @Authorized('vendor')
  public async vendorCategoryList(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @QueryParam('keyword') keyword: string,
    @QueryParam('count') count: number | boolean,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const vendorId = request.user.vendorId;
    const vendorCategoryList = await this.vendorCategoryService.queryCategoryList(
      limit,
      offset,
      vendorId,
      keyword,
      count
    );
    if (vendorCategoryList) {
      const successResponse: any = {
        status: 1,
        message: 'Successfully got the vendor category list.',
        data: vendorCategoryList,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'unable to list vendor category list',
      };
      return response.status(400).send(errorResponse);
    }
  }

  // Change Password API
  /**
   * @api {put} /api/vendor/change-password Change Password API
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {String} newPassword User newPassword
   * @apiParamExample {json} Input
   * {
   *      'newPassword' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Successfully Password changed',
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/change-password
   * @apiErrorExample {json} User error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Put('/change-password')
  @Authorized('vendor')
  public async changePassword(
    @BodyParam('oldPassword') oldPassword: string,
    @BodyParam('newPassword') newPassword: string,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    console.log(request.user.vendorId);
    const vendor = await this.vendorService.findOne({
      where: {
        vendorId: request.user.vendorId,
      },
    });
    if (!vendor) {
      const errResponse: any = {
        status: 0,
        message: 'Invalid vendorId',
      };
      return response.status(400).send(errResponse);
    }
    // const resultData = await this.customerService.findOne({
    //   where: { id: vendor.customerId },
    // });
    // resultData.password = await Customer.hashPassword(newPassword);
    // const updateUserData = await this.customerService.update(
    //   resultData.id,
    //   resultData
    // );
    try {
      const changeResult = await this.cognitoService.ChangePassword(
        request.user.username,
        oldPassword,
        newPassword
      );
      console.log(changeResult);
      // username = createResult.userSub;
    } catch (error) {
      const errorResponse: any = {
        status: 0,
        message: 'Failed to update user password in AWS Cognito: ' + error.message,
      };
      return response.status(400).send(errorResponse);
    }
    // if (updateUserData) {
    const successResponse: any = {
      status: 1,
      message: 'Your password changed successfully',
    };
    return response.status(200).send(successResponse);
    // }
  }

  // Forgot Password API
  /**
   * @api {post} /api/vendor/forgot-password Forgot Password API
   * @apiGroup Vendor
   * @apiParam (Request body) {String} email User email
   * @apiParamExample {json} Input
   * {
   *      'email' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Thank you. Your password send to your email',
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/forgot-password
   * @apiErrorExample {json} User error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Post('/forgot-password')
  public async forgotPassword(
    @Body({ validate: true }) forgotPasswordParam: VendorForgotPasswordRequest,
    @Res() response: any
  ): Promise<any> {
    const customer = await this.customerService.findOne({
      where: {
        email: forgotPasswordParam.email,
      },
    });
    if (!customer) {
      const errorResponse: any = {
        status: 0,
        message: 'Invalid email id',
      };
      return response.status(400).send(errorResponse);
    }

    try {
      const forgotResult = await this.cognitoService.ForgotPassword(
        customer.username
      );
      console.log(forgotResult);
    } catch (error) {
      const errorResponse: any = {
        status: 0,
        message: 'Failed while trying to handle Forgot Password request in AWS Cognito: ' + error.message,
      };
      return response.status(400).send(errorResponse);
    }
    // const tempPassword: any = Math.random().toString().substr(2, 5);
    // const password = await Customer.hashPassword(tempPassword);
    // customer.password = password;
    // await this.customerService.create(customer);
    // const emailContent = await this.emailTemplateService.findOne(2);
    // const message = emailContent.content
    //   .replace('{name}', customer.firstName)
    //   .replace('{xxxxxx}', tempPassword);
    // const sendMailRes = MAILService.passwordForgotMail(
    //   message,
    //   customer.email,
    //   emailContent.subject
    // );
    // if (sendMailRes) {
    const successResponse: any = {
      status: 1,
      message: 'Your password has been sent to your email inbox.',
    };
    return response.status(200).send(successResponse);
    // } else {
    //   const errorResponse: any = {
    //     status: 0,
    //     message: 'error in sending email.',
    //   };
    //   return response.status(400).send(errorResponse);
    // }
  }

  // confirm Password API
  /**
   * @api {post} /api/vendor/confirm-password Confirm Password API
   * @apiGroup Vendor
   * @apiParam (Request body) {String} username User name
   * @apiParam (Request body) {String} verificationCode Verification code
   * @apiParam (Request body) {String} newPassword New password
   * @apiParamExample {json} Input
   * {
   *      "username" : "",
   *      "verificationCode": "",
   *      "newPassword": ""
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      "message": "Thank you for confirming your new password",
   *      "status": "1"
   * }
   * @apiSampleRequest /api/auth/forgot-password
   * @apiErrorExample {json} User error
   * HTTP/1.1 500 Internal Server Error
   */
  @Post('/confirm-password')
  public async confirmPassword(
    @Body({ validate: true }) model: VendorConfirmPasswordRequest,
    @Res() response: any
  ): Promise<any> {

    const customer = await this.customerService.findOne({
      where: {
        username: model.username,
        // email: model.email,
      },
    });

    if (!customer) {
      const errorResponse: any = {
        status: 0,
        message: 'Invalid username or user does not exist',
      };
      return response.status(400).send(errorResponse);
    }
    try {
      const confirmResult = await this.cognitoService.ConfirmPassword(
        model.username,
        model.verificationCode,
        model.newPassword
      );
      console.log(confirmResult);
    } catch (error) {
      const errorResponse: any = {
        status: 0,
        message: 'Failed while trying to handle Confirm Password request in AWS Cognito: ' + error.message,
      };
      return response.status(400).send(errorResponse);
    }

    const successResponse: any = {
      status: 1,
      message: 'Thank you for confirming your new password',
    };
    return response.status(200).send(successResponse);
  }

  // Edit Vendor API
  /**
   * @api {put} /api/vendor/edit-vendor/:customerId Edit Vendor API
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {String} firstName First Name
   * @apiParam (Request body) {String} lastName Last Name
   * @apiParam (Request body) {String} avatar Avatar
   * @apiParam (Request body) {String} designation Designation
   * @apiParam (Request body) {String} email Email
   * @apiParam (Request body) {Number} mobileNumber Mobile Number
   * @apiParam (Request body) {String} companyName Company Name
   * @apiParam (Request body) {String} companyLogo Company Logo
   * @apiParam (Request body) {String} companyAddress1 Company Address1
   * @apiParam (Request body) {String} companyAddress2 Company Address2
   * @apiParam (Request body) {String} companyCity Company City
   * @apiParam (Request body) {String} companyState Company State
   * @apiParam (Request body) {Number} shippingCountryId Company Country Id
   * @apiParam (Request body) {String} pincode Pincode
   * @apiParam (Request body) {Number} companyMobileNumber Company Mobile Number
   * @apiParam (Request body) {String} companyEmailId Company Email Id
   * @apiParam (Request body) {String} companyWebsite Company Website
   * @apiParam (Request body) {String} companyGstNumber Company Gst Number
   * @apiParam (Request body) {String} companyPanNumber Company Pan Number
   * @apiParam (Request body) {String} paymentInformation paymentInformation
   * @apiParamExample {json} Input
   * {
   *      'firstName' : '',
   *      'lastName' : '',
   *      'avatar' : '',
   *      'designation' : '',
   *      'email' : '',
   *      'mobileNumber' : '',
   *      'companyName' : '',
   *      'companyLogo' : '',
   *      'companyAddress1' : '',
   *      'companyAddress2' : '',
   *      'companyCity' : '',
   *      'companyState' : '',
   *      'shippingCountryId' : '',
   *      'pincode' : '',
   *      'companyMobileNumber' : '',
   *      'companyEmailId' : '',
   *      'companyWebsite' : '',
   *      'companyGstNumber' : '',
   *      'companyPanNumber' : '',
   *      'paymentInformation' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'status': '1',
   *      'message': 'Edited successfully'
   *      'data' : '{}'
   * }
   * @apiSampleRequest /api/vendor/edit-vendor/:customerId
   * @apiErrorExample {json} Edit Vendor API error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Put('/edit-vendor/:customerId')
  @Authorized('vendor')
  public async update(
    @Body({ validate: true }) updateParam: UpdateVendorRequest,
    @Param('customerId') customerId: number,
    @Res() response: any
  ): Promise<any> {
    const vendor = await this.vendorService.findOne({
      where: {
        customerId,
      },
    });
    const companyLogo = updateParam.companyLogo;
    if (companyLogo) {
      const type = companyLogo.split(';')[0].split('/')[1];
      const name = 'Img_' + Date.now() + '.' + type;
      const path = 'logo/';
      const base64Data = new Buffer(
        companyLogo.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      if (env.imageserver === 's3') {
        await this.s3Service.imageUpload(path + name, base64Data, type);
      } else {
        await this.imageService.imageUpload(path + name, base64Data);
      }
      vendor.companyLogo = name;
      vendor.companyLogoPath = path;
    }

    vendor.companyName = updateParam.companyName
      ? updateParam.companyName
      : undefined;
    vendor.companyAddress1 = updateParam.companyAddress1
      ? updateParam.companyAddress1
      : undefined;
    vendor.companyAddress2 = updateParam.companyAddress2
      ? updateParam.companyAddress2
      : undefined;
    vendor.companyCity = updateParam.companyCity
      ? updateParam.companyCity
      : undefined;
    vendor.companyState = updateParam.companyState
      ? updateParam.companyState
      : undefined;
    vendor.designation = updateParam.designation
      ? updateParam.designation
      : undefined;
    vendor.shippingCountryId = updateParam.shippingCountryId
      ? updateParam.shippingCountryId
      : undefined;
    // @ TODO: add shipping and billing details here...
    vendor.shippingAddressState = updateParam.shippingAddressState;
    vendor.shippingAddressCity = updateParam.shippingAddressCity;
    vendor.shippingAddressLine1 = updateParam.shippingAddressLine1;
    vendor.shippingAddressLine2 = updateParam.shippingAddressLine2;
    vendor.shippingAddressStreet = updateParam.shippingAddressStreet;
    vendor.shippingAddressNotes = updateParam.shippingAddressNotes;
    vendor.billingAddressCountryId = updateParam.billingAddressCountryId;
    vendor.billingAddressState = updateParam.billingAddressState;
    vendor.billingAddressCity = updateParam.billingAddressCity;
    vendor.billingAddressLine1 = updateParam.billingAddressLine1;
    vendor.billingAddressLine2 = updateParam.billingAddressLine2;
    vendor.billingAddressStreet = updateParam.billingAddressStreet;
    vendor.billingAddressNotes = updateParam.billingAddressNotes;
    vendor.iban = updateParam.iban;
    vendor.currency = updateParam.currency;

    vendor.pincode = updateParam.pincode ? updateParam.pincode : undefined;
    vendor.companyMobileNumber = updateParam.companyMobileNumber
      ? updateParam.companyMobileNumber
      : undefined;
    vendor.companyEmailId = updateParam.companyEmailId
      ? updateParam.companyEmailId
      : undefined;
    vendor.companyWebsite = updateParam.companyWebsite
      ? updateParam.companyWebsite
      : undefined;
    vendor.companyGstNumber = updateParam.companyGstNumber
      ? updateParam.companyGstNumber
      : undefined;
    vendor.companyPanNumber = updateParam.companyPanNumber
      ? updateParam.companyPanNumber
      : undefined;
    vendor.paymentInformation = updateParam.paymentInformation
      ? updateParam.paymentInformation
      : undefined;
    vendor.ambassadorCode = updateParam.ambassadorCode
      ? updateParam.ambassadorCode
      : vendor.ambassadorCode;
    vendor.accountType = updateParam.accountType
      ? updateParam.accountType
      : vendor.accountType;
    const editVendor = await this.vendorService.update(vendor.vendorId, vendor);
    console.log(editVendor);
    const customer = await this.customerService.findOne({
      where: {
        id: vendor.customerId,
      },
    });
    const avatar = updateParam.avatar;
    if (avatar) {
      const type = avatar.split(';')[0].split('/')[1];
      const name = 'Img_' + Date.now() + '.' + type;
      const path = 'customer/';
      const base64Data = new Buffer(
        avatar.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      if (env.imageserver === 's3') {
        await this.s3Service.imageUpload(path + name, base64Data, type);
      } else {
        await this.imageService.imageUpload(path + name, base64Data);
      }
      customer.avatar = name;
      customer.avatarPath = path;
    }
    customer.firstName = updateParam.firstName;
    customer.lastName = updateParam.lastName;
    customer.email = updateParam.email;
    customer.mobileNumber = updateParam.mobileNumber;
    const editCustomer = await this.customerService.update(
      customer.id,
      customer
    );
    if (editCustomer) {
      const successResponse: any = {
        status: 1,
        message: 'Updated successfully',
        data: customer,
      };
      return response.status(200).send(successResponse);
    }

    const failedResponse: any = {
      status: 0,
      message: 'Update failed',
      data: customer,
    };
    return response.status(400).send(failedResponse);
  }

  // Dashboard Counts
  /**
   * @api {get} /api/vendor/total-Dashboard-counts Total Dashboard Counts
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Successfully got total dashboard counts',
   *      'data':{
   *      }
   *      'status': '1'
   * }
   * @apiSampleRequest /api/vendor/total-Dashboard-counts
   * @apiErrorExample {json} order error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Get('/total-Dashboard-counts')
  @Authorized('vendor')
  public async totalProductCounts(
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const inActiveVendorProductList = await this.productService.customVendorProductList(
      0,
      0,
      0,
      request.user.vendorId,
      '',
      ''
    );
    const activeVendorProductList = await this.productService.customVendorProductList(
      0,
      0,
      1,
      request.user.vendorId,
      '',
      ''
    );
    const select = [];
    const relation = [];
    const WhereConditions = [
      {
        name: 'vendorId',
        op: 'where',
        value: request.user.vendorId,
      },
    ];
    const totalProductCount = await this.vendorProductService.list(
      0,
      0,
      select,
      relation,
      WhereConditions,
      '',
      0
    );
    const orderList: any = await this.vendorOrdersService.searchOrderList(
      request.user.vendorId,
      '',
      '',
      '',
      '',
      0
    );
    const buyerAndRevenueCount = await this.vendorOrdersService.getBuyersCount(
      request.user.vendorId
    );
    const revenue = await this.vendorOrdersService.getTotalVendorRevenue(
      request.user.vendorId
    );
    let total = 0;
    if (revenue !== undefined) {
      for (const val of revenue) {
        const commissionPercent = val.commission;
        const commissionAmount = val.total * (commissionPercent / 100);
        const NetAmount = val.total - commissionAmount;
        total += +NetAmount;
      }
    }
    const totalRevenue = total;
    const successResponse: any = {
      status: 1,
      message: 'Successfully get Total Dashboard count',
      data: {
        inActiveVendorProductList: inActiveVendorProductList.length,
        activeProductCount: activeVendorProductList.length,
        totalProductCount: totalProductCount.length,
        totalOrderCount: orderList.length,
        salesCount: buyerAndRevenueCount.salesCount,
        revenue: totalRevenue,
      },
    };
    return response.status(200).send(successResponse);
  }

  //  order chart API
  /**
   * @api {get} /api/vendor/order-graph  order graph API
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Successfully get order statics..!!',
   *      'status': '1',
   *      'data': {},
   * }
   * @apiSampleRequest /api/vendor/order-graph
   * @apiErrorExample {json} order statics error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  // Order Detail Function
  @Get('/order-graph')
  @Authorized('vendor')
  public async topSellingProductList(
    @QueryParam('duration') duration: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const select = ['vendorOrderStatusId', 'name', 'colorCode', 'isActive'];
    const search = [
      {
        name: 'isActive',
        op: 'like',
        value: 1,
      },
    ];
    const WhereConditions = [];
    const orderStatusList = await this.vendorOrderStatusService.list(
      0,
      0,
      select,
      search,
      WhereConditions,
      0
    );
    const promise = orderStatusList.map(async (result: any) => {
      const order = await this.vendorOrdersService.findOrderCountBasedStatus(
        request.user.vendorId,
        duration,
        result.vendorOrderStatusId
      );
      const temp: any = result;
      temp.orderCount = order.orderCount;
      return temp;
    });
    const orderCount = await this.vendorOrdersService.findOrderCountBasedDuration(
      request.user.vendorId,
      duration
    );

    const value = await Promise.all(promise);

    const successResponse: any = {
      status: 1,
      message: 'Successfully get order count..!',
      data: { value, orderCount: orderCount.orderCount },
    };
    return response.status(200).send(successResponse);
  }

  // Upload Vendor Document
  /**
   * @api {post} /api/vendor/upload-customer-document Upload Vendor Document
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {String} title title
   * @apiParam (Request body) {String} customerData File
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      'message': 'Successfully saved imported data..!!',
   *      'status': '1',
   *      'data': {},
   * }
   * @apiSampleRequest /api/vendor/upload-customer-document
   * @apiErrorExample {json} Import Customer Data
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Post('/upload-customer-document')
  @Authorized('vendor')
  public async uploadCustomerDocument(
    @BodyParam('customerData') file: string,
    @BodyParam('title') title: string,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const mime = require('mime');
    console.log(file + 'file');
    console.log(title + 'title');
    const vendor = await this.vendorService.findOne({
      vendorId: request.user.vendorId,
    });
    const base64Data = new Buffer(
      file.replace(/^data:([A-Za-z-+\/]+);base64,/, ''),
      'base64'
    );
    const mimeType = this.base64MimeType(file);
    const fileType = mime.getExtension(mimeType);
    console.log(fileType + 'fileTypeeeeeeeeeeee');
    const uploadPath = 'vendordocument/';
    const fileName = 'CustomerData_' + Date.now() + '.' + fileType;
    if (env.imageserver === 's3') {
      await this.s3Service.fileUpload(
        uploadPath + fileName,
        base64Data,
        mimeType
      );
    } else {
      await this.imageService.fileUpload(uploadPath + fileName, base64Data);
    }
    const newCustomerData = new CustomerDocument();
    newCustomerData.customerId = vendor.customerId;
    newCustomerData.title = title;
    newCustomerData.name = fileName;
    newCustomerData.path = 'vendordocument/';
    const createData = await this.customerDocumentService.create(
      newCustomerData
    );
    console.log(createData);
    const successResponse: any = {
      status: 1,
      message: 'Document Uploaded Successfully',
    };
    return response.status(200).send(successResponse);
  }

  // Download Vendor Document API
  /**
   * @api {get} /api/vendor/download-customer-document/:customerDocumentId Download Vendor Document API
   * @apiGroup Vendor
   * @apiParamExample {json} Input
   * {
   *      'customerDocumentId' : '',
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   * 'message': 'Successfully download customer document file.',
   * 'status': '1'
   * }
   * @apiSampleRequest /api/vendor/download-customer-document/:customerDocumentId
   * @apiErrorExample {json} Download error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Get('/download-customer-document/:customerDocumentId')
  public async downloadCustomerDocument(
    @Param('customerDocumentId') customerDocumentId: number,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const customerDocument = await this.customerDocumentService.findOne(
      customerDocumentId
    );
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
      return response
        .status(400)
        .send({ status: 0, message: 'Download Failed' });
    }
  }

  // Get Vendor Document List
  /**
   * @api {get} /api/vendor/customer-document-list Get Vendor Document List
   * @apiGroup Vendor
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {Number} limit limit
   * @apiParam (Request body) {Number} offset offset
   * @apiParam (Request body) {Number} count count should be number or boolean
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   * 'message': 'Successfully get customer document list',
   * 'data':{},
   * 'status': '1'
   * }
   * @apiSampleRequest /api/vendor/customer-document-list
   * @apiErrorExample {json} customer error
   * HTTP/1.1 500 Internal Server Error
   * @apiVersion 0.1.0
   */
  @Get('/customer-document-list')
  @Authorized('vendor')
  public async customerDocumentList(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @QueryParam('count') count: number | boolean,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const vendor = await this.vendorService.findOne({
      where: {
        vendorId: request.user.vendorId,
      },
    });
    console.log(vendor.customerId + 'customerIddddd');
    const select = [
      'customerDocumentId',
      'customerId',
      'title',
      'name',
      'path',
      'documentStatus',
    ];
    const whereConditions: any = [
      {
        name: 'customerId',
        value: vendor.customerId,
      },
    ];
    const search: any = [];
    const customerDoc = await this.customerDocumentService.list(
      limit,
      offset,
      select,
      search,
      whereConditions,
      count
    );
    const successResponse: any = {
      status: 1,
      message: 'successfully list the customer document',
      data: customerDoc,
    };
    return response.status(200).send(successResponse);
  }

  public base64MimeType(encoded: string): string {
    let result = undefined;

    if (typeof encoded !== 'string') {
      return result;
    }

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }
}
