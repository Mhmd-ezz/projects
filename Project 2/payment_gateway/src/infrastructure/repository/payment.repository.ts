import dynamo from 'aws-sdk/clients/dynamodb';

import * as aws from "aws-sdk"
import HttpException from '../../exceptions/HttpException';
import { Payment } from '../models/payments';
var DB = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' });

const TABLE_NAME = 'Payments';

class PaymentRepository {

    public async getByOrderId(orderId: string): Promise<any> {

        try {

            const params: dynamo.DocumentClient.GetItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "orderId": orderId
                }
            };

            let response = await DB.get(params).promise();

            return response && response.Item ? response.Item : null;

        } catch (error) {
            throw new HttpException(500, error);
        }
    }

    public async create(model: Payment): Promise<any> {

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

    public async upsert(model: Payment): Promise<any> {

        try {

            const params: dynamo.DocumentClient.UpdateItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    "orderId": model.orderId
                },
                UpdateExpression: "set stripe = :s, isConfirmed= :i, provider= :p",
                ExpressionAttributeValues: {
                    ":s": model.stripe,
                    ":i": model.isConfirmed,
                    ":p": model.provider,
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

export default PaymentRepository;
