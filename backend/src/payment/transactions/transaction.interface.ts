import { TransactionPayment } from "output/entities/TransactionPayment";
import { Users } from "output/entities/Users";

// export interface TransactionI {
//     trpaCodeNumber: string;
//     trpaModifiedDate: Date;
//     trpaDebit: number;
//     trpaCredit: number;
//     trpaNote: string;
//     trpaOrderNumber: string;
//     trpaSourceId: number;
//     trpaTargetId: number;
//     trpaType: string;
//     trpaUserEntity: Users;
// }

export interface TransactionI {
    data: TransactionPayment[],
    page: number,
    limit: number,
    totalCount: number
}
