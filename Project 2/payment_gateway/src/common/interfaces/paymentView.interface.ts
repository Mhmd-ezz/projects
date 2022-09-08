export interface IPaymentView {
    orderId: string;
    provider: string;
    status: string;
    isConfirmed: boolean;
    isPaid: boolean;
    amount: string;
    canceledAt?: string;
    cancellationReason?: string;
    currency: string;
    createdAt: string;
}
