import { Seller } from './../models/seller';
import * as aws from "aws-sdk";
import dynamo from 'aws-sdk/clients/dynamodb';
import { Buyer } from '../models/buyer';
import HttpException from '../../exceptions/HttpException';

var DB = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' });
const TABLE_NAME = "Buyers";

class BuyerRepository {

    public async getByBuyerId(buyerId: string): Promise<any> {

        try {

            const params: dynamo.DocumentClient.GetItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "oBuyerId": buyerId
                }
            };

            let response = await DB.get(params).promise();

            // if (response.Item == null || response.Item == undefined)
            //     throw new HttpException(404, `Failed to get buyer with id: ${buyerId}`);

            return response && response.Item ? response.Item : null;

        } catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async create(model: any): Promise<any> {

        try {
            // let customer: Customer = new Customer(model);

            const params: dynamo.DocumentClient.PutItemInput = {
                TableName: TABLE_NAME,
                Item: model,
            };

            return await DB.put(params).promise();

        } catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async upsert(model: Buyer): Promise<any> {

        try {

            const params: dynamo.DocumentClient.UpdateItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "oBuyerId": model.oBuyerId
                },
                UpdateExpression: "set stripe = :s, cards = :c ",
                ExpressionAttributeValues: {
                    ":s": model.stripe,
                    ":c": model.cards,
                },
                ReturnValues: "UPDATED_NEW"
            };

            return await DB.update(params).promise();
        }
        catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async batchGetBuyerAndSeller(oSellerId: string, oBuyerId: string) {

        try {
            const params: dynamo.DocumentClient.BatchGetItemInput = {

                RequestItems: {
                    Sellers: {
                        Keys: [
                            {
                                "oSellerId": oSellerId
                            }
                        ]
                    },
                    Buyers: {
                        Keys: [
                            {
                                "oBuyerId": oBuyerId
                            }
                        ]
                    }
                }
            };

            let response = await DB.batchGet(params).promise();

            if (!response.Responses || !response.Responses.Sellers || !response.Responses.Sellers.length)
                throw new HttpException(404, `Failed to get seller with id: ${oSellerId}`);

            if (!response.Responses || !response.Responses.Buyers || !response.Responses.Buyers.length)
                throw new HttpException(404, `Failed to get buyer with id: ${oBuyerId}`);


            return { buyer: response.Responses.Buyers[0] as Buyer, seller: response.Responses.Sellers[0] as Seller };

        } catch (error) {
            throw new HttpException(error.status || 500, error.message || error);
        }
    }


}



export default BuyerRepository;
