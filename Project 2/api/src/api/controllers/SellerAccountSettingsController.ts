/*
import { CreateSellerAccountSettingsRequest } from "./requests/CreateSellerAccountSettingsRequest";
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
    Put,
    Get,
    Authorized,
    QueryParam,
    Delete,
    Param,
    Req,
} from 'routing-controllers';

import { CreateSellerAccountSettings } from './requests/CreateSellerAccountSettingsRequest';
import { SellerAccountSettingsService } from '../services/SellerAccountSettingsService';
import { UpdateSellerAccountSettings } from './requests/UpdateSellerAccountSettingsRequest';
import { SellerAccountSettings } from '../models/SellerAccountSettings';

@JsonController('/seller-account-settings')
export class SellerAccountSettingsController {
    constructor(private sellerAccountSettingsService: SellerAccountSettingsService) {
    }

    // Create Seller Acc. Settings API
    /**
     * @api {post} /api/seller-account-settings/create Create Seller Account Settings API
     * @apiGroup SellerAccountSettings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} accountType  
     * @apiParam (Request body) {Number} fees 
     * @apiParam (Request body) {Number} maxImages 
     * @apiParam (Request body) {Number} maxVideos
     * @apiParamExample {json} Input
     * {
     *      "accountType" : 0,
     *      "fees" : 0,
     *      "maxImages" : 0,
     *      "maxVideos" : 0,
     *     
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new seller account settings.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/seller-account-settings/create
     * @apiErrorExample {json} SellerAccountSettings error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Post('/create')
    @Authorized()
    public async create(@Body({ validate: true }) model: CreateSellerAccountSettings, @Res() response: any): Promise<any> {

        const settings = new SellerAccountSettings();
        settings.accountType = model.accountType;
        settings.fees = model.fees;
        settings.maxImages = model.maxImages;
        settings.maxVideos = model.maxVideos;

        const createdSettings = await this.sellerAccountSettingsService.create(settings);
        if (createdSettings !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added new seller account settings.',
                data: createdSettings,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to add the seller account settings. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Seller Acc. Settings API
    /**
     * @api {put} /api/seller-account-settings/update/:id Update Seller Account Settings API
     * @apiGroup SellerAccountSettings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} sellerAccountSettingsId  
     * @apiParam (Request body) {Number} accountType  
     * @apiParam (Request body) {Number} fees 
     * @apiParam (Request body) {Number} maxImages 
     * @apiParam (Request body) {Number} maxVideos
     * @apiParamExample {json} Input
     * {
     *      "sellerAccountSettingsId" : 0,
     *      "accountType" : 0,
     *      "fees" : 0,
     *      "maxImages" : 0,
     *      "maxVideos" : 0,
     *     
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Seller account settings updated successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/seller-account-settings/update/1
     * @apiErrorExample {json} SellerAccountSettings error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Put('/update/:id')
    @Authorized()
    public async update(@Body({ validate: true }) model: UpdateSellerAccountSettings, @Res() response: any): Promise<any> {

        const sellerAccountSettings: SellerAccountSettings = await this.sellerAccountSettingsService.findOne({
            where: {
                sellerAccountSettingsId: model.sellerAccountSettingsId,
            },
        });
        if (!sellerAccountSettings) {
            const errorResponse: any = {
                status: 0,
                message: 'Seller account settings not found.',
            };
            return response.status(400).send(errorResponse);
        }

        sellerAccountSettings.accountType = model.accountType;
        sellerAccountSettings.fees = model.fees;
        sellerAccountSettings.maxImages = model.maxImages;
        sellerAccountSettings.maxVideos = model.maxVideos;

        const updatedSettings = await this.sellerAccountSettingsService.update(sellerAccountSettings);
        if (updatedSettings !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Seller account settings updated successfully.',
                data: updatedSettings,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the seller account settings. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Seller Acc. Settings List API
    /**
     * @api {get} /api/seller-account-settings/list Seller Acc. Settings List API
     * @apiGroup SellerAccountSettings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got seller acc. settings list",
     *      "data":{
     *      "sellerAccountSettingsId"
     *      "accountType"
     *      "fees"
     *      "maxImages"
     *      "maxVideos"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/seller-account-settings/list
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Get('/list')
    @Authorized()
    public async list(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['sellerAccountSettingsId', 'accountType', 'fees', 'maxImages', 'maxVideos'];

        const search = [];
        const WhereConditions = [];
        const countryList = await this.sellerAccountSettingsService.list(limit, offset, select, search, WhereConditions, count);
        if (countryList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got seller acc. settings List',
                data: countryList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get seller acc. settings List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Seller Acc. Settings API
    /**
     * @api {delete} /api/seller-account-settings/delete/:id Delete Seller Acc. Settings API
     * @apiGroup SellerAccountSettings
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Deleted successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/seller-account-settings/delete/:id
     * @apiErrorExample {json} Seller Acc. Settings error
     * HTTP/1.1 500 Internal Server Error
     * @apiVersion 0.1.0
     */
    @Delete('/delete/:id')
    @Authorized()
    public async delete(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const model = await this.sellerAccountSettingsService.findOne({
            where: {
                sellerAccountSettingsId: id,
            },
        });
        if (!model) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteCountry = await this.sellerAccountSettingsService.delete(model);
        if (deleteCountry) {
            const successResponse: any = {
                status: 1,
                message: 'Deleted successfully.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete seller acc. settings.',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
