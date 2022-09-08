/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    JsonController,
    Res,
    Req,
    Param,
    Get,
} from 'routing-controllers';
import { CountryService } from '../../services/CountryService';
import { AmbassadorService } from '../../services/AmbassadorService';
import { CustomerService } from '../../services/CustomerService';

@JsonController('/ambassador-store')
export class AmbassadorStoreController {
    constructor(private ambassadorService: AmbassadorService,
                private countryService: CountryService,
                private customerService: CustomerService
    ) {
    }

    // Get ambassador Detail API
    /**
     * @api {get} /api/ambassador-store/ambassador-details/:id Ambassador Details API
     * @apiGroup ambassador store
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
     * @apiSampleRequest /api/ambassador-store/ambassador-details/:id
     * @apiErrorExample {json} ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/ambassador-details/:id')
    public async storeAmbassadorDetails(@Param('id') Id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const ambassador = await this.ambassadorService.findOne({
            select: ['ambassadorId', 'ambassadorCode', 'customerId', 'address1', 'address2', 'city', 'state', 'countryId',
                'pincode', 'commission'],
            where: { ambassadorId: Id },
        });
        const ambassadorDetail: any = ambassador;
        ambassadorDetail.customerDetails = await this.customerService.findOne({
            select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive'],
            where: { id: ambassador.customerId },
        });
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: ambassador.countryId },
        });
        if (country) {
            ambassadorDetail.countryName = country.name;
        }

        // ambassadorDetail.productCount = products.length;
        // ambassadorDetail.productlist = productList;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got ambassador details. ',
            data: ambassadorDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Get ambassador Detail API
    /**
     * @api {get} /api/admin-ambassador/ambassador-details-by-code/:code Ambassador Details By Code API
     * @apiGroup ambassador store
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
     * @apiSampleRequest /api/admin-ambassador/ambassador-details-by-code/:id
     * @apiErrorExample {json} ambassador error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/ambassador-details-by-code/:code')
    public async ambassadorByCode(@Param('code') code: string, @Res() response: any): Promise<any> {
        const ambassador = await this.ambassadorService.findOne({
            select: ['ambassadorId', 'ambassadorCode', 'customerId', 'commission',
                'address1', 'address2', 'city', 'state', 'countryId',
                'pincode', 'paymentInformation'],
            where: { ambassadorCode: code },
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

}
