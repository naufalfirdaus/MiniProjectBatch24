import { BusinessEntity } from "./BusinessEntity";
import { Users } from "./Users";
export declare class UsersAccount {
    usacBankEntityId: number;
    usacUserEntityId: number;
    usacAccountNumber: string | null;
    usacSaldo: string | null;
    usacType: string | null;
    usacStartDate: Date | null;
    usacEndDate: Date | null;
    usacModifiedDate: Date | null;
    usacStatus: string | null;
    usacBankEntity: BusinessEntity;
    usacUserEntity: Users;
}
