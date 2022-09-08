import { env } from './../../config';
import { ISQSEvent } from './../../common/interfaces/sqsEvent.interface';
import { IPaymentView } from '../../common/interfaces/paymentView.interface';
import { generateObjectId, intAmountToFloat } from './../../utils/util';

import { SendMessageRequest, ReceiveMessageRequest, ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import * as SQS from 'aws-sdk/clients/sqs';
let sqs = new SQS({ region: 'us-east-2' })
var Q = require("q");
import HttpException from '../../exceptions/HttpException';


var sendMessage = Q.nbind(sqs.sendMessage, sqs);

class PaymentSQSService {

    protected queueUrl = env.PAYMENT_QUEUE;

    public async addToPaymentQueue(payment: ISQSEvent<IPaymentView>) {

        try {

            // @ events with same orderId will be queued and processed in order (MessageGroupId)
            var params: SendMessageRequest = {
                MessageGroupId: `Orders-${payment.data.orderId}`,
                MessageDeduplicationId: generateObjectId(),
                MessageBody: JSON.stringify(payment),
                QueueUrl: this.queueUrl
            };

            await sendMessage(params);
        } catch (error) {
            throw new HttpException(500, ` Error: ${error}`);
        }

    }

}

export default PaymentSQSService