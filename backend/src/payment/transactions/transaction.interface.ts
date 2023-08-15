import { TransactionPayment } from "output/entities/TransactionPayment";

export interface TransactionI {
    data: TransactionPayment[],
    page: number,
    limit: number,
    totalCount: number
}
