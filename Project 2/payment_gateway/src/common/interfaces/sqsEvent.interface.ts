type SQSEvent =
    | 'payment.successded'
    | 'payment.canceled'
    | 'payment.created'
    | 'payment.failed'


export interface ISQSEvent<T> {
    event: SQSEvent;
    data: T;
}
