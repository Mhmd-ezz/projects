import { ProviderEnum } from '../enum/provider.enum';
import dynamo from 'aws-sdk/clients/dynamodb';
import { Seller } from '../models/seller';

import * as aws from "aws-sdk"
import HttpException from '../../exceptions/HttpException';
var DB = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' });

const TABLE_NAME = 'Sellers';

class SellerRepository {

    public async getBySellerId(oSellerId: string): Promise<any> {

        try {

            const params: dynamo.DocumentClient.GetItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "oSellerId": oSellerId
                }
            };

            let response = await DB.get(params).promise();

            // if (response.Item == null || response.Item == undefined)
            //     throw new HttpException(404, `Failed to get seller with id: ${sellerId}`);

            return response && response.Item ? response.Item : null;

        } catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async create(model: Seller): Promise<any> {

        try {

            const params: dynamo.DocumentClient.PutItemInput = {
                TableName: TABLE_NAME,
                Item: model,
            };

            return await DB.put(params).promise();
        } catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async upsert(model: Seller): Promise<any> {

        try {
            // let stripeAccount: Seller = new Seller(model);

            const params: dynamo.DocumentClient.UpdateItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "oSellerId": model.oSellerId
                },
                UpdateExpression: "set stripe = :s",
                ExpressionAttributeValues: {
                    ":s": model.stripe,
                },
                ReturnValues: "UPDATED_NEW"
            };

            return await DB.update(params).promise();
        }
        catch (error) {
            throw new HttpException(500, error);
        }
    }
}

export default SellerRepository;
